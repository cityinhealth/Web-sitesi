import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { full_name, phone, service_requested, source_page } = body;

        // Validate required fields
        if (!full_name || !phone) {
            return NextResponse.json(
                { error: "Ad ve telefon alanları zorunludur." },
                { status: 400 }
            );
        }

        // Send to Web3Forms (free email notification service)
        // Get your access key from: https://web3forms.com (free, no signup needed)
        const WEB3FORMS_KEY = process.env.WEB3FORMS_ACCESS_KEY || "";

        if (WEB3FORMS_KEY) {
            try {
                await fetch("https://api.web3forms.com/submit", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        access_key: WEB3FORMS_KEY,
                        subject: `🏥 Yeni Hasta Talebi - ${full_name}`,
                        from_name: "City in Health Web Sitesi",
                        name: full_name,
                        phone: phone,
                        service: service_requested || "Belirtilmedi",
                        source_page: source_page || "/",
                        message: `Ad Soyad: ${full_name}\nTelefon: ${phone}\nHizmet: ${service_requested || "Belirtilmedi"}\nSayfa: ${source_page || "/"}`,
                    }),
                });
            } catch (emailError) {
                console.error("Web3Forms error:", emailError);
                // Don't fail the request even if email fails
            }
        }

        // Always log the lead
        console.log("📋 New Lead:", {
            full_name,
            phone,
            service_requested,
            source_page,
            timestamp: new Date().toISOString(),
        });

        return NextResponse.json(
            { success: true, message: "Lead kaydedildi." },
            { status: 201 }
        );
    } catch (error) {
        console.error("Lead creation error:", error);
        return NextResponse.json(
            { error: "Sunucu hatası." },
            { status: 500 }
        );
    }
}
