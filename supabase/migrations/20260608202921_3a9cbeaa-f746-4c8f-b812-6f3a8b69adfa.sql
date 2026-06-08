-- =============================================================
-- 1. ROLES
-- =============================================================
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

CREATE POLICY "Admins can view all roles"
  ON public.user_roles FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Shared updated_at trigger
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- =============================================================
-- 2. PROJECTS
-- =============================================================
CREATE TABLE public.projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  category text NOT NULL CHECK (category IN ('Frontend','Figma','Framer')),
  image_url text NOT NULL,
  primary_href text NOT NULL,
  primary_label text NOT NULL,
  primary_icon text NOT NULL DEFAULT 'ExternalLink',
  secondary_href text,
  secondary_label text,
  secondary_icon text,
  featured_home boolean NOT NULL DEFAULT true,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.projects TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.projects TO authenticated;
GRANT ALL ON public.projects TO service_role;

ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Projects are publicly readable"
  ON public.projects FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admins manage projects"
  ON public.projects FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER trg_projects_updated_at
  BEFORE UPDATE ON public.projects
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- =============================================================
-- 3. TRAVEL DESTINATIONS
-- =============================================================
CREATE TABLE public.travel_destinations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  label text NOT NULL,
  subtitle text,
  image_url text NOT NULL,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.travel_destinations TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.travel_destinations TO authenticated;
GRANT ALL ON public.travel_destinations TO service_role;

ALTER TABLE public.travel_destinations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Travel public read"
  ON public.travel_destinations FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admins manage travel"
  ON public.travel_destinations FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER trg_travel_updated_at
  BEFORE UPDATE ON public.travel_destinations
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- =============================================================
-- 4. BLOG POSTS
-- =============================================================
CREATE TABLE public.blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  excerpt text,
  cover_image text,
  body_markdown text NOT NULL DEFAULT '',
  published boolean NOT NULL DEFAULT false,
  published_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.blog_posts TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.blog_posts TO authenticated;
