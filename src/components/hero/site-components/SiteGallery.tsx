import { BuilderData, GalleryItem } from "../InteractiveBuilder";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Play, Image as ImageIcon } from "lucide-react";

interface SiteGalleryProps {
  data: BuilderData;
  templateColors?: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

export const SiteGallery = ({ data, templateColors }: SiteGalleryProps) => {
  if (data.gallery.length === 0) return null;

  const primaryColor = templateColors?.primary || "#8B4513";

  return (
    <section className="py-20 px-6 bg-gray-50">
      <div className="container mx-auto max-w-6xl">
        <h3
          className="text-4xl md:text-5xl font-bold text-center mb-12"
          style={{ color: primaryColor }}
        >
          Galleria
        </h3>

        {/* Carousel for Gallery */}
        <Carousel className="w-full">
          <CarouselContent>
            {data.gallery.map((item) => (
              <CarouselItem key={item.id} className="md:basis-1/2 lg:basis-1/3">
                <div className="relative aspect-square rounded-lg overflow-hidden shadow-lg group">
                  {item.type === "image" ? (
                    <>
                      <img
                        src={item.url}
                        alt={item.caption || "Gallery image"}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      {item.caption && (
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                          <p className="text-white text-sm font-medium">{item.caption}</p>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="w-full h-full bg-gray-900 flex items-center justify-center relative">
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                          <Play className="w-8 h-8 text-white ml-1" />
                        </div>
                      </div>
                      <ImageIcon className="w-12 h-12 text-gray-400" />
                    </div>
                  )}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>

        {/* Grid View Alternative */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
          {data.gallery.slice(0, 8).map((item) => (
            <div
              key={item.id}
              className="relative aspect-square rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow group cursor-pointer"
            >
              {item.type === "image" ? (
                <img
                  src={item.url}
                  alt={item.caption || "Gallery image"}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full bg-gray-900 flex items-center justify-center">
                  <Play className="w-8 h-8 text-white" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

