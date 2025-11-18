import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

interface ContactProps {
    title: string;
    showMap: boolean;
    address: string;
    phone: string;
    email: string;
}

export const UniversalContact: React.FC<ContactProps> = ({
    title,
    showMap,
    address,
    phone,
    email
}) => {
    // Simple Google Maps Embed URL generation
    const mapUrl = `https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${encodeURIComponent(address)}`;
    // Note: In a real app, we'd need a real API key or use an iframe with a different source for demo
    const demoMapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(address)}&t=&z=13&ie=UTF8&iwloc=&output=embed`;

    return (
        <section className="py-20 bg-white text-slate-900">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    {/* Info Side */}
                    <div className="space-y-8">
                        <h2 className="text-4xl font-bold font-heading">{title}</h2>

                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-[var(--theme-primary)]/10 flex items-center justify-center text-[var(--theme-primary)] shrink-0">
                                    <MapPin className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg mb-1">Address</h4>
                                    <p className="text-slate-600">{address}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-[var(--theme-primary)]/10 flex items-center justify-center text-[var(--theme-primary)] shrink-0">
                                    <Phone className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg mb-1">Phone</h4>
                                    <p className="text-slate-600">{phone}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-[var(--theme-primary)]/10 flex items-center justify-center text-[var(--theme-primary)] shrink-0">
                                    <Mail className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg mb-1">Email</h4>
                                    <p className="text-slate-600">{email}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Map Side */}
                    {showMap && (
                        <div className="h-[400px] bg-slate-100 rounded-[var(--theme-radius)] overflow-hidden shadow-lg border border-slate-200">
                            <iframe
                                src={demoMapUrl}
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                title="Map"
                            ></iframe>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};
