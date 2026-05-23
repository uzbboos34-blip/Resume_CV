import { useState, useRef } from "react";
import CustomCursor from "../components/portfolio/CustomCursor";

// ─── DATA ───────────────────────────────────────────────────────────────
const SKILLS = [
  { name: "NestJS / Express", pct: 95 },
  { name: "TypeScript", pct: 92 },
  { name: "PostgreSQL + Prisma", pct: 90 },
  { name: "Socket.io / REST", pct: 88 },
  { name: "MongoDB + Mongoose", pct: 85 },
  { name: "React 19", pct: 82 },
  { name: "Tailwind CSS", pct: 80 },
  { name: "Python / SQL", pct: 78 },
];

const PROJECTS = [
  {
    num: "01", name: "Education Center CRM & LMS", role: "Full-Stack / Back-End", year: "2024",
    accent: "#7C3AED",
    link: "https://7-oy-xuep.vercel.app/login",
    tags: ["NestJS", "React", "PostgreSQL", "Prisma", "JWT", "RBAC", "Swagger UI"],
    desc: "Developed a comprehensive CRM and Learning Management System (LMS) using NestJS, React, and PostgreSQL. Implemented secure JWT-based authentication and role-based access control (RBAC) for Superadmins, Admins, Teachers, and Students. Designed a PostgreSQL schema with Prisma ORM to manage groups, lessons, and attendance, and integrated Supabase Storage for video uploads. Built interactive grading and examination features, documenting the API endpoints using Swagger UI.",
  },
  {
    num: "02", name: "Zentro — Service Marketplace Platform", role: "Full-Stack", year: "2024",
    accent: "#2563EB",
    link: "https://tez-usta.vercel.app",
    tags: ["NestJS", "React 19", "Tailwind CSS", "PostgreSQL", "Prisma ORM", "Socket.io"],
    desc: "Developed a peer-to-peer service provider platform connecting clients and local handymen/freelancers using NestJS, React 19, Tailwind CSS, and PostgreSQL/SQLite. Implemented a job posting and worker application system with real-time status tracking and geographic filtering (regions/districts). Integrated a live chat module for client-worker communication, a balance/transaction management system with payment request processing (receipt image uploads), and an interactive gamified Wheel of Fortune using dynamic JSON prize configurations. Designed database schemas with Prisma ORM and set up administrative tools for user management, activity logging, and auditing.",
  },
  {
    num: "03", name: "Smart QR Generator & Scanner Platform", role: "Full-Stack", year: "2024",
    accent: "#0EA5E9",
    link: "https://qr-kod-rho.vercel.app/",
    tags: ["React", "Tailwind CSS", "Prisma ORM", "PostgreSQL", "Leaflet", "jsPDF"],
    desc: "Built a dynamic, feature-rich QR code creation and scanning application using React, Tailwind CSS, Prisma ORM, and PostgreSQL. Developed a multi-tab system supporting text/links, image uploads (integrated with ImgBB API), and geo-locations. Integrated a custom-styled Leaflet map picker with draggable markers, browser GPS geolocation detection, and OpenStreetMap (Nominatim) API for search auto-suggestions, featuring a custom Cyrillic-to-Latin transliterator for Uzbek addresses. Built responsive scan result pages that dynamically fetch QR payloads from the database, allowing users to save/download scanned images using jsPDF/html2canvas or launch navigation in Google Maps, Yandex Navigator, 2GIS, or Apple Maps.",
  },
  {
    num: "04", name: "MK Academy — CEFR Platform", role: "Full-Stack / Mobile", year: "2025",
    accent: "#7C3AED",
    link: "https://www.mk-academia.uz/",
    tags: ["NestJS 11", "React 19", "Capacitor", "CI/CD", "Prisma 6"],
    desc: "Built a comprehensive, multi-role CEFR English learning platform with Web, PWA, and Mobile (Android & iOS) applications. Engineered a NestJS 11 back-end with Prisma 6 and a React 19 front-end styled with Tailwind CSS 4. Implemented a multi-role structure (Superadmin, Admin, Teacher, Student) with protected route guards, course/group management, and detailed academic performance dashboards. Designed an advanced vocabulary learning system featuring spaced repetition algorithm models, interactive student tasks, online quiz attempts, and a gamified experience with XP points, achievements, and leaderboard rankings. Built offline-first capabilities using Axios GET caching and service workers, packaged mobile versions using Capacitor, and automated APK/IPA builds via GitHub Actions CI/CD.",
  },
];

