// =============================================
// Type Definitions
// =============================================

// Data-layer service types (used in seed-data / services modules)
export interface ServiceDataItem {
    title: string;
    slug: string;
    short_description: string;
    cover_image?: string;
    meta_title: string;
    meta_description: string;
    content_html?: string;
}

export interface ServiceCategoryData {
    name: string;
    slug: string;
    description: string;
    meta_title: string;
    meta_description: string;
    icon: string;
    cover_image: string;
    services: ServiceDataItem[];
}


export interface ServiceCategory {
    id: number;
    name: string;
    slug: string;
    description: string | null;
    meta_title: string | null;
    meta_description: string | null;
    icon: string | null;
    sort_order: number;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

export interface Service {
    id: number;
    category_id: number;
    title: string;
    slug: string;
    short_description: string | null;
    content_html: string;
    meta_title: string | null;
    meta_description: string | null;
    cover_image: string | null;
    icon: string | null;
    sort_order: number;
    is_active: boolean;
    created_at: string;
    updated_at: string;
    // Joined fields
    category_name?: string;
    category_slug?: string;
}

export interface Location {
    id: number;
    city: string;
    district_name: string;
    slug: string;
    localized_content: string | null;
    meta_title: string | null;
    meta_description: string | null;
    population: string | null;
    nearby_hospitals: string | null;
    coverage_note: string | null;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

export interface Lead {
    id: number;
    full_name: string;
    phone: string;
    service_requested: string | null;
    message: string | null;
    source_page: string | null;
    created_at: string;
    status: "new" | "contacted" | "converted" | "lost";
}

export interface BlogPost {
    id: number;
    title: string;
    slug: string;
    excerpt: string | null;
    content_html: string;
    cover_image: string | null;
    author: string;
    meta_title: string | null;
    meta_description: string | null;
    is_published: boolean;
    published_at: string | null;
    created_at: string;
    updated_at: string;
}

export interface FAQ {
    id: number;
    service_id: number | null;
    location_id: number | null;
    question: string;
    answer: string;
    sort_order: number;
    is_active: boolean;
    created_at: string;
}
