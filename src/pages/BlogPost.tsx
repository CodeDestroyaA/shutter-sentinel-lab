import { useState, useEffect } from "react";
import { useParams, Navigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QuoteDialog from "@/components/QuoteDialog";
import { supabase } from "@/integrations/supabase/client";

interface Post {
  id: string;
  title: string;
  content: string;
  cover_image_url: string | null;
  created_at: string;
}

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from("blog_posts")
        .select("id, title, content, cover_image_url, created_at")
        .eq("slug", slug)
        .eq("published", true)
        .maybeSingle();
      if (!data) setNotFound(true);
      else setPost(data);
      setLoading(false);
    };
    load();
  }, [slug]);

  if (notFound) return <Navigate to="/blog" replace />;

  return (
    <div className="min-h-screen">
      <Header onQuoteClick={() => setQuoteOpen(true)} />

      {loading ? (
        <div className="pt-32 pb-20 bg-secondary">
          <div className="container"><p className="text-secondary-foreground/60">Loading…</p></div>
        </div>
      ) : post && (
        <>
          <section className="pt-32 pb-12 bg-secondary">
            <div className="container max-w-3xl">
              <Link to="/blog" className="inline-flex items-center gap-2 text-secondary-foreground/60 hover:text-primary transition-colors mb-8 font-body">
                <ArrowLeft className="w-4 h-4" /> Back to Blog
              </Link>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <div className="flex items-center gap-2 text-secondary-foreground/50 text-sm mb-4">
                  <Calendar className="w-4 h-4" />
                  {new Date(post.created_at).toLocaleDateString("en-ZA", { day: "numeric", month: "long", year: "numeric" })}
                </div>
                <h1 className="font-display text-3xl md:text-5xl font-bold text-secondary-foreground">{post.title}</h1>
              </motion.div>
            </div>
          </section>

          {post.cover_image_url && (
            <div className="container max-w-3xl py-8">
              <img src={post.cover_image_url} alt={post.title} className="w-full rounded-lg" loading="lazy" />
            </div>
          )}

          <section className="py-12 bg-background">
            <div className="container max-w-3xl">
              <div
                className="prose prose-lg max-w-none font-body text-foreground prose-headings:font-display prose-headings:text-foreground prose-a:text-primary"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </div>
          </section>
        </>
      )}

      <Footer />
      <QuoteDialog open={quoteOpen} onOpenChange={setQuoteOpen} />
    </div>
  );
};

export default BlogPost;
