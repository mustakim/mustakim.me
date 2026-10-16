"use client";

/**
 * Shah Abdul Mustakim — Portfolio
 * Single-file Next.js (App Router) page. Drop in as app/page.tsx.
 *
 * Deps:  npm i lucide-react
 * Needs: Tailwind CSS (v3 or v4). No other runtime deps — animations are
 *        pure CSS + IntersectionObserver. Add /public/resume.pdf for the resume button.
 */

import { useEffect, useRef, useState, type ReactNode, type FormEvent } from "react";
import {
  ArrowUpRight, Download, Mail, Phone, MapPin, Cpu, Smartphone, Globe, Server,
  Brain, Users, GraduationCap, Trophy, Medal, Award, ChevronDown, Send, Radio,
  Layers, Sparkles, CalendarCheck, Droplets, Scissors, LayoutDashboard, Plane,
  Briefcase, Code2, Check,
} from "lucide-react";

/* ───────────────────────── DATA ───────────────────────── */

const LINKS = {
  linkedin: "https://www.linkedin.com/in/mustakimparvez/",
  github: "https://github.com/mustakim",
  resume: "/resume.pdf",
  email: "shahabdulmustakim@gmail.com",
  phone: "(+880) 1680-459329",
};

const ROLES = ["Staff Software Engineer", "System Architect", "Mobile & Web Engineering Leader"];

const STATS = [
  { value: "8+", label: "Years Experience" },
  { value: "Staff", label: "Engineer · SELISE Digital Platforms" },
  { value: "3", label: "Platforms · Mobile, Web & IoT" },
];

const SKILLS = [
  {
    title: "Languages", icon: Code2, span: "md:col-span-2", accent: "from-violet-500/30",
    items: ["JavaScript (ES6+)", "TypeScript", "Dart", "Python", "Java"],
  },
  {
    title: "Frontend & Mobile", icon: Smartphone, span: "md:col-span-2 md:row-span-2", accent: "from-cyan-500/30",
    items: ["Flutter", "Angular", "React", "Next.js", "Redux", "RxJS", "BLOC Pattern", "Tailwind CSS"],
  },
  {
    title: "IoT & Tools", icon: Radio, span: "md:col-span-2", accent: "from-emerald-500/30",
    items: ["ThingsBoard", "Git", "Docker", "Postman", "Jira"],
  },
  {
    title: "Backend & Cloud", icon: Server, span: "md:col-span-4", accent: "from-fuchsia-500/30",
    items: [
      "Node.js", "Express", "NestJS", "Java", "RESTful APIs", "WebSockets", "MQTT",
      "PostgreSQL", "MongoDB", "Firebase", "AWS", "Azure", "Microsoft Fabric",
    ],
  },
];

const EXPERIENCE = [
  {
    company: "SELISE Digital Platforms",
    role: "Staff Software Engineer",
    period: "Jul 2022 – Present",
    note: "Progressed SE → Sr. SE → Staff SE",
    points: [
      "Multi-project technical leadership across 2 Flutter cross-platform products and 1 Angular/Java enterprise web platform.",
      "Architected real-time telemetry dashboards using React and Microsoft Fabric.",
      "Own IoT telemetry protocols (MQTT, WebSockets, HTTP) on ThingsBoard for smart grids and water meters.",
      "Drive organization-wide AI tooling adoption frameworks and technical recruitment governance.",
    ],
  },
  {
    company: "M2SYS Technology",
    role: "Software Engineer",
    period: "Jul 2020 – Jun 2022",
    note: "CloudApper platform",
    points: [
      "Built CloudApper's distributed data import engine.",
      "Delivered dynamic onboarding engines and a SaaS peer-to-peer app marketplace.",
    ],
  },
  {
    company: "Engineering Resources International",
    role: "Software Engineer",
    period: "Oct 2018 – Jun 2020",
    note: "Industrial SaaS",
    points: [
      "Shipped a full-stack industrial resource tracking SaaS.",
      "Implemented WebSocket-based 1-to-1 and group chat modules.",
    ],
  },
];

