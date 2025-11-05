import { BuilderData, BlogPost } from "../InteractiveBuilder";
import { Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SiteBlogProps {
  data: BuilderData;
  templateColors?: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

export const SiteBlog = ({ data, templateColors }: SiteBlogProps) => {
  if (data.blogPosts.length === 0) return null;

  const primaryColor = templateColors?.primary || "#8B4513";
  const secondaryColor = templateColors?.secondary || "#D2691E";

  return (
    <section className="py-20 px-6 bg-white">
      <div className="container mx-auto max-w-6xl">
        <h3
          className="text-4xl md:text-5xl font-bold text-center mb-12"
          style={{ color: primaryColor }}
        >
          News & Blog
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.blogPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow border border-gray-100"
            >
              {post.imageUrl && (
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                  {post.category && (
                    <div
                      className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold text-white"
                      style={{ backgroundColor: secondaryColor }}
                    >
                      {post.category}
                    </div>
                  )}
                </div>
              )}
              <div className="p-6">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {new Date(post.date).toLocaleDateString("it-IT", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <h4 className="text-xl font-bold mb-2" style={{ color: primaryColor }}>
                  {post.title}
                </h4>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{post.excerpt}</p>
                <Button
                  variant="outline"
                  className="w-full"
                  style={{ borderColor: primaryColor, color: primaryColor }}
                >
                  Leggi di più
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

