"use client";

import { useState } from "react";
import Link from "next/link";
import { SITE_CONFIG } from "@/lib/data/seed-data";

const QUICK_SERVICES = [
    { label: "💉 Evde Serum Tedavisi", href: "/hizmetler/evde-serum-tedavi", whatsappMsg: "Merhaba, evde serum tedavisi hakkında bilgi almak istiyorum." },
    { label: "🩺 Evde Hemşirelik", href: "/hizmetler/evde-hemsirelik", whatsappMsg: "Merhaba, evde hemşirelik hizmeti hakkında bilgi almak istiyorum." },
    { label: "🩹 Yara Bakımı / Pansuman", href: "/hizmetler/evde-yara-bakim", whatsappMsg: "Merhaba, evde yara bakımı ve pansuman hizmeti hakkında bilgi almak istiyorum." },
    { label: "🩸 Kan Alma / Tahlil", href: "/hizmetler/evde-kan-alma", whatsappMsg: "Merhaba, evde kan alma ve tahlil hizmeti hakkında bilgi almak istiyorum." },
    { label: "🏠 Evde Bakım (Yaşlı/Hasta)", href: "/hizmetler/evde-bakim", whatsappMsg: "Merhaba, evde bakım hizmeti hakkında bilgi almak istiyorum." },
    { label: "👨‍⚕️ Evde Doktor", href: "/hizmetler/evde-doktor", whatsappMsg: "Merhaba, evde doktor hizmeti hakkında bilgi almak istiyorum." },
    { label: "🦿 Fizik Tedavi", href: "/hizmetler/evde-fizik-tedavi", whatsappMsg: "Merhaba, evde fizik tedavi hizmeti hakkında bilgi almak istiyorum." },
];

export default function StickyWhatsApp() {
    const [isExpanded, setIsExpanded] = useState(false);

    const makeWhatsAppLink = (msg: string) =>
        `https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodeURIComponent(msg)}`;

    return (
        <div className="fixed bottom-[72px] sm:bottom-[62px] right-4 sm:right-6 z-50 flex flex-col items-end gap-3">
            {/* Expanded Panel */}
            {isExpanded && (
                <div className="animate-fade-in bg-white rounded-2xl shadow-2xl border border-border overflow-hidden w-[320px] sm:w-[340px] max-h-[80vh] flex flex-col">
                    {/* Header */}
                    <div className="bg-whatsapp px-4 py-3 flex items-center gap-3 flex-shrink-0">
                        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                            </svg>
                        </div>
                        <div className="min-w-0">
                            <div className="text-white font-bold text-sm">City In Health</div>
                            <div className="text-white/70 text-xs">Genellikle anında yanıt verir</div>
                        </div>
                        <button
                            onClick={() => setIsExpanded(false)}
                            className="ml-auto text-white/60 hover:text-white transition-colors flex-shrink-0"
                            aria-label="Kapat"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>

                    {/* Chat Body */}
                    <div className="p-3 bg-[#ECE5DD] flex-shrink-0">
                        <div className="bg-white rounded-xl rounded-tl-none px-3 py-2.5 shadow-sm max-w-[90%]">
                            <p className="text-sm text-gray-800 leading-relaxed">
                                Merhaba! 👋 Size nasıl yardımcı olabiliriz? Aşağıdan hizmet seçip bize yazabilirsiniz.
                            </p>
                            <span className="text-[10px] text-gray-400 mt-1 block text-right">Şimdi</span>
                        </div>
                    </div>

                    {/* Service Quick Links */}
                    <div className="flex-1 overflow-y-auto p-3 space-y-1.5 bg-white">
                        <p className="text-xs text-muted font-medium mb-2 px-1">Hangi hizmet için bilgi almak istersiniz?</p>
                        {QUICK_SERVICES.map((svc) => (
                            <div key={svc.href} className="flex items-center gap-1.5">
                                <a
                                    href={makeWhatsAppLink(svc.whatsappMsg)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 flex items-center gap-2 px-3 py-2.5 bg-background-alt hover:bg-whatsapp/10 border border-border hover:border-whatsapp/30 rounded-xl text-sm text-secondary font-medium transition-all group"
                                >
                                    <span className="flex-1">{svc.label}</span>
                                    <svg className="w-4 h-4 text-whatsapp opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                    </svg>
                                </a>
                                <Link
                                    href={svc.href}
                                    onClick={() => setIsExpanded(false)}
                                    className="flex items-center justify-center w-9 h-9 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-all flex-shrink-0"
                                    title="Detaylı bilgi"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </Link>
                            </div>
                        ))}
                    </div>

                    {/* General WhatsApp */}
                    <div className="p-3 border-t border-border bg-white flex-shrink-0">
                        <a
                            href={makeWhatsAppLink("Merhaba, evde sağlık hizmetleriniz hakkında bilgi almak istiyorum.")}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-whatsapp text-white font-semibold rounded-xl hover:bg-whatsapp/90 transition-all text-sm shadow-lg shadow-whatsapp/20"
                        >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                            </svg>
                            Genel Bilgi İçin Yazın
                        </a>
                    </div>
                </div>
            )}

            {/* Main WhatsApp FAB */}
            <button
                id="whatsapp-sticky-cta"
                onClick={() => setIsExpanded(!isExpanded)}
                className="group relative"
                aria-label="WhatsApp ile iletişime geçin"
            >
                {/* Pulse ring */}
                {!isExpanded && <span className="absolute inset-0 rounded-full bg-whatsapp/30 animate-ping" />}

                {/* Notification badge */}
                {!isExpanded && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-lg z-10 animate-bounce">
                        1
                    </span>
                )}

                {/* Button */}
                <span className="relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-whatsapp text-white rounded-full shadow-xl shadow-whatsapp/30 hover:shadow-whatsapp/50 hover:scale-110 transition-all duration-300">
                    {isExpanded ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-7 sm:w-7" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    ) : (
                        <svg className="w-7 h-7 sm:w-8 sm:h-8" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                    )}
                </span>
            </button>
        </div>
    );
}
