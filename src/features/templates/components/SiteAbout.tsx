import { BuilderData } from "@/types/builder";

interface SiteAboutProps {
  data: BuilderData;
  templateColors?: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

export const SiteAbout = ({ data, templateColors }: SiteAboutProps) => {
  if (!data.about) return null;

  const primaryColor = templateColors?.primary || "#8B4513";

  return (
    <section id="chi-siamo" className="py-20 px-6 bg-gray-50">
      <div className="container mx-auto max-w-6xl">
        <h3
          className="text-4xl md:text-5xl font-bold text-center mb-12"
          style={{ color: primaryColor }}
        >
          Chi Siamo
        </h3>

        {data.about.story && (
          <div className="max-w-3xl mx-auto mb-12">
            <p className="text-lg text-gray-700 leading-relaxed text-center">
              {data.about.story}
            </p>
          </div>
        )}

        {data.about.philosophy && (
          <div className="max-w-3xl mx-auto mb-12">
            <h4 className="text-2xl font-semibold mb-4" style={{ color: primaryColor }}>
              La Nostra Filosofia
            </h4>
            <p className="text-lg text-gray-700 leading-relaxed">{data.about.philosophy}</p>
          </div>
        )}

        {data.about.values && data.about.values.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {data.about.values.map((value, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow"
              >
                {value.icon && <div className="text-5xl mb-4">{value.icon}</div>}
                <h4 className="font-bold text-lg mb-2" style={{ color: primaryColor }}>
                  {value.title}
                </h4>
                {value.description && (
                  <p className="text-sm text-gray-600">{value.description}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

