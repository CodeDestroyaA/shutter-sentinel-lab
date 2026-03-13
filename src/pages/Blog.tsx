import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QuoteDialog from "@/components/QuoteDialog";
import { supabase } from "@/integrations/supabase/client";
import { Calendar } from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  cover_image_url: string | null;
  created_at: string;
}

const Blog = () => {
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase
        .from("blog_posts")
        .select("id, title, slug, excerpt, cover_image_url, created_at")
        .eq("published", true)
        .order("created_at", { ascending: false });
      setPosts(data || []);
      setLoading(false);
    };
    load();
  }, []);

  return (
    <div className="min-h-screen">
      <Header onQuoteClick={() => setQuoteOpen(true)} />

      <section className="pt-32 pb-12 bg-secondary">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="font-display text-sm tracking-[0.3em] text-primary mb-4 block">INSIGHTS</span>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-secondary-foreground mb-4">Blog</h1>
            <p className="font-body text-lg text-secondary-foreground/70 max-w-2xl">
              Tips, guides, and news about roller shutters, sectional doors, and property security across Gauteng.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container">
          {loading ? (
            <p className="text-muted-foreground">Loading…</p>
          ) : posts.length === 0 ? (
            <p className="text-muted-foreground text-center py-12">No blog posts yet. Check back soon!</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, i) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                >
                  <Link
                    to={`/blog/${post.slug}`}
                    className="group block rounded-lg overflow-hidden border border-border hover:border-primary/50 transition-all"
                    style={{ boxShadow: "var(--shadow-card)" }}
                  >
                    {post.cover_image_url && (
                      <div className="aspect-[16/9] overflow-hidden">
                        <img
                          src={post.cover_image_url}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                      </div>
                    )}
                    <div className="p-5">
                      <div className="flex items-center gap-2 text-muted-foreground text-xs mb-2">
                        <Calendar className="w-3 h-3" />
                        {new Date(post.created_at).toLocaleDateString("en-ZA", { day: "numeric", month: "long", year: "numeric" })}
                      </div>
                      <h2 className="font-display text-lg font-bold text-card-foreground group-hover:text-primary transition-colors mb-2">
                        {post.title}
                      </h2>
                      {post.excerpt && (
                        <p className="font-body text-sm text-muted-foreground line-clamp-3">{post.excerpt}</p>
                      )}
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
      <QuoteDialog open={quoteOpen} onOpenChange={setQuoteOpen} />
    </div>
  );
};

export default Blog;
