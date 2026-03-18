import { sql } from "@vercel/postgres";

// =============================================
// Database Query Helpers
// =============================================

export { sql };

// --- Service Categories ---
export async function getServiceCategories() {
  const { rows } = await sql`
    SELECT * FROM services_categories 
    WHERE is_active = true 
    ORDER BY sort_order ASC
  `;
  return rows;
}

export async function getServiceCategoryBySlug(slug: string) {
  const { rows } = await sql`
    SELECT * FROM services_categories 
    WHERE slug = ${slug} AND is_active = true
    LIMIT 1
  `;
  return rows[0] || null;
}

// --- Services ---
export async function getServicesByCategory(categorySlug: string) {
  const { rows } = await sql`
    SELECT s.*, sc.name as category_name, sc.slug as category_slug
    FROM services s
    JOIN services_categories sc ON s.category_id = sc.id
    WHERE sc.slug = ${categorySlug} AND s.is_active = true
    ORDER BY s.sort_order ASC
  `;
  return rows;
}

export async function getServiceBySlug(serviceSlug: string) {
  const { rows } = await sql`
    SELECT s.*, sc.name as category_name, sc.slug as category_slug
    FROM services s
    JOIN services_categories sc ON s.category_id = sc.id
    WHERE s.slug = ${serviceSlug} AND s.is_active = true
    LIMIT 1
  `;
  return rows[0] || null;
}

export async function getAllServices() {
  const { rows } = await sql`
    SELECT s.slug as service_slug, sc.slug as category_slug
    FROM services s
    JOIN services_categories sc ON s.category_id = sc.id
    WHERE s.is_active = true
  `;
  return rows;
}

// --- Locations ---
export async function getLocations() {
  const { rows } = await sql`
    SELECT * FROM locations 
    WHERE is_active = true 
    ORDER BY district_name ASC
  `;
  return rows;
}

export async function getLocationBySlug(slug: string) {
  const { rows } = await sql`
    SELECT * FROM locations 
    WHERE slug = ${slug} AND is_active = true
    LIMIT 1
  `;
  return rows[0] || null;
}

// --- Blog ---
export async function getBlogPosts() {
  const { rows } = await sql`
    SELECT * FROM blog_posts 
    WHERE is_published = true 
    ORDER BY published_at DESC
  `;
  return rows;
}

export async function getBlogPostBySlug(slug: string) {
  const { rows } = await sql`
    SELECT * FROM blog_posts 
    WHERE slug = ${slug} AND is_published = true
    LIMIT 1
  `;
  return rows[0] || null;
}

// --- FAQs ---
export async function getFaqsByServiceId(serviceId: number) {
  const { rows } = await sql`
    SELECT * FROM faqs 
    WHERE service_id = ${serviceId} AND is_active = true
    ORDER BY sort_order ASC
  `;
  return rows;
}

export async function getFaqsByLocationId(locationId: number) {
  const { rows } = await sql`
    SELECT * FROM faqs 
    WHERE location_id = ${locationId} AND is_active = true
    ORDER BY sort_order ASC
  `;
  return rows;
}

// --- Leads ---
export async function createLead(data: {
  full_name: string;
  phone: string;
  service_requested?: string;
  message?: string;
  source_page?: string;
}) {
  const { rows } = await sql`
    INSERT INTO leads (full_name, phone, service_requested, message, source_page)
    VALUES (${data.full_name}, ${data.phone}, ${data.service_requested || null}, ${data.message || null}, ${data.source_page || null})
    RETURNING id
  `;
  return rows[0];
}