// ─── SECTION CONFIGS ─────────────────────────────────────────────────────
const SECTIONS = [
  { id: "hero", label: "HOME", color: "#0A0A0A" },
  { id: "about", label: "ABOUT", color: "#0D0A14" },
  { id: "skills", label: "SKILLS", color: "#0A0D14" },
  { id: "work", label: "WORK", color: "#0A0A14" },
  { id: "education", label: "EDUCATION", color: "#0D0A10" },
];

// ─── GLOW BLOB ────────────────────────────────────────────────────────────
function GlowBlob({ color, size, top, left, opacity = 0.22 }) {
  return (
    <div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size, height: size,
        top, left,
        background: color,
        filter: `blur(${Math.round(size * 0.5)}px)`,
        opacity,
      }}
    />
  );
}

// ─── HERO CARD ────────────────────────────────────────────────────────────
function HeroCard() {
  return (
    <div className="w-full h-full flex flex-col justify-between p-5 md:p-12 relative overflow-hidden" style={{ minHeight: "100%" }}>
      <GlowBlob color="#7C3AED" size={500} top="-100px" left="-80px" opacity={0.35} />
      <GlowBlob color="#2563EB" size={350} top="35%" left="50%" opacity={0.28} />
      <GlowBlob color="#0EA5E9" size={200} top="70%" left="30%" opacity={0.2} />

      {/* Ghost text */}
      <div className="absolute bottom-0 left-0 right-0 select-none pointer-events-none overflow-hidden">
        <div style={{
          fontFamily: "'Inter', sans-serif",
          fontWeight: 700,
          fontSize: "clamp(80px, 18vw, 220px)",
          color: "rgba(255,255,255,0.03)",
          lineHeight: 1,
          letterSpacing: -4,
          whiteSpace: "nowrap",
        }}>ENGINEER</div>
      </div>

      {/* Nav row */}
      <div className="flex justify-center gap-6 md:gap-10 relative z-10">
        {["ABOUT", "SKILLS", "WORK", "EDUCATION"].map(l => (
          <span key={l} className="text-white/40 text-[10px] md:text-[11px] font-medium tracking-[2px]"
            style={{ fontFamily: "'Inter', sans-serif" }}>
            {l}
          </span>
        ))}
      </div>

      {/* Name and Info/Photo block */}
      <div className="relative z-10 mt-8 md:my-auto">
        {/* Top row: Name card (left) + Photo (right) — side by side on all screens */}
        <div className="flex flex-row items-start justify-between gap-3 lg:gap-16 w-full mb-4 lg:mb-6">
          {/* Glassmorphism name card */}
          <div style={{
            background: "rgba(255,255,255,0.05)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 16,
            padding: "28px 36px",
            display: "inline-block",
            boxShadow: "0 8px 40px rgba(124,58,237,0.2)",
            position: "relative",
            overflow: "hidden",
            alignSelf: "flex-start",
            flex: 1,
            minWidth: 0,
          }}>
            {/* Purple corner accent */}
            <div style={{
              position: "absolute", left: -2, top: "20%", bottom: "20%",
              width: 4, borderRadius: 4,
              background: "linear-gradient(to bottom, #7C3AED, #2563EB)",
            }} />
            <div style={{
              position: "absolute", top: 12, right: 16,
              width: 60, height: 2,
              background: "linear-gradient(to right, #7C3AED, #2563EB)",
              borderRadius: 2,
            }} />
            <div style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(32px, 8vw, 64px)",
              color: "#FFFFFF",
              lineHeight: 1.05,
              letterSpacing: -1,
            }}>MAHMUDOV</div>
            <div style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "clamp(28px, 7vw, 56px)",
              background: "linear-gradient(135deg, #A78BFA, #60A5FA)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              lineHeight: 1.1,
            }}>Rahmonbergan</div>
          </div>

          {/* Right: Premium Photo Showcase Card */}
          <div className="relative flex-shrink-0" style={{ animation: "float 6s ease-in-out infinite" }}>
            <div style={{
              position: "absolute",
              inset: -10,
              background: "linear-gradient(135deg, rgba(124,58,237,0.4), rgba(59,130,246,0.3))",
              filter: "blur(20px)",
              borderRadius: 24,
              opacity: 0.85,
            }} />
            <div style={{
              position: "relative",
              width: "clamp(110px, 28vw, 250px)",
              height: "clamp(140px, 35vw, 300px)",
              borderRadius: 24,
              padding: "8px",
              background: "rgba(255, 255, 255, 0.03)",
              backdropFilter: "blur(30px)",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              transition: "transform 0.4s ease, border-color 0.4s ease",
            }} className="hover:border-violet-500/40">
              <img
                src="/photo.jpeg"
                alt="Mahmudov Rahmonbergan"
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: 16,
                  objectFit: "cover",
                  objectPosition: "center top",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              />
            </div>
          </div>
        </div>

        {/* Bio + contacts row — full width, completely unchanged */}
        <div className="flex flex-col md:flex-row gap-4 w-full">
          <div style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 12,
            padding: "16px 20px",
            flex: 1,
          }}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, lineHeight: 1.7, color: "rgba(255,255,255,0.5)" }}>
              Full-stack developer passionate about building modern, scalable, and user-focused web applications using NestJS, React 19, and PostgreSQL. Focused on clean architecture, performance, and real-world solutions.
            </p>
          </div>

          <div style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 12,
            padding: "12px 20px",
            minWidth: 260,
            flex: 1,
          }}>
            {[
              { icon: "📞", val: "+998 90 701 21 61", href: "tel:+998907012161" },
              { icon: "✉", val: "rahmonbergan04@gmail.com", href: "mailto:rahmonbergan04@gmail.com" },
              { icon: "🌐", val: "Najot Ta'lim · FDTU", badge: "Hozir" },
            ].map(({ icon, val, href, badge }) => (
              <div key={val} className="flex items-center gap-3 py-2 border-b border-white/5 last:border-0">
                <span className="text-sm opacity-50">{icon}</span>
                {href
                  ? <a href={href} style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: "rgba(255,255,255,0.6)" }}>{val}</a>
                  : <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: "rgba(255,255,255,0.45)", flex: 1 }}>{val}</span>
                }
                {badge && (
                  <span style={{
                    background: "rgba(124,58,237,0.4)", border: "1px solid rgba(124,58,237,0.6)",
                    borderRadius: 6, padding: "2px 8px",
                    fontFamily: "'Inter', sans-serif", fontSize: 9, color: "#A78BFA", letterSpacing: 1,
                  }}>{badge}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tag line */}
      <div className="relative z-10 mt-4">
        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, color: "rgba(255,255,255,0.2)", letterSpacing: 3 }}>
          FULL-STACK DEVELOPER · TASHKENT
        </div>
      </div>
    </div>
  );
}