GRANT ALL ON public.blog_posts TO service_role;

ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Blog public read published"
  ON public.blog_posts FOR SELECT TO anon, authenticated
  USING (published = true OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins manage blog"
  ON public.blog_posts FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER trg_blog_updated_at
  BEFORE UPDATE ON public.blog_posts
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- =============================================================
-- 5. SITE SETTINGS (single row, JSONB)
-- =============================================================
CREATE TABLE public.site_settings (
  id int PRIMARY KEY DEFAULT 1,
  data jsonb NOT NULL DEFAULT '{}'::jsonb,
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT site_settings_singleton CHECK (id = 1)
);

GRANT SELECT ON public.site_settings TO anon, authenticated;
GRANT INSERT, UPDATE ON public.site_settings TO authenticated;
GRANT ALL ON public.site_settings TO service_role;

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Settings public read"
  ON public.site_settings FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admins manage settings"
  ON public.site_settings FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER trg_settings_updated_at
  BEFORE UPDATE ON public.site_settings
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- =============================================================
-- 6. SEED DATA (current portfolio content)
-- =============================================================
INSERT INTO public.projects (title, category, image_url, primary_href, primary_label, primary_icon, secondary_href, secondary_label, secondary_icon, featured_home, sort_order) VALUES
('Tropical Travel Web UI','Figma','/images/work1.jpg','https://www.figma.com/proto/P13uWgQnKpxVQ2muYkuMTa/Tropical','Open in Figma','Figma','https://www.figma.com/proto/P13uWgQnKpxVQ2muYkuMTa/Tropical','View prototype','Eye',true,10),
('EMCCMO Royalty Platform','Frontend','/images/work2.png','https://ememrc.com/','Visit site','ExternalLink','https://github.com/liyat-1','Source code','Github',true,20),
('Apple Vision Pro UI','Figma','/images/work3.jpg','https://www.figma.com/proto/lBpwEqpKXPyzTRD8ydjzNX/Untitled','Open in Figma','Figma','https://www.figma.com/proto/lBpwEqpKXPyzTRD8ydjzNX/Untitled','View prototype','Eye',true,30),
('Tom Ford Product Display','Frontend','/images/work4.jpg','https://tomford.netlify.app/','Visit site','ExternalLink','https://github.com/liyat-1','Source code','Github',true,40),
('Disco Music Player','Framer','/images/work5.png','https://whenwedisco.netlify.app/','Live preview','ExternalLink','https://whenwedisco.netlify.app/','Open in Framer','Palette',true,50),
('Abol Coffee Center','Frontend','/images/work6.png','https://abolcoffee.netlify.app/','Visit site','ExternalLink','https://github.com/liyat-1','Source code','Github',true,60);

INSERT INTO public.travel_destinations (label, subtitle, image_url, sort_order) VALUES
('Paris, France','The City of Light','/images/paris.jpg',10),
('Tokyo, Japan','Tradition meets innovation','/images/japan.jpg',20),
('New York City','The city that never sleeps','/images/newyork.jpg',30),
('Maldives','A tropical paradise','/images/maldives.jpg',40),
('Cape Town','Beauty and culture','/images/safrica.jpg',50),
('Sydney','Iconic landmarks & beaches','/images/sydney.jpg',60),
('Seoul','Vibrant culture & skyscrapers','/images/korea.jpg',70),
('Bali','Temples and beaches','/images/bali.jpg',80);

INSERT INTO public.site_settings (id, data) VALUES (1, '{
  "profile": {
    "name": "Liyat Tesfaye",
    "tagline": "A frontend developer and UI/UX designer crafting precise, minimal interfaces — where code meets composition.",
    "eyebrow": "Portfolio · 2026",
    "location": "Addis Ababa, Ethiopia",
    "available": true,
    "photo": "/images/hero-image.png",
    "experience_years": "2+",
    "experience_label": "Frontend craft",
    "linkedin": "https://linkedin.com",
    "github": "https://github.com/liyat-1",
    "email": "liyattesfaye8@gmail.com",
    "cv_url": "/file/Liyat_Tesfaye_CV.pdf"
  },
  "home_skills": [
    {"name":"React","icon":"Atom"},
    {"name":"TypeScript","icon":"Code2"},
    {"name":"Angular","icon":"Boxes"},
    {"name":"Figma","icon":"Figma"},
    {"name":"Python","icon":"Terminal"},
    {"name":"Linux","icon":"Cpu"},
    {"name":"PostgreSQL","icon":"Database"},
    {"name":"Git","icon":"GitBranch"}
  ],
  "about": {
    "intro": "Frontend developer and UI/UX designer from Addis Ababa, Ethiopia — working at the intersection of code and composition.",
    "stats": [
      {"icon":"Briefcase","title":"Experience","text":"2+ years Frontend Development"},
      {"icon":"GraduationCap","title":"Education","text":"B.Sc. in Software Engineering"},
      {"icon":"ShieldCheck","title":"Certification","text":"Certified in Ethical Hacking"},
      {"icon":"Award","title":"Nano Degree","text":"Data Analysis specialization"}
    ],
    "skill_groups": [
      {"title":"Frontend Development","items":[["HTML","Experienced"],["CSS","Experienced"],["SASS","Intermediate"],["JavaScript","Basic"],["React","Basic"],["Angular","Intermediate"]]},
      {"title":"Back-End Development","items":[["Laravel","Basic"],["PostgreSQL","Basic"],["MySQL","Experienced"],["Node JS","Intermediate"],["Express JS","Intermediate"],["Git","Intermediate"]]},
      {"title":"Cybersecurity","items":[["Linux","Intermediate"],["RedHat","Intermediate"],["Kali Linux","Intermediate"],["PenTesting","Intermediate"],["Wireshark","Intermediate"],["Metasploit","Intermediate"]]},
      {"title":"UI/UX Design","items":[["Figma","Intermediate"],["Canva","Intermediate"],["Photoshop","Intermediate"],["Sketch","Intermediate"],["Adobe XD","Intermediate"],["InVision","Intermediate"]]}
    ],
    "hobbies": [
      {"img":"/images/hobbie1.png","items":[{"icon":"Camera","label":"Photography"},{"icon":"Film","label":"Movies"}]},
      {"img":"/images/hobbie2.png","items":[{"icon":"Pencil","label":"Sketching"},{"icon":"BookOpen","label":"Reading Books"}]},
      {"img":"/images/hobbie3.png","items":[{"icon":"Music","label":"Exploring Music"},{"icon":"Languages","label":"Learning Languages"}]}
    ],
    "values": [
      {"icon":"Compass","title":"Clarity over cleverness","desc":"Interfaces should feel obvious. If a user needs a tooltip, I have already failed somewhere upstream."},
      {"icon":"Lightbulb","title":"Considered, not over-designed","desc":"Every line, color and animation earns its place — or it does not ship."},
      {"icon":"Users","title":"Collaboration first","desc":"The best work happens when design, engineering and product genuinely listen to each other."},
      {"icon":"ShieldCheck","title":"Ship with integrity","desc":"Accessible, performant, and honest about what the product does and does not do."}
    ],
    "timeline": [
      {"year":"2026","title":"Independent design & development","body":"Building product-focused websites and interfaces for studios and startups."},
      {"year":"2024","title":"Frontend Engineer · EMCCMO","body":"Led the design and build of a royalty platform for Ethiopian musicians."},
      {"year":"2023","title":"Certification — Ethical Hacking","body":"Deepened my interest in security and the underlying mechanics of the web."},
      {"year":"2022","title":"Nano Degree — Data Analysis","body":"Picked up Python, Pandas and visualization to inform design decisions with data."},
      {"year":"2020","title":"B.Sc. Software Engineering","body":"Foundation in algorithms, systems and software architecture."}
    ]
  },
  "interests": {
    "art_blurb": "I have a deep love for art, especially paintings. Each piece speaks to me in unique ways — here are some of my favorite collections that inspire and captivate me.",
    "art_images": ["/images/art-image1.jfif","/images/art-image2.jfif","/images/art-image3.jfif","/images/art-image5.jpg"],
    "space_blurb": "Space has always fascinated humanity, with its vastness and mysteries waiting to be uncovered. It reminds us of our small yet significant place in the universe.",
    "books": [
      {"img":"/images/threebody.jpg","title":"The Three-Body Problem","text":"Liu Cixin explores humanity response to an impending alien invasion, blending science and philosophy."},
      {"img":"/images/theidiot.jpg","title":"The Idiot","text":"Dostoevsky profound tale of love, morality, and the struggle for goodness in a flawed world."},
      {"img":"/images/wutheringheights.jpg","title":"Wuthering Heights","text":"Emily Brontë timeless story of passion, vengeance, and the haunting power of love."}
    ]
  },
  "resume": {
    "github_image": "/images/liyat-github.jpg",
    "github_url": "https://github.com/liyat-1",
    "github_blurb": "Source code, experiments, and open contributions live here.",
    "cv_image": "/images/cv-image.webp",
    "cv_blurb": "Discover my expertise and accomplishments at a glance. Download the full document or get in touch to learn more."
  }
}'::jsonb);