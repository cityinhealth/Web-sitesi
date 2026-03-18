"use client";

import { useState } from "react";
import { SERVICE_CATEGORIES, SITE_CONFIG } from "@/lib/data/seed-data";

interface LeadFormProps {
    variant?: "hero" | "sidebar" | "inline";
    sourcePage?: string;
}

export default function LeadForm({ variant = "hero", sourcePage = "/" }: LeadFormProps) {
    const [formData, setFormData] = useState({
        full_name: "",
        phone: "",
        service_requested: "",
    });
    const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

    const allServices = SERVICE_CATEGORIES.flatMap((cat) =>
        cat.services.map((s) => ({ label: s.title, value: s.slug }))
    );

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("sending");

        try {
            const res = await fetch("/api/leads", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...formData, source_page: sourcePage }),
            });

            if (res.ok) {
                setStatus("success");
                setFormData({ full_name: "", phone: "", service_requested: "" });
                setTimeout(() => setStatus("idle"), 5000);
            } else {
                setStatus("error");
            }
        } catch {
            setStatus("error");
        }
    };

    const isHero = variant === "hero";

    return (
        <form
            onSubmit={handleSubmit}
            id="lead-form"
            className={`${isHero
                    ? "bg-white rounded-2xl p-6 sm:p-8 card-shadow max-w-md w-full"
                    : "bg-background-alt rounded-xl p-5 border border-border"
                }`}
        >
            <h3
                className={`font-bold text-secondary mb-1 ${isHero ? "text-xl" : "text-lg"
                    }`}
            >
                📞 Sizi Hemen Arayalım
            </h3>
            <p className="text-sm text-muted mb-5">
                Formu doldurun, sağlık danışmanlarımız en kısa sürede sizi arasın.
            </p>

            <div className="space-y-3">
                {/* Name */}
                <div>
                    <label htmlFor="lead-name" className="block text-xs font-medium text-secondary/70 mb-1">
                        Adınız Soyadınız
                    </label>
                    <input
                        type="text"
                        id="lead-name"
                        required
                        value={formData.full_name}
                        onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                        placeholder="Adınız Soyadınız"
                        className="w-full px-4 py-2.5 bg-white border border-border rounded-xl text-sm text-secondary placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    />
                </div>

                {/* Phone */}
                <div>
                    <label htmlFor="lead-phone" className="block text-xs font-medium text-secondary/70 mb-1">
                        Telefon Numaranız
                    </label>
                    <input
                        type="tel"
                        id="lead-phone"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="05XX XXX XX XX"
                        className="w-full px-4 py-2.5 bg-white border border-border rounded-xl text-sm text-secondary placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    />
                </div>

                {/* Service Select */}
                <div>
                    <label htmlFor="lead-service" className="block text-xs font-medium text-secondary/70 mb-1">
                        İhtiyaç Duyulan Hizmet
                    </label>
                    <select
                        id="lead-service"
                        value={formData.service_requested}
                        onChange={(e) => setFormData({ ...formData, service_requested: e.target.value })}
                        className="w-full px-4 py-2.5 bg-white border border-border rounded-xl text-sm text-secondary focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    >
                        <option value="">Hizmet Seçiniz</option>
                        {allServices.map((s) => (
                            <option key={s.value} value={s.value}>
                                {s.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Submit */}
            <button
                type="submit"
                disabled={status === "sending"}
                className="mt-5 w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition-all duration-200 shadow-lg shadow-primary/20 hover:shadow-primary/30 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {status === "sending" ? (
                    <>
                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Gönderiliyor...
                    </>
                ) : (
                    <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                        </svg>
                        Bizi Arayın
                    </>
                )}
            </button>

            {/* Status Messages */}
            {status === "success" && (
                <div className="mt-3 p-3 bg-success/10 text-success text-sm rounded-lg text-center animate-fade-in">
                    ✅ Talebiniz alındı! En kısa sürede sizi arayacağız.
                </div>
            )}
            {status === "error" && (
                <div className="mt-3 p-3 bg-primary/10 text-primary text-sm rounded-lg text-center animate-fade-in">
                    ❌ Bir hata oluştu. Lütfen bizi doğrudan arayın: {SITE_CONFIG.phone}
                </div>
            )}
        </form>
    );
}