// ─── ABOUT CARD ───────────────────────────────────────────────────────────
function AboutCard() {
  return (
    <div className="w-full h-full flex flex-col justify-center p-5 md:p-12 relative overflow-hidden" style={{ minHeight: "100%" }}>
      <GlowBlob color="#2563EB" size={350} top="10%" left="60%" opacity={0.2} />
      <GlowBlob color="#7C3AED" size={250} top="60%" left="-60px" opacity={0.18} />

      <div className="relative z-10 max-w-2xl">
        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, letterSpacing: 3, color: "rgba(255,255,255,0.25)", marginBottom: 20 }}>01 / ABOUT</div>
        <h2 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(40px, 7vw, 72px)",
          fontWeight: 300,
          lineHeight: 0.95,
          color: "#fff",
          marginBottom: 28,
          letterSpacing: -1,
        }}>
          About <em style={{ background: "linear-gradient(135deg,#A78BFA,#60A5FA)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>me</em>
        </h2>

        <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 15, lineHeight: 1.85, color: "rgba(255,255,255,0.55)", marginBottom: 24 }}>
          I’m a passionate <span style={{ color: "#A78BFA" }}>Full-Stack Developer</span> focused on building modern, scalable, and high-performance web applications. Skilled in both front-end and back-end development using technologies like React, NestJS, PostgreSQL, and TypeScript.
        </p>
        <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, lineHeight: 1.9, color: "rgba(255,255,255,0.3)", marginBottom: 40 }}>
          I enjoy turning ideas into real-world digital products with clean architecture, responsive design, and efficient user experiences. Continuously learning and improving through practical projects and modern development practices.
        </p>

        <div className="flex flex-wrap gap-8">
          {[["1+", "Year experience"], ["4", "Production apps"], ["10+", "Tech stack"]].map(([n, l]) => (
            <div key={l}>
              <div style={{
                fontFamily: "'Cormorant Garamond',serif", fontSize: 56, fontWeight: 300,
                background: "linear-gradient(135deg,#A78BFA,#60A5FA)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                lineHeight: 1,
              }}>{n}</div>
              <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 9, color: "rgba(255,255,255,0.25)", letterSpacing: 2, marginTop: 4 }}>{l.toUpperCase()}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── SKILLS CARD ──────────────────────────────────────────────────────────
function SkillsCard() {
  return (
    <div className="w-full h-full flex flex-col justify-center p-5 md:p-12 relative overflow-hidden" style={{ minHeight: "100%" }}>
      <GlowBlob color="#7C3AED" size={300} top="-60px" left="40%" opacity={0.2} />
      <GlowBlob color="#0EA5E9" size={250} top="70%" left="10%" opacity={0.15} />

      <div className="relative z-10 w-full">
        <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 10, letterSpacing: 3, color: "rgba(255,255,255,0.25)", marginBottom: 16 }}>02 / SKILLS</div>
        <h2 style={{
          fontFamily: "'Cormorant Garamond',serif",
          fontSize: "clamp(36px,6vw,60px)",
          fontWeight: 300, lineHeight: 0.95, marginBottom: 32,
          color: "#fff", letterSpacing: -1,
        }}>
          Technical <em style={{ background: "linear-gradient(135deg,#A78BFA,#60A5FA)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>expertise</em>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-1 mb-8">
          {SKILLS.map((s, i) => (
            <SkillBarItem key={s.name} s={s} delay={i * 0.06} />
          ))}
        </div>

        {/* Tag cloud */}
        <div className="flex flex-wrap gap-[5px] mt-2">
          {["TypeScript", "JavaScript", "SQL", "Python", "Node.js", "Express.js", "Nest.js", "React 19", "Vite", "Tailwind CSS", "MUI", "Axios", "REST", "Socket.io", "MongoDB", "PostgreSQL", "MySQL", "Mongoose ODM", "Prisma ORM", "GitHub", "Capacitor"].map(t => (
            <span key={t} style={{
              fontFamily: "'Inter',sans-serif", fontSize: 9, letterSpacing: 1,
              padding: "3px 10px",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 20, color: "rgba(255,255,255,0.4)",
            }}>{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function SkillBarItem({ s, delay }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <div className="flex justify-between mb-1">
        <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: "rgba(255,255,255,0.5)" }}>{s.name}</span>
        <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 9, color: "#A78BFA" }}>{s.pct}%</span>
      </div>
      <div style={{ height: 2, background: "rgba(255,255,255,0.06)", borderRadius: 2, position: "relative" }}>
        <div style={{
          height: 2, borderRadius: 2,
          background: "linear-gradient(90deg,#7C3AED,#2563EB)",
          width: s.pct + "%",
          boxShadow: "0 0 8px rgba(124,58,237,0.5)",
        }} />
      </div>
    </div>
  );
}

// ─── WORK CARD ────────────────────────────────────────────────────────────
function WorkCard() {
  const [active, setActive] = useState(0);
  const p = PROJECTS[active];
  return (
    <div className="w-full h-full flex flex-col p-5 md:p-12 relative overflow-hidden" style={{ minHeight: "100%" }}>
      <GlowBlob color="#2563EB" size={350} top="20%" left="60%" opacity={0.18} />
      <GlowBlob color="#7C3AED" size={200} top="0" left="0" opacity={0.15} />

      <div className="relative z-10 flex-1 flex flex-col">
        <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 10, letterSpacing: 3, color: "rgba(255,255,255,0.25)", marginBottom: 16 }}>03 / WORK</div>
        <h2 style={{
          fontFamily: "'Cormorant Garamond',serif",
          fontSize: "clamp(32px,5vw,52px)",
          fontWeight: 300, lineHeight: 0.95, marginBottom: 20,
          color: "#fff", letterSpacing: -1,
        }}>
          Selected <em style={{ background: "linear-gradient(135deg,#A78BFA,#60A5FA)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>work</em>
        </h2>

        {/* Project tabs */}
        <div className="flex gap-2 mb-5 flex-wrap">
          {PROJECTS.map((pr, i) => (
            <button key={pr.num} onClick={() => setActive(i)} style={{
              fontFamily: "'Inter',sans-serif", fontSize: 9, letterSpacing: 1,
              padding: "4px 12px", borderRadius: 20,
              border: `1px solid ${active === i ? pr.accent + "88" : "rgba(255,255,255,0.1)"}`,
              background: active === i ? pr.accent + "22" : "transparent",
              color: active === i ? "#fff" : "rgba(255,255,255,0.35)",
              cursor: "pointer", transition: "all 0.3s",
            }}>{pr.num}</button>
          ))}
        </div>

        {/* Active project */}
        <div style={{
          background: "rgba(255,255,255,0.04)",
          border: `1px solid ${p.accent}33`,
          borderRadius: 12, padding: "20px 24px", flex: 1,
          boxShadow: `0 4px 30px ${p.accent}15`,
          display: "flex",
          flexDirection: "column",
          justifyContent: "between",
        }}>
          <div>
            <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 9, color: "rgba(255,255,255,0.3)", letterSpacing: 2, marginBottom: 8 }}>
              {p.year} · {p.role.toUpperCase()}
            </div>
            <h3 style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 18, marginBottom: 10, lineHeight: 1.3 }}>
              {p.link ? (
                <a href={p.link} target="_blank" rel="noopener noreferrer" style={{ color: "#fff", transition: "color 0.3s" }} className="hover:text-violet-400">
                  {p.name} <span style={{ fontSize: 14 }}>↗</span>
                </a>
              ) : (
                <span style={{ color: "#fff" }}>{p.name}</span>
              )}
            </h3>
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, lineHeight: 1.8, color: "rgba(255,255,255,0.45)", marginBottom: 14 }}>{p.desc}</p>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-auto pt-4 border-t border-white/5">
            <div className="flex flex-wrap gap-[5px]">
              {p.tags.map(t => (
                <span key={t} style={{
                  fontFamily: "'Inter',sans-serif", fontSize: 8, letterSpacing: 1,
                  padding: "3px 9px", borderRadius: 20,
                  border: `1px solid ${p.accent}44`,
                  color: p.accent, background: `${p.accent}11`,
                }}>{t}</span>
              ))}
            </div>
            {p.link && (
              <a
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: "'Inter',sans-serif",
                  fontSize: 10,
                  fontWeight: 600,
                  letterSpacing: 1,
                  color: "#FFFFFF",
                  background: `${p.accent}22`,
                  border: `1px solid ${p.accent}66`,
                  padding: "6px 16px",
                  borderRadius: 20,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  transition: "all 0.3s ease",
                  boxShadow: `0 0 15px ${p.accent}11`,
                  alignSelf: "flex-start",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = p.accent;
                  e.currentTarget.style.boxShadow = `0 0 25px ${p.accent}55`;
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = `${p.accent}22`;
                  e.currentTarget.style.boxShadow = `0 0 15px ${p.accent}11`;
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                Loyihani ko'rish ↗
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── EDUCATION CARD ───────────────────────────────────────────────────────
function EducationCard() {
  const edus = [
    { school: "Najot Ta'lim", deg: "Full-Stack Development Course", year: "Jun 2025", note: "Tashkent, Uzbekistan · NestJS · React 19 · PostgreSQL · DevOps", link: "https://najottalim.uz" },
    { school: "FDTU", deg: "Bachelor in Software Engineering", year: "Jun 2023", note: "Tashkent, Uzbekistan · Fergana Polytechnic Institute of Technology", link: "https://fstu.uz" },
  ];
  return (
    <div className="w-full h-full flex flex-col justify-center p-5 md:p-12 relative overflow-hidden" style={{ minHeight: "100%" }}>
      <GlowBlob color="#7C3AED" size={300} top="50%" left="60%" opacity={0.18} />
      <GlowBlob color="#2563EB" size={200} top="0" left="30%" opacity={0.15} />

      <div className="relative z-10 max-w-xl">
        <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 10, letterSpacing: 3, color: "rgba(255,255,255,0.25)", marginBottom: 16 }}>04 / EDUCATION</div>
        <h2 style={{
          fontFamily: "'Cormorant Garamond',serif",
          fontSize: "clamp(36px,6vw,60px)",
          fontWeight: 300, lineHeight: 0.95, marginBottom: 32,
          color: "#fff", letterSpacing: -1,
        }}>
          Academic <em style={{ background: "linear-gradient(135deg,#A78BFA,#60A5FA)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>background</em>
        </h2>

        {edus.map((e, i) => (
          <div key={e.school} style={{
            borderTop: "1px solid rgba(255,255,255,0.07)",
            padding: "24px 0",
            display: "grid", gridTemplateColumns: "1fr auto", gap: 16,
          }}>
            <div>
              <div style={{ fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 18, marginBottom: 4 }}>
                {e.link ? (
                  <a href={e.link} target="_blank" rel="noopener noreferrer" style={{ color: "rgba(255,255,255,0.8)", transition: "color 0.3s" }} className="hover:text-violet-400">
                    {e.school} <span style={{ fontSize: 13, opacity: 0.5 }}>↗</span>
                  </a>
                ) : (
                  <span style={{ color: "rgba(255,255,255,0.8)" }}>{e.school}</span>
                )}
              </div>
              <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: "rgba(255,255,255,0.35)", marginBottom: 6 }}>{e.deg}</div>
              <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: "rgba(255,255,255,0.22)", fontStyle: "italic" }}>{e.note}</div>
            </div>
            <div style={{ fontFamily: "'Inter',sans-serif", fontSize: 9, color: "#A78BFA", letterSpacing: 1, alignSelf: "center", textAlign: "right", whiteSpace: "nowrap" }}>{e.year}</div>
          </div>
        ))}
      </div>
    </div>
  );
}



