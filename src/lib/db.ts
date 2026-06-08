import { queryOptions, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

// ============ Types ============
export type Project = {
  id: string;
  title: string;
  category: "Frontend" | "Figma" | "Framer";
  image_url: string;
  primary_href: string;
  primary_label: string;
  primary_icon: string;
  secondary_href: string | null;
  secondary_label: string | null;
  secondary_icon: string | null;
  featured_home: boolean;
  sort_order: number;
};

export type TravelDestination = {
  id: string;
  label: string;
  subtitle: string | null;
  image_url: string;
  sort_order: number;
};

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  cover_image: string | null;
  body_markdown: string;
  published: boolean;
  published_at: string | null;
  created_at: string;
};

export type SiteSettings = {
  profile: {
    name: string;
    tagline: string;
    eyebrow: string;
    location: string;
    available: boolean;
    photo: string;
    experience_years: string;
    experience_label: string;
    linkedin: string;
    github: string;
    email: string;
    cv_url: string;
  };
  home_skills: { name: string; icon: string }[];
  about: {
    intro: string;
    stats: { icon: string; title: string; text: string }[];
    skill_groups: { title: string; items: [string, string][] }[];
    hobbies: { img: string; items: { icon: string; label: string }[] }[];
    values: { icon: string; title: string; desc: string }[];
    timeline: { year: string; title: string; body: string }[];
  };
  interests: {
    art_blurb: string;
    art_images: string[];
    space_blurb: string;
    books: { img: string; title: string; text: string }[];
  };
  resume: {
    github_image: string;
    github_url: string;
    github_blurb: string;
    cv_image: string;
    cv_blurb: string;
  };
};

// ============ Query options ============
export const projectsQuery = () =>
  queryOptions({
    queryKey: ["projects"],
    queryFn: async (): Promise<Project[]> => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("sort_order");
      if (error) throw error;
      return (data ?? []) as Project[];
    },
  });

export const travelQuery = () =>
  queryOptions({
    queryKey: ["travel"],
    queryFn: async (): Promise<TravelDestination[]> => {
      const { data, error } = await supabase
        .from("travel_destinations")
        .select("*")
        .order("sort_order");
      if (error) throw error;
      return (data ?? []) as TravelDestination[];
    },
  });

export const settingsQuery = () =>
  queryOptions({
    queryKey: ["site_settings"],
    queryFn: async (): Promise<SiteSettings | null> => {
      const { data, error } = await supabase
        .from("site_settings")
        .select("data")
        .eq("id", 1)
        .maybeSingle();
      if (error) throw error;
      return (data?.data as SiteSettings) ?? null;
    },
  });

export const blogPostsQuery = (includeDrafts = false) =>
  queryOptions({
    queryKey: ["blog_posts", includeDrafts],
    queryFn: async (): Promise<BlogPost[]> => {
      let q = supabase
        .from("blog_posts")
        .select("*")
        .order("published_at", { ascending: false, nullsFirst: false });
      if (!includeDrafts) q = q.eq("published", true);
      const { data, error } = await q;
      if (error) throw error;
      return (data ?? []) as BlogPost[];
    },
  });

export const blogPostBySlugQuery = (slug: string) =>
  queryOptions({
    queryKey: ["blog_post", slug],
    queryFn: async (): Promise<BlogPost | null> => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", slug)
        .maybeSingle();
      if (error) throw error;
      return (data as BlogPost) ?? null;
    },
  });

// ============ Mutations ============
export function useUpsertProject() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (p: Partial<Project> & { id?: string }) => {
      if (p.id) {
        const { error } = await supabase.from("projects").update(p).eq("id", p.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("projects").insert(p as never);
        if (error) throw error;
      }
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["projects"] }),
  });
}

export function useDeleteProject() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("projects").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["projects"] }),
  });
}

export function useUpsertTravel() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (p: Partial<TravelDestination> & { id?: string }) => {
      if (p.id) {
        const { error } = await supabase.from("travel_destinations").update(p).eq("id", p.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("travel_destinations").insert(p as never);
        if (error) throw error;
      }
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["travel"] }),
  });
}

export function useDeleteTravel() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("travel_destinations").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["travel"] }),
  });
}

export function useSaveSettings() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: SiteSettings) => {
      const { error } = await supabase
        .from("site_settings")
        .update({ data: data as never })
        .eq("id", 1);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["site_settings"] }),
  });
}

export function useUpsertBlogPost() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (p: Partial<BlogPost> & { id?: string }) => {
      if (p.id) {
        const { error } = await supabase.from("blog_posts").update(p).eq("id", p.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("blog_posts").insert(p as never);
        if (error) throw error;
      }
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["blog_posts"] }),
  });
}

export function useDeleteBlogPost() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("blog_posts").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["blog_posts"] }),
  });
}

// ============ Image upload ============
export async function uploadImage(file: File): Promise<string> {
  const ext = file.name.split(".").pop() ?? "bin";
  const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const { error } = await supabase.storage
    .from("portfolio-media")
    .upload(path, file, { upsert: false, contentType: file.type });
  if (error) throw error;
  // Long-lived signed URL (the bucket is private but contents are intended public)
  const { data, error: signErr } = await supabase.storage
    .from("portfolio-media")
    .createSignedUrl(path, 60 * 60 * 24 * 365 * 50); // 50 years
  if (signErr) throw signErr;
  return data.signedUrl;
}