const PROJECTS = [
  {
    title: "AI-Powered Travel Assistant", cat: "AI", icon: Plane, grad: "from-violet-500 to-fuchsia-500",
    desc: "LLM agent-driven conversational travel system.",
    stack: ["Flutter", "Angular", "Node.js", "Java", "Firebase"],
  },
  {
    title: "IoT Telemetry & Smart Infrastructure", cat: "IoT", icon: Droplets, grad: "from-cyan-400 to-emerald-400",
    desc: "Real-time monitoring dashboard for smart meters and hydrants.",
    stack: ["ThingsBoard", "WebSockets", "MQTT", "React"],
  },
  {
    title: "Salon Management Platform", cat: "Mobile", icon: Scissors, grad: "from-amber-400 to-pink-500",
    desc: "End-to-end appointment scheduling, admin suite and technician management app.",
    stack: ["Flutter", "Node.js", "PostgreSQL"],
  },
  {
    title: "Dynamic Canvas & Form Builder", cat: "Web", icon: LayoutDashboard, grad: "from-emerald-400 to-cyan-500",
    desc: "Drag-and-drop builder engine for real-time rendering and dynamic layout creation.",
    stack: ["Angular", "TypeScript", "RxJS"],
  },
];
const FILTERS = ["All", "AI", "IoT", "Mobile", "Web"];

const AWARDS = [
  { icon: Medal, title: "Silver Prize", sub: "AIUB CS Fest Programming Contest", year: "2017" },
  { icon: Trophy, title: "1st Place", sub: "National Science Fair", year: "2010" },
  { icon: Award, title: "3rd Place", sub: "Bangladesh Math Olympiad", year: "2010" },
];

/* ───────────────────────── HELPERS ───────────────────────── */

const LinkedinIcon = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
  </svg>
);
const GithubIcon = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
    <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.68-1.28-1.68-1.05-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5z" />
  </svg>
);

/** Fades/slides children in when scrolled into view. */
function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && (setShown(true), io.disconnect()), { threshold: 0.12 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}
    >
      {children}
    </div>
  );
}

/** Glass card with a cursor-tracking spotlight. */
function Spot({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={ref}
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        ref.current!.style.setProperty("--mx", `${e.clientX - r.left}px`);
        ref.current!.style.setProperty("--my", `${e.clientY - r.top}px`);
      }}
      className={`spot group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl transition-all duration-300 hover:border-white/25 hover:-translate-y-1 ${className}`}
    >
      {children}
    </div>
  );
}

const SectionTitle = ({ kicker, title }: { kicker: string; title: string }) => (
  <Reveal className="mb-12">
    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-cyan-400">{kicker}</p>
    <h2 className="text-3xl font-bold tracking-tight sm:text-5xl">{title}</h2>
  </Reveal>
);

/* ───────────────────────── PAGE ───────────────────────── */