// ─── CARD CONTENTS MAP ────────────────────────────────────────────────────
const CARD_CONTENT = [HeroCard, AboutCard, SkillsCard, WorkCard, EducationCard];

const BG_COLORS = [
  "#0A0A0E", "#0D0A18", "#0A0D18", "#0A0A16", "#0F0A14"
];

// ─── MOBILE DETECTION HOOK ────────────────────────────────────────────────
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useState(() => {
    const handler = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  });
  return isMobile;
}

// ─── MAIN ─────────────────────────────────────────────────────────────────
export default function Home() {
  const [stack, setStack] = useState([0, 1, 2, 3, 4]);
  const isMobile = useIsMobile();

  const bringToFront = (cardIndex) => {
    setStack(prev => {
      if (prev[0] === cardIndex) return prev;
      return [cardIndex, ...prev.filter(i => i !== cardIndex)];
    });
  };

  const total = SECTIONS.length;
  const activeIdx = stack[0];

  // ── MOBILE LAYOUT ────────────────────────────────────────────────────────
  if (isMobile) {
    const Section = CARD_CONTENT[activeIdx];
    return (
      <div style={{ width: "100vw", height: "100vh", background: "#060606", overflow: "hidden", position: "fixed", inset: 0, display: "flex", flexDirection: "column" }}>
        {/* Content area */}
        <div style={{ flex: 1, overflow: "hidden", background: BG_COLORS[activeIdx], position: "relative" }}>
          <GlowBlob color="#7C3AED" size={300} top="-60px" left="-40px" opacity={0.3} />
          <GlowBlob color="#2563EB" size={250} top="50%" left="50%" opacity={0.2} />
          <div style={{ width: "100%", height: "100%", overflowY: "auto" }}>
            <Section />
          </div>
        </div>

        {/* Bottom nav tabs */}
        <div style={{
          display: "flex",
          background: "rgba(10,10,14,0.95)",
          backdropFilter: "blur(20px)",
          borderTop: "1px solid rgba(255,255,255,0.08)",
          paddingBottom: "env(safe-area-inset-bottom, 0px)",
          zIndex: 200,
        }}>
          {SECTIONS.map((sec, i) => {
            const isActive = activeIdx === i;
            return (
              <button
                key={sec.id}
                onClick={() => bringToFront(i)}
                style={{
                  flex: 1,
                  padding: "12px 4px 10px",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 4,
                  transition: "all 0.3s",
                  borderTop: isActive ? "2px solid #7C3AED" : "2px solid transparent",
                }}
              >
                <span style={{
                  fontFamily: "'Inter',sans-serif",
                  fontSize: 7,
                  fontWeight: 600,
                  letterSpacing: 1.5,
                  color: isActive ? "#A78BFA" : "rgba(255,255,255,0.3)",
                  transition: "color 0.3s",
                  whiteSpace: "nowrap",
                }}>
                  {sec.label}
                </span>
                {isActive && (
                  <div style={{
                    width: 3, height: 3, borderRadius: "50%",
                    background: "linear-gradient(135deg,#7C3AED,#2563EB)",
                  }} />
                )}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // ── DESKTOP LAYOUT (stacked cards) ───────────────────────────────────────
  return (
    <div style={{ width: "100vw", height: "100vh", background: "#060606", overflow: "hidden", position: "fixed", inset: 0 }}>
      <CustomCursor />

      {[...stack].reverse().map((cardIdx) => {
        const posInStack = stack.indexOf(cardIdx);
        const isTop = posInStack === 0;
        const Section = CARD_CONTENT[cardIdx];
        const label = SECTIONS[cardIdx].label;

        const PEEK_W = 52;
        const PEEK_GAP = 5;
        const totalPeek = (total - 1) * (PEEK_W + PEEK_GAP);
        const cardWidth = isTop ? `calc(100vw - ${totalPeek}px)` : `${PEEK_W}px`;

        return (
          <div
            key={cardIdx}
            onClick={() => !isTop && bringToFront(cardIdx)}
            style={{
              position: "absolute",
              top: 0,
              height: "100vh",
              background: BG_COLORS[cardIdx],
              borderRadius: isTop ? 0 : "14px 14px 14px 14px",
              border: isTop ? "none" : "1px solid rgba(255,255,255,0.1)",
              transition: "all 0.6s cubic-bezier(.16,1,.3,1)",
              cursor: isTop ? "default" : "pointer",
              overflow: "hidden",
              zIndex: isTop ? 100 : 90 - posInStack,
              width: cardWidth,
              boxShadow: isTop ? "none" : "0 8px 32px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06)",
              ...(isTop
                ? { left: 0 }
                : { right: (posInStack - 1) * (PEEK_W + PEEK_GAP), left: "auto" }
              ),
            }}
          >
            {!isTop && (
              <>
                <div style={{
                  position: "absolute", top: "50%", left: "50%",
                  transform: "translate(-50%,-50%) rotate(-90deg)",
                  fontFamily: "'Inter',sans-serif", fontWeight: 600, fontSize: 9,
                  letterSpacing: 3, color: "rgba(255,255,255,0.6)",
                  whiteSpace: "nowrap", userSelect: "none", pointerEvents: "none",
                }}>
                  {label}
                </div>
                <div style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(to right, rgba(124,58,237,0.2), rgba(37,99,235,0.1), transparent)",
                  pointerEvents: "none",
                }} />
              </>
            )}

            {(isTop || posInStack === 1) && (
              <div style={{ opacity: isTop ? 1 : 0, transition: "opacity 0.4s", width: "100%", height: "100%" }}>
                <Section />
              </div>
            )}
          </div>
        );
      })}

      {stack[0] === 0 && (
        <div style={{
          position: "fixed", bottom: 24,
          right: (total - 1) * (44 + 6) + 60,
          fontFamily: "'Inter',sans-serif", fontSize: 9,
          color: "rgba(255,255,255,0.2)", letterSpacing: 2,
          pointerEvents: "none", zIndex: 999,
        }}>
          ← CLICK TO NAVIGATE
        </div>
      )}
    </div>
  );
}