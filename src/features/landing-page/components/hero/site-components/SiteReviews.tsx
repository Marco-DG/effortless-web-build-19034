import { BuilderData } from "../InteractiveBuilder";
import { Star } from "lucide-react";

interface SiteReviewsProps {
  data: BuilderData;
  templateColors?: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

export const SiteReviews = ({ data, templateColors }: SiteReviewsProps) => {
  if (data.reviews.length === 0) return null;

  const primaryColor = templateColors?.primary || "#8B4513";

  return (
    <section className="py-20 px-6 bg-white">
      <div className="container mx-auto max-w-6xl">
        <h3
          className="text-4xl md:text-5xl font-bold text-center mb-12"
          style={{ color: primaryColor }}
        >
          Dicono di Noi
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.reviews.map((review) => (
            <div
              key={review.id}
              className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center gap-2 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < review.rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <p className="text-gray-700 italic mb-4">{review.text}</p>
              <div className="flex items-center gap-3">
                {review.avatarUrl ? (
                  <img
                    src={review.avatarUrl}
                    alt={review.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
                    <span className="text-gray-600 font-semibold">
                      {review.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
                <div>
                  <p className="font-semibold text-sm">{review.name}</p>
                  {review.date && (
                    <p className="text-xs text-gray-500">{review.date}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

