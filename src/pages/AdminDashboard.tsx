import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { LogOut, Upload, Trash2, Image, Plus, Pencil, FileText, Eye, EyeOff, X, Check } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface GalleryImage {
  id: string;
  title: string;
  description: string | null;
  image_url: string;
  sort_order: number;
  created_at: string;
}

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  cover_image_url: string | null;
  published: boolean;
  created_at: string;
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);

  // Edit gallery image state
  const [editImage, setEditImage] = useState<GalleryImage | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editFile, setEditFile] = useState<File | null>(null);
  const [editSaving, setEditSaving] = useState(false);

  // Blog form state
  const [blogDialogOpen, setBlogDialogOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [blogTitle, setBlogTitle] = useState("");
  const [blogSlug, setBlogSlug] = useState("");
  const [blogContent, setBlogContent] = useState("");
  const [blogExcerpt, setBlogExcerpt] = useState("");
  const [blogCoverUrl, setBlogCoverUrl] = useState("");
  const [blogPublished, setBlogPublished] = useState(false);
  const [blogSaving, setBlogSaving] = useState(false);
  const [blogCoverFile, setBlogCoverFile] = useState<File | null>(null);

  const fetchImages = useCallback(async () => {
    const { data } = await supabase
      .from("gallery_images")
      .select("*")
      .order("sort_order", { ascending: true });
    setImages(data || []);
  }, []);

  const fetchPosts = useCallback(async () => {
    const { data } = await supabase
      .from("blog_posts")
      .select("*")
      .order("created_at", { ascending: false });
    setPosts(data || []);
  }, []);

  useEffect(() => {
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
      await Promise.all([fetchImages(), fetchPosts()]);
      setLoading(false);
    };
    checkAdmin();
  }, [navigate, fetchImages, fetchPosts]);

  // Gallery upload
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
      title, description: description || null, image_url: urlData.publicUrl, sort_order: images.length,
    });
    if (insertErr) { toast.error("Save failed: " + insertErr.message); setUploading(false); return; }
    toast.success("Image added");
    setTitle(""); setDescription(""); setFile(null);
    const fi = document.getElementById("file-input") as HTMLInputElement;
    if (fi) fi.value = "";
    setUploading(false);
    fetchImages();
  };

  // Gallery edit
  const openEditImage = (img: GalleryImage) => {
    setEditImage(img);
    setEditTitle(img.title);
    setEditDescription(img.description || "");
    setEditFile(null);
  };

  const handleEditSave = async () => {
    if (!editImage) return;
    setEditSaving(true);
    let newUrl = editImage.image_url;

    if (editFile) {
      const ext = editFile.name.split(".").pop();
      const path = `${Date.now()}.${ext}`;
      const { error: uploadErr } = await supabase.storage.from("gallery").upload(path, editFile);
      if (uploadErr) { toast.error("Upload failed"); setEditSaving(false); return; }
      // Delete old file
      const oldParts = editImage.image_url.split("/gallery/");
      const oldPath = oldParts[oldParts.length - 1];
      await supabase.storage.from("gallery").remove([oldPath]);
      const { data: urlData } = supabase.storage.from("gallery").getPublicUrl(path);
      newUrl = urlData.publicUrl;
    }

    const { error } = await supabase.from("gallery_images").update({
      title: editTitle, description: editDescription || null, image_url: newUrl,
    }).eq("id", editImage.id);

    if (error) { toast.error("Update failed"); setEditSaving(false); return; }
    toast.success("Image updated");
    setEditImage(null);
    setEditSaving(false);
    fetchImages();
  };

  // Gallery delete
  const handleDelete = async (image: GalleryImage) => {
    if (!confirm(`Delete "${image.title}"?`)) return;
    const urlParts = image.image_url.split("/gallery/");
    const storagePath = urlParts[urlParts.length - 1];
    await supabase.storage.from("gallery").remove([storagePath]);
    await supabase.from("gallery_images").delete().eq("id", image.id);
    toast.success("Image deleted");
    fetchImages();
  };

  // Blog helpers
  const slugify = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  const openBlogDialog = (post?: BlogPost) => {
    if (post) {
      setEditingPost(post);
      setBlogTitle(post.title);
      setBlogSlug(post.slug);
      setBlogContent(post.content);
      setBlogExcerpt(post.excerpt || "");
      setBlogCoverUrl(post.cover_image_url || "");
      setBlogPublished(post.published);
    } else {
      setEditingPost(null);
      setBlogTitle(""); setBlogSlug(""); setBlogContent(""); setBlogExcerpt(""); setBlogCoverUrl(""); setBlogPublished(false);
    }
    setBlogCoverFile(null);
    setBlogDialogOpen(true);
  };

  const handleBlogSave = async () => {
    if (!blogTitle || !blogSlug) { toast.error("Title and slug are required"); return; }
    setBlogSaving(true);

    let coverUrl = blogCoverUrl;
    if (blogCoverFile) {
      const ext = blogCoverFile.name.split(".").pop();
      const path = `blog/${Date.now()}.${ext}`;
      const { error: uploadErr } = await supabase.storage.from("gallery").upload(path, blogCoverFile);
      if (!uploadErr) {
        const { data: urlData } = supabase.storage.from("gallery").getPublicUrl(path);
        coverUrl = urlData.publicUrl;
      }
    }

    const payload = {
      title: blogTitle,
      slug: blogSlug,
      content: blogContent,
      excerpt: blogExcerpt || null,
      cover_image_url: coverUrl || null,
      published: blogPublished,
    };

    if (editingPost) {
      const { error } = await supabase.from("blog_posts").update(payload).eq("id", editingPost.id);
      if (error) { toast.error("Update failed: " + error.message); setBlogSaving(false); return; }
      toast.success("Post updated");
    } else {
      const { error } = await supabase.from("blog_posts").insert(payload);
      if (error) { toast.error("Save failed: " + error.message); setBlogSaving(false); return; }
      toast.success("Post created");
    }

    setBlogDialogOpen(false);
    setBlogSaving(false);
    fetchPosts();
  };

  const handleBlogDelete = async (post: BlogPost) => {
    if (!confirm(`Delete "${post.title}"?`)) return;
    await supabase.from("blog_posts").delete().eq("id", post.id);
    toast.success("Post deleted");
    fetchPosts();
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-background"><p className="text-muted-foreground">Loading…</p></div>;

  return (
    <div className="min-h-screen bg-background">
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

      <main className="container py-8">
        <Tabs defaultValue="gallery">
          <TabsList className="mb-6">
            <TabsTrigger value="gallery" className="gap-2"><Image className="h-4 w-4" /> Gallery</TabsTrigger>
            <TabsTrigger value="blog" className="gap-2"><FileText className="h-4 w-4" /> Blog</TabsTrigger>
          </TabsList>

          {/* ===== GALLERY TAB ===== */}
          <TabsContent value="gallery" className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-display"><Plus className="h-5 w-5" /> Add Gallery Image</CardTitle>
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
                    <Textarea id="desc" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Brief project description" rows={2} />
                  </div>
                  <div className="sm:col-span-2">
                    <Button type="submit" disabled={uploading}>
                      <Upload className="h-4 w-4 mr-2" /> {uploading ? "Uploading…" : "Upload Image"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            <div>
              <h2 className="font-display text-xl font-bold mb-4">Gallery Images ({images.length})</h2>
              {images.length === 0 ? (
                <p className="text-muted-foreground">No images yet.</p>
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
                        <div className="flex gap-1 shrink-0">
                          <Button variant="outline" size="icon" onClick={() => openEditImage(img)}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button variant="destructive" size="icon" onClick={() => handleDelete(img)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>

            {/* Edit Image Dialog */}
            <Dialog open={!!editImage} onOpenChange={(open) => { if (!open) setEditImage(null); }}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="font-display">Edit Image</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  {editImage && (
                    <div className="aspect-[3/2] rounded overflow-hidden border border-border">
                      <img src={editFile ? URL.createObjectURL(editFile) : editImage.image_url} alt="" className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div className="space-y-2">
                    <Label>Title</Label>
                    <Input value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea value={editDescription} onChange={(e) => setEditDescription(e.target.value)} rows={2} />
                  </div>
                  <div className="space-y-2">
                    <Label>Replace Image (optional)</Label>
                    <Input type="file" accept="image/*" onChange={(e) => setEditFile(e.target.files?.[0] || null)} />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setEditImage(null)}>Cancel</Button>
                    <Button onClick={handleEditSave} disabled={editSaving}>
                      <Check className="h-4 w-4 mr-2" /> {editSaving ? "Saving…" : "Save Changes"}
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </TabsContent>

          {/* ===== BLOG TAB ===== */}
          <TabsContent value="blog" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl font-bold">Blog Posts ({posts.length})</h2>
              <Button onClick={() => openBlogDialog()}>
                <Plus className="h-4 w-4 mr-2" /> New Post
              </Button>
            </div>

            {posts.length === 0 ? (
              <p className="text-muted-foreground">No blog posts yet.</p>
            ) : (
              <div className="space-y-3">
                {posts.map((post) => (
                  <Card key={post.id}>
                    <CardContent className="p-4 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-4 min-w-0">
                        {post.cover_image_url && (
                          <img src={post.cover_image_url} alt="" className="w-16 h-12 rounded object-cover shrink-0" />
                        )}
                        <div className="min-w-0">
                          <p className="font-medium text-sm truncate">{post.title}</p>
                          <p className="text-xs text-muted-foreground">/{post.slug} · {new Date(post.created_at).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        {post.published ? (
                          <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full flex items-center gap-1"><Eye className="h-3 w-3" /> Live</span>
                        ) : (
                          <span className="text-xs px-2 py-1 bg-muted text-muted-foreground rounded-full flex items-center gap-1"><EyeOff className="h-3 w-3" /> Draft</span>
                        )}
                        <Button variant="outline" size="icon" onClick={() => openBlogDialog(post)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="destructive" size="icon" onClick={() => handleBlogDelete(post)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Blog Dialog */}
            <Dialog open={blogDialogOpen} onOpenChange={setBlogDialogOpen}>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="font-display">{editingPost ? "Edit Post" : "New Post"}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Title *</Label>
                      <Input value={blogTitle} onChange={(e) => { setBlogTitle(e.target.value); if (!editingPost) setBlogSlug(slugify(e.target.value)); }} />
                    </div>
                    <div className="space-y-2">
                      <Label>Slug *</Label>
                      <Input value={blogSlug} onChange={(e) => setBlogSlug(e.target.value)} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Excerpt</Label>
                    <Textarea value={blogExcerpt} onChange={(e) => setBlogExcerpt(e.target.value)} rows={2} placeholder="Short summary for listings" />
                  </div>
                  <div className="space-y-2">
                    <Label>Content (HTML)</Label>
                    <Textarea value={blogContent} onChange={(e) => setBlogContent(e.target.value)} rows={12} placeholder="<p>Write your blog post here…</p>" className="font-mono text-sm" />
                  </div>
                  <div className="space-y-2">
                    <Label>Cover Image</Label>
                    <Input type="file" accept="image/*" onChange={(e) => setBlogCoverFile(e.target.files?.[0] || null)} />
                    {blogCoverUrl && !blogCoverFile && (
                      <div className="flex items-center gap-2 mt-1">
                        <img src={blogCoverUrl} alt="" className="h-12 rounded" />
                        <Button variant="ghost" size="sm" onClick={() => setBlogCoverUrl("")}><X className="h-3 w-3" /></Button>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" checked={blogPublished} onChange={(e) => setBlogPublished(e.target.checked)} className="rounded" />
                      <span className="text-sm font-medium">Published</span>
                    </label>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setBlogDialogOpen(false)}>Cancel</Button>
                    <Button onClick={handleBlogSave} disabled={blogSaving}>
                      <Check className="h-4 w-4 mr-2" /> {blogSaving ? "Saving…" : "Save Post"}
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminDashboard;
