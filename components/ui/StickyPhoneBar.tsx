"use client";

import { SITE_CONFIG } from "@/lib/data/seed-data";

export default function StickyPhoneBar() {
    return (
        <div className="fixed bottom-0 left-0 right-0 z-[60] bg-gradient-to-r from-secondary via-secondary-dark to-secondary shadow-[0_-4px_20px_rgba(0,0,0,0.2)]">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex items-center justify-center h-16 sm:h-14">
                    <a
                        href={`tel:${SITE_CONFIG.phone.replace(/\s/g, "")}`}
                        className="flex items-center gap-3 text-white hover:text-primary-light transition-colors group"
                    >
                        <span className="flex items-center justify-center w-10 h-10 sm:w-9 sm:h-9 bg-primary rounded-full animate-heartbeat group-hover:scale-110 transition-transform">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-4 sm:w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                            </svg>
                        </span>
                        <div className="flex flex-col items-start">
                            <span className="font-extrabold text-xl sm:text-2xl tracking-wider leading-none">
                                {SITE_CONFIG.phone}
                            </span>
                            <span className="text-[10px] sm:text-xs text-white/50 font-medium mt-0.5">
                                7/24 Hizmetinizdeyiz
                            </span>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    );
}