export default function Portfolio() {
  const [progress, setProgress] = useState(0);
  const [roleIdx, setRoleIdx] = useState(0);
  const [open, setOpen] = useState(0);
  const [filter, setFilter] = useState("All");
  const [sent, setSent] = useState(false);
  const glow = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      setProgress((h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100);
    };
    const onMove = (e: MouseEvent) => {
      if (glow.current) glow.current.style.transform = `translate(${e.clientX - 250}px, ${e.clientY - 250}px)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMove);
    const t = setInterval(() => setRoleIdx((i) => (i + 1) % ROLES.length), 2600);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMove);
      clearInterval(t);
    };
  }, []);

  const projects = PROJECTS.filter((p) => filter === "All" || p.cat === filter);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const subject = encodeURIComponent(`Portfolio inquiry from ${f.get("name")}`);
    const body = encodeURIComponent(`${f.get("message")}\n\n— ${f.get("name")} (${f.get("email")})`);
    window.location.href = `mailto:${LINKS.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  const nav = ["About", "Skills", "Experience", "Projects", "Contact"];

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#05050a] text-white antialiased selection:bg-violet-500/40">
      <style>{`
        html{scroll-behavior:smooth}
        .spot::before{content:"";position:absolute;inset:0;opacity:0;transition:opacity .3s;pointer-events:none;
          background:radial-gradient(400px circle at var(--mx,50%) var(--my,50%),rgba(139,92,246,.18),transparent 60%)}
        .spot:hover::before{opacity:1}
        @keyframes floaty{0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(40px,-30px) scale(1.15)}}
        @keyframes pulse-ring{0%{box-shadow:0 0 0 0 rgba(52,211,153,.6)}100%{box-shadow:0 0 0 12px rgba(52,211,153,0)}}
        @keyframes shine{to{background-position:200% center}}
        @keyframes marquee{to{transform:translateX(-50%)}}
        @keyframes roleIn{from{opacity:0;transform:translateY(12px);filter:blur(6px)}to{opacity:1;transform:none;filter:none}}
        .gradient-text{background:linear-gradient(90deg,#a78bfa,#22d3ee,#34d399,#a78bfa);background-size:200% auto;
          -webkit-background-clip:text;background-clip:text;color:transparent;animation:shine 6s linear infinite}
        @media (prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important}}
      `}</style>

      {/* scroll progress */}
      <div className="fixed left-0 top-0 z-[60] h-[3px] bg-gradient-to-r from-violet-500 via-cyan-400 to-emerald-400" style={{ width: `${progress}%` }} />

      {/* cursor glow + mesh background */}
      <div ref={glow} className="pointer-events-none fixed left-0 top-0 z-0 hidden h-[500px] w-[500px] rounded-full bg-violet-600/10 blur-[120px] transition-transform duration-300 ease-out md:block" />
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute -left-40 -top-40 h-[600px] w-[600px] rounded-full bg-violet-600/25 blur-[140px]" style={{ animation: "floaty 18s ease-in-out infinite" }} />
        <div className="absolute -right-40 top-1/3 h-[500px] w-[500px] rounded-full bg-cyan-500/20 blur-[140px]" style={{ animation: "floaty 22s ease-in-out infinite reverse" }} />
        <div className="absolute -bottom-40 left-1/4 h-[500px] w-[500px] rounded-full bg-emerald-500/15 blur-[140px]" style={{ animation: "floaty 26s ease-in-out infinite" }} />
        <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      </div>

      {/* NAV */}
      <header className="fixed inset-x-0 top-4 z-50 mx-auto w-[calc(100%-2rem)] max-w-5xl">
        <nav className="flex items-center justify-between rounded-full border border-white/10 bg-black/40 px-5 py-3 backdrop-blur-xl">
          <a href="#top" className="text-sm font-bold tracking-tight">
            SAM<span className="text-cyan-400">.</span>
          </a>
          <ul className="hidden items-center gap-6 text-sm text-white/60 md:flex">
            {nav.map((n) => (
              <li key={n}>
                <a href={`#${n.toLowerCase()}`} className="transition hover:text-white">{n}</a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
        {/* ───────── HERO ───────── */}
        <section id="top" className="pb-16 pt-24 sm:pt-28">
          <Reveal>
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] text-white shadow-[0_30px_120px_-30px_rgba(139,92,246,0.5)] backdrop-blur-xl sm:rounded-[2.5rem]">
              {/* soft brand glow behind the portrait */}
              <div className="pointer-events-none absolute bottom-0 left-1/2 z-[15] h-[70%] w-[55%] -translate-x-1/2 rounded-full bg-gradient-to-t from-violet-500/50 via-cyan-400/25 to-transparent blur-3xl" />
              {/* top bar */}
              <div className="relative z-30 flex items-center justify-between gap-3 px-5 pt-5 sm:px-8 sm:pt-7">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-medium text-white backdrop-blur sm:text-sm">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" style={{ animation: "pulse-ring 1.6s infinite" }} />
                  Open to relocation
                </span>
                <a href="#contact" className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-xs font-semibold text-black shadow-lg transition hover:scale-105 sm:text-sm">
                  Let’s Talk <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>

              {/* giant name behind portrait */}
              <h1 className="pointer-events-none relative z-10 mt-6 select-none px-4 text-center font-normal uppercase [font-family:var(--font-display)] leading-[0.9] tracking-tighter sm:mt-10">
                <span className="block whitespace-nowrap text-[11vw] tracking-normal text-transparent [-webkit-text-stroke:2px_rgba(255,255,255,0.85)] sm:text-[8.5vw] lg:text-[8rem]">Shah Abdul</span>
                <span className="gradient-text block whitespace-nowrap text-[11vw] sm:text-[8.5vw] lg:text-[8rem]">Mustakim</span>
              </h1>

              {/* portrait — your original photo with the background removed */}
              <div className="relative z-20 -mt-[8vw] flex justify-center sm:-mt-[5vw] lg:-mt-16">
                <img
                  src="/mustakim-cutout.webp"
                  alt="Shah Abdul Mustakim"
                  width={1254}
                  height={1254}
                  className="h-auto w-[78vw] max-w-[640px] sm:w-[48vw]"
                  style={{
                    WebkitMaskImage: "linear-gradient(to right, transparent 0, #000 14%, #000 86%, transparent 100%)",
                    maskImage: "linear-gradient(to right, transparent 0, #000 14%, #000 86%, transparent 100%)",
                  }}
                />
              </div>

              {/* bottom-left copy */}
              <div className="relative z-30 px-5 pb-6 sm:absolute sm:bottom-8 sm:left-8 sm:max-w-[26%] sm:px-0 sm:pb-0 lg:bottom-10 lg:left-10">
                <p key={roleIdx} style={{ animation: "roleIn .6s ease-out" }} className="text-xl font-bold leading-tight sm:text-2xl">{ROLES[roleIdx]}</p>
                <p className="mt-2 text-sm leading-relaxed text-white/60">
                  Architecting high-scale distributed systems, real-time IoT pipelines and AI-driven enterprise platforms — 8+ years of engineering leadership.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <a href="#projects" className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-500 to-cyan-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition hover:shadow-[0_0_30px_4px_rgba(139,92,246,0.5)]">
                    View Projects <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                </div>
              </div>

              {/* bottom-right social pills */}
              <div className="relative z-30 flex flex-wrap gap-2 px-5 pb-6 sm:absolute sm:bottom-8 sm:right-8 sm:w-44 sm:flex-col sm:items-stretch sm:px-0 sm:pb-0 lg:bottom-10 lg:right-10">
                {[
                  { l: "LinkedIn", h: LINKS.linkedin, i: <LinkedinIcon /> },
                  { l: "GitHub", h: LINKS.github, i: <GithubIcon /> },
                  { l: "Resume", h: LINKS.resume, i: <Download className="h-4 w-4" />, d: true },
                ].map((s) => (
                  <a key={s.l} href={s.h} target={s.d ? undefined : "_blank"} rel="noreferrer" download={s.d || undefined}
                     className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2.5 text-sm font-semibold text-white backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/20">
                    {s.i} {s.l}
                  </a>
                ))}
              </div>
            </div>
          </Reveal>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {STATS.map((s, i) => (
              <Reveal key={s.label} delay={200 + i * 100}>
                <Spot className="p-5">
                  <div className="text-3xl font-black gradient-text">{s.value}</div>
                  <div className="mt-1 text-sm text-white/60">{s.label}</div>
                </Spot>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ───────── ABOUT ───────── */}
        <section id="about" className="py-24">
          <SectionTitle kicker="About" title="Engineering leadership, end to end." />
          <div className="grid gap-4 md:grid-cols-3">
            <Reveal className="md:col-span-2">
              <Spot className="h-full p-8">
                <Layers className="mb-4 h-7 w-7 text-violet-400" />
                <p className="text-lg leading-relaxed text-white/75">
                  With 8+ years in the field, I lead multi-project engineering deliveries spanning{" "}
                  <b className="text-white">Web</b>, <b className="text-white">Mobile (Flutter / React / Angular)</b> and{" "}
                  <b className="text-white">IoT</b> — turning ambiguous product goals into reliable, scalable systems and
                  growing the teams that ship them.
                </p>
              </Spot>
            </Reveal>
            <Reveal delay={100}>
              <Spot className="h-full p-8">
                <Brain className="mb-4 h-7 w-7 text-cyan-400" />
                <h3 className="mb-2 font-semibold">AI Adoption Leadership</h3>
                <p className="text-sm leading-relaxed text-white/60">
                  Organizing LLM &amp; AI integration workshops and building frameworks that help whole organizations adopt AI tooling safely.
                </p>
              </Spot>
            </Reveal>
            <Reveal delay={200} className="md:col-span-3">
              <Spot className="p-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <Users className="h-7 w-7 shrink-0 text-emerald-400" />
                  <div>
                    <h3 className="font-semibold">Recruiting &amp; Governance</h3>
                    <p className="text-sm leading-relaxed text-white/60">
                      Candidate recruiting and technical hiring governance — raising the bar for engineering talent and keeping delivery standards consistent across projects.
                    </p>
                  </div>
                </div>
              </Spot>
            </Reveal>
          </div>
        </section>

        {/* ───────── SKILLS BENTO ───────── */}
        <section id="skills" className="py-24">
          <SectionTitle kicker="Stack" title="Tools I build with." />
          <div className="grid auto-rows-[minmax(190px,auto)] gap-4 md:grid-cols-4">
            {SKILLS.map((s, i) => (
              <Reveal key={s.title} delay={i * 80} className={s.span}>
                <Spot className="h-full p-6">
                  <div className={`pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br ${s.accent} to-transparent blur-3xl`} />
                  <div className="relative">
                    <div className="mb-4 flex items-center gap-3">
                      <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/10"><s.icon className="h-5 w-5" /></span>
                      <h3 className="font-semibold">{s.title}</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {s.items.map((it) => (
                        <span key={it} className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-white/75 transition hover:border-cyan-400/60 hover:text-cyan-300">
                          {it}
                        </span>
                      ))}
                    </div>
                  </div>
                </Spot>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ───────── EXPERIENCE ───────── */}
        <section id="experience" className="py-24">
          <SectionTitle kicker="Experience" title="Where I’ve shipped." />
          <div className="relative space-y-4 pl-8 sm:pl-10">
            <div className="absolute bottom-2 left-2 top-2 w-px -translate-x-1/2 bg-gradient-to-b from-violet-500 via-cyan-400 to-transparent" />
            {EXPERIENCE.map((x, i) => {
              const isOpen = open === i;
              return (
                <Reveal key={x.company} delay={i * 100}>
                  <div className="relative">
                    <span className={`absolute -left-8 top-7 h-4 w-4 rounded-full border-2 border-[#05050a] sm:-left-10 ${isOpen ? "bg-cyan-400 shadow-[0_0_14px_#22d3ee]" : "bg-white/30"}`} />
                    <Spot>
                      <button onClick={() => setOpen(isOpen ? -1 : i)} className="flex w-full items-center justify-between gap-4 p-6 text-left" aria-expanded={isOpen}>
                        <div>
                          <div className="flex items-center gap-2 text-xs text-cyan-300"><Briefcase className="h-3.5 w-3.5" />{x.period}</div>
                          <h3 className="mt-1 text-xl font-bold">{x.company}</h3>
                          <p className="text-sm text-white/60">{x.role} · {x.note}</p>
                        </div>
                        <ChevronDown className={`h-5 w-5 shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                      </button>
                      <div className={`grid transition-all duration-500 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                        <ul className="space-y-3 overflow-hidden px-6">
                          {x.points.map((p, k) => (
                            <li key={k} className={`flex gap-3 text-sm leading-relaxed text-white/70 ${k === x.points.length - 1 ? "pb-6" : ""} ${k === 0 ? "pt-1" : ""}`}>
                              <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" /> {p}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </Spot>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* ───────── PROJECTS ───────── */}
        <section id="projects" className="py-24">
          <SectionTitle kicker="Selected work" title="Featured projects." />
          <Reveal className="mb-8 flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`rounded-full border px-4 py-1.5 text-sm transition ${filter === f ? "border-transparent bg-white text-black" : "border-white/15 text-white/60 hover:text-white"
                  }`}
              >
                {f}
              </button>
            ))}
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2">
            {projects.map((p) => (
              <div key={p.title} style={{ animation: "roleIn .5s ease-out" }}>
                <Spot className="h-full p-7">
                  <div className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r ${p.grad} opacity-0 transition group-hover:opacity-100`} />
                  <div className="flex items-start justify-between">
                    <span className={`grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br ${p.grad} text-black`}>
                      <p.icon className="h-6 w-6" />
                    </span>
                    <ArrowUpRight className="h-5 w-5 text-white/30 transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-white" />
                  </div>
                  <h3 className="mt-6 text-xl font-bold">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">{p.desc}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {p.stack.map((s) => (
                      <span key={s} className="rounded-md bg-white/5 px-2 py-1 text-[11px] text-white/60">{s}</span>
                    ))}
                  </div>
                </Spot>
              </div>
            ))}
          </div>
        </section>

        {/* ───────── EDUCATION & AWARDS ───────── */}
        <section id="honors" className="py-24">
          <SectionTitle kicker="Honors" title="Education & awards." />
          <div className="grid gap-4 md:grid-cols-3">
            <Reveal className="md:row-span-1">
              <Spot className="h-full p-7">
                <GraduationCap className="mb-4 h-7 w-7 text-violet-400" />
                <h3 className="font-bold">B.Sc. in CS &amp; Software Engineering</h3>
                <p className="mt-1 text-sm text-white/60">AIUB</p>
                <p className="mt-4 text-3xl font-black gradient-text">3.60<span className="text-base text-white/40"> / 4.00</span></p>
              </Spot>
            </Reveal>
            {AWARDS.slice(0, 2).map((a, i) => (
              <Reveal key={a.title + a.year} delay={(i + 1) * 100}>
                <Spot className="h-full p-7">
                  <a.icon className="mb-4 h-7 w-7 text-amber-300" />
                  <p className="text-xs text-white/40">{a.year}</p>
                  <h3 className="font-bold">{a.title}</h3>
                  <p className="text-sm text-white/60">{a.sub}</p>
                </Spot>
              </Reveal>
            ))}
            <Reveal delay={300} className="md:col-span-3">
              <Spot className="p-7">
                <div className="flex items-center gap-4">
                  {(() => { const a = AWARDS[2]; return <a.icon className="h-7 w-7 shrink-0 text-amber-300" />; })()}
                  <div>
                    <p className="text-xs text-white/40">{AWARDS[2].year}</p>
                    <h3 className="font-bold">{AWARDS[2].title} — <span className="font-medium text-white/60">{AWARDS[2].sub}</span></h3>
                  </div>
                </div>
              </Spot>
            </Reveal>
          </div>
        </section>

        {/* ───────── CONTACT ───────── */}
        <section id="contact" className="py-24">
          <SectionTitle kicker="Contact" title="Let’s build something significant." />
          <div className="grid gap-4 lg:grid-cols-5">
            <Reveal className="lg:col-span-2">
              <Spot className="h-full p-7">
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1.5 text-xs text-emerald-300">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" style={{ animation: "pulse-ring 1.6s infinite" }} />
                  Available for International Relocation &amp; High-Impact Staff/Lead Roles
                </div>
                <ul className="space-y-4 text-sm">
                  <li><a href={`mailto:${LINKS.email}`} className="flex items-center gap-3 text-white/75 transition hover:text-cyan-300"><Mail className="h-4 w-4" />{LINKS.email}</a></li>
                  <li><a href={`tel:${LINKS.phone.replace(/[^+\d]/g, "")}`} className="flex items-center gap-3 text-white/75 transition hover:text-cyan-300"><Phone className="h-4 w-4" />{LINKS.phone}</a></li>
                  <li className="flex items-center gap-3 text-white/75"><MapPin className="h-4 w-4" />Bangladesh · open to relocate</li>
                </ul>
                <div className="mt-8 flex gap-3">
                  <a href={LINKS.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="grid h-11 w-11 place-items-center rounded-full border border-white/15 transition hover:bg-[#0a66c2]/40"><LinkedinIcon /></a>
                  <a href={LINKS.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="grid h-11 w-11 place-items-center rounded-full border border-white/15 transition hover:bg-white/15"><GithubIcon /></a>
                </div>
              </Spot>
            </Reveal>
            <Reveal delay={100} className="lg:col-span-3">
              <Spot className="h-full p-7">
                <form onSubmit={onSubmit} className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    {[{ n: "name", l: "Name", t: "text" }, { n: "email", l: "Email", t: "email" }].map((f) => (
                      <label key={f.n} className="block">
                        <span className="mb-1.5 block text-xs text-white/50">{f.l}</span>
                        <input required name={f.n} type={f.t} className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm outline-none transition focus:border-cyan-400/70 focus:shadow-[0_0_0_4px_rgba(34,211,238,0.12)]" />
                      </label>
                    ))}
                  </div>
                  <label className="block">
                    <span className="mb-1.5 block text-xs text-white/50">Message</span>
                    <textarea required name="message" rows={5} className="w-full resize-none rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm outline-none transition focus:border-cyan-400/70 focus:shadow-[0_0_0_4px_rgba(34,211,238,0.12)]" />
                  </label>
                  <button type="submit" className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-500 to-cyan-500 px-6 py-3 text-sm font-semibold transition hover:shadow-[0_0_40px_6px_rgba(139,92,246,0.4)]">
                    {sent ? "Opening your mail app…" : "Send message"}
                    <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </form>
              </Spot>
            </Reveal>
          </div>
        </section>

        <footer className="border-t border-white/10 py-8 text-center text-xs text-white/40">
          © {new Date().getFullYear()} Shah Abdul Mustakim
        </footer>
      </div>
    </main>
  );
}
