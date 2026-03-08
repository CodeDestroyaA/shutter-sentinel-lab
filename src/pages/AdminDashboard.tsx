import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { LogOut, Upload, Trash2, Image, Plus } from "lucide-react";

interface GalleryImage {
  id: string;
  title: string;
  description: string | null;
  image_url: string;
  sort_order: number;
  created_at: string;
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const fetchImages = useCallback(async () => {
    const { data } = await supabase
      .from("gallery_images")
      .select("*")
      .order("sort_order", { ascending: true });
    setImages(data || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    // Auth guard
    const checkAdmin = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { navigate("/admin/login"); return; }

      const { data: roles } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", session.user.id)
        .eq("role", "admin");

      if (!roles || roles.length === 0) {
        await supabase.auth.signOut();
        navigate("/admin/login");
        return;
      }
      fetchImages();
    };
    checkAdmin();
  }, [navigate, fetchImages]);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !title) { toast.error("Title and image are required"); return; }

    setUploading(true);
    const ext = file.name.split(".").pop();
    const path = `${Date.now()}.${ext}`;

    const { error: uploadErr } = await supabase.storage.from("gallery").upload(path, file);
    if (uploadErr) { toast.error("Upload failed: " + uploadErr.message); setUploading(false); return; }

    const { data: urlData } = supabase.storage.from("gallery").getPublicUrl(path);

    const { error: insertErr } = await supabase.from("gallery_images").insert({
      title,
      description: description || null,
      image_url: urlData.publicUrl,
      sort_order: images.length,
    });

    if (insertErr) { toast.error("Save failed: " + insertErr.message); setUploading(false); return; }

    toast.success("Image added to gallery");
    setTitle(""); setDescription(""); setFile(null);
    // Reset file input
    const fileInput = document.getElementById("file-input") as HTMLInputElement;
    if (fileInput) fileInput.value = "";
    setUploading(false);
    fetchImages();
  };

  const handleDelete = async (image: GalleryImage) => {
    if (!confirm(`Delete "${image.title}"?`)) return;

    // Extract storage path from URL
    const urlParts = image.image_url.split("/gallery/");
    const storagePath = urlParts[urlParts.length - 1];

    await supabase.storage.from("gallery").remove([storagePath]);
    await supabase.from("gallery_images").delete().eq("id", image.id);

    toast.success("Image deleted");
    fetchImages();
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <header className="border-b bg-card sticky top-0 z-10">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <Image className="h-5 w-5 text-primary" />
            <span className="font-display text-lg font-bold">Century Doors Admin</span>
          </div>
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" /> Sign Out
          </Button>
        </div>
      </header>

      <main className="container py-8 space-y-8">
        {/* Upload form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-display">
              <Plus className="h-5 w-5" /> Add Gallery Image
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleUpload} className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Roller shutter — Kempton Park" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="file-input">Image *</Label>
                <Input id="file-input" type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} required />
              </div>
              <div className="sm:col-span-2 space-y-2">
                <Label htmlFor="desc">Description (optional)</Label>
                <Textarea id="desc" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Brief project description for SEO" rows={2} />
              </div>
              <div className="sm:col-span-2">
                <Button type="submit" disabled={uploading}>
                  <Upload className="h-4 w-4 mr-2" /> {uploading ? "Uploading…" : "Upload Image"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Gallery grid */}
        <div>
          <h2 className="font-display text-xl font-bold mb-4">
            Gallery Images ({images.length})
          </h2>
          {loading ? (
            <p className="text-muted-foreground">Loading…</p>
          ) : images.length === 0 ? (
            <p className="text-muted-foreground">No images yet. Upload your first project photo above.</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {images.map((img) => (
                <Card key={img.id} className="overflow-hidden">
                  <div className="aspect-[3/2]">
                    <img src={img.image_url} alt={img.title} className="w-full h-full object-cover" />
                  </div>
                  <CardContent className="p-4 flex items-start justify-between gap-2">
                    <div>
                      <p className="font-medium text-sm">{img.title}</p>
                      {img.description && <p className="text-xs text-muted-foreground mt-1">{img.description}</p>}
                    </div>
                    <Button variant="destructive" size="icon" className="shrink-0" onClick={() => handleDelete(img)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
