import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import {
  Github,
  Mail,
  Phone,
  Download,
  ArrowRight,
  Code2,
  Database,
  FileText,
  Sparkles,
  Users,
  Clock,
  MessageSquare,
  Brain,
  Briefcase,
  GraduationCap,
  Target,
  Rocket,
} from "lucide-react";
import profilePic from "@/assets/profile.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mohammed Munawar — Aspiring Software Developer" },
      {
        name: "description",
        content:
          "Portfolio of Mohammed Munawar, BCA student at ST Pauls Degree and PG College, passionate programmer seeking internship opportunities.",
      },
      { property: "og:title", content: "Mohammed Munawar — Portfolio" },
      {
        property: "og:description",
        content: "BCA student & aspiring software developer. Java, C, C++, SQL.",
      },
    ],
  }),
  component: Portfolio,
});

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#services", label: "Services" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

const technicalSkills = [
  { name: "Basic Java", level: 70, icon: Code2 },
  { name: "C Language", level: 75, icon: Code2 },
  { name: "C++", level: 65, icon: Code2 },
  { name: "SQL", level: 70, icon: Database },
  { name: "MS Excel", level: 80, icon: FileText },
  { name: "MS Word", level: 90, icon: FileText },
  { name: "PowerPoint", level: 85, icon: FileText },
];

const softSkills = [
  { name: "Communication", icon: MessageSquare },
  { name: "Teamwork", icon: Users },
  { name: "Time Management", icon: Clock },
  { name: "Problem Solving", icon: Brain },
];

const services = [
  {
    title: "Basic Software Development",
    desc: "Building small applications and utilities with clean, readable code.",
    icon: Rocket,
  },
  {
    title: "Java / C / C++ Programs",
    desc: "Writing simple programs and helping with foundational coding tasks.",
    icon: Code2,
  },
  {
    title: "Database Handling",
    desc: "Designing simple schemas and writing SQL queries for data tasks.",
    icon: Database,
  },
  {
    title: "Beginner Coding Help",
    desc: "Assisting fellow learners with logic, debugging, and concepts.",
    icon: Sparkles,
  },
];

function Nav() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-background/60 border-b border-border/50">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#home" className="font-bold tracking-tight text-lg">
          <span className="bg-[image:var(--gradient-primary)] bg-clip-text text-transparent">
            MM.
          </span>
        </a>
        <nav className="hidden md:flex items-center gap-8 text-sm">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <a href="#contact">
          <Button variant="hero" size="sm">
            Hire Me
          </Button>
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-24 pb-16 px-6 overflow-hidden"
      style={{ background: "var(--gradient-hero)" }}
    >
      <div
        className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full opacity-30 blur-3xl"
        style={{ background: "var(--gradient-primary)" }}
        aria-hidden
      />
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center relative">
        <div className="space-y-6 order-2 md:order-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-card/50 text-xs text-muted-foreground">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Available for internships
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.05]">
            MOHAMMED
            <br />
            <span className="bg-[image:var(--gradient-primary)] bg-clip-text text-transparent">
              MUNAWAR
            </span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
            Aspiring Software Developer & BCA student at ST Pauls Degree and PG College.
            Passionate about problem-solving, logical thinking, and the latest in technology.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <a href="#contact">
              <Button variant="hero" size="lg">
                Hire Me <ArrowRight className="ml-1" />
              </Button>
            </a>
            <a href="#contact">
              <Button variant="outline" size="lg">
                <Mail /> Contact Me
              </Button>
            </a>
            <a href="https://github.com/munawwar06" target="_blank" rel="noreferrer">
              <Button variant="ghost" size="lg">
                <Github /> GitHub
              </Button>
            </a>
          </div>
        </div>
        <div className="order-1 md:order-2 flex justify-center md:justify-end">
          <div className="relative">
            <div
              className="absolute -inset-4 rounded-full opacity-60 blur-2xl"
              style={{ background: "var(--gradient-primary)" }}
              aria-hidden
            />
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-2 border-primary/40 shadow-[var(--shadow-glow)]">
              <img
                src={profilePic}
                alt="Mohammed Munawar"
                width={768}
                height={768}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionHeader({ tag, title }: { tag: string; title: string }) {
  return (
    <div className="mb-12 text-center">
      <p className="text-sm uppercase tracking-[0.3em] text-primary mb-3">{tag}</p>
      <h2 className="text-3xl md:text-5xl font-bold tracking-tight">{title}</h2>
    </div>
  );
}

function About() {
  const items = [
    { icon: GraduationCap, label: "BCA at ST Pauls Degree and PG College" },
    { icon: Target, label: "Expected graduation: 2027" },
    { icon: Brain, label: "Strong interest in logic & problem solving" },
    { icon: Sparkles, label: "Always learning new technologies" },
    { icon: Briefcase, label: "Seeking internship opportunities" },
  ];
  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <SectionHeader tag="About" title="A motivated learner, building the basics right." />
        <Card className="p-8 md:p-12 bg-card/60 border-border/60">
          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
            I'm a Bachelor of Computer Applications student at ST Pauls Degree and PG
            College, on track to graduate in 2027. I love sharpening my logical thinking and
            problem-solving skills, and I keep up with the latest technology trends. My
            goal is simple: land a meaningful programming internship and grow into a
            confident software developer.
          </p>
          <ul className="grid sm:grid-cols-2 gap-4">
            {items.map((it) => (
              <li key={it.label} className="flex items-start gap-3">
                <div className="mt-1 p-2 rounded-md bg-primary/10 text-primary">
                  <it.icon size={18} />
                </div>
                <span className="text-foreground/90">{it.label}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="py-24 px-6 bg-secondary/20">
      <div className="max-w-6xl mx-auto">
        <SectionHeader tag="Skills" title="What I work with" />
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="p-8 bg-card/60 border-border/60">
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Code2 className="text-primary" /> Technical Skills
            </h3>
            <div className="space-y-5">
              {technicalSkills.map((s) => (
                <div key={s.name}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="flex items-center gap-2">
                      <s.icon size={14} className="text-primary" /> {s.name}
                    </span>
                    <span className="text-muted-foreground">{s.level}%</span>
                  </div>
                  <Progress value={s.level} className="h-2" />
                </div>
              ))}
            </div>
          </Card>
          <Card className="p-8 bg-card/60 border-border/60">
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Sparkles className="text-accent" /> Soft Skills
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {softSkills.map((s) => (
                <div
                  key={s.name}
                  className="p-5 rounded-lg border border-border/60 bg-background/40 hover:border-primary/50 hover:-translate-y-1 transition-all"
                >
                  <s.icon className="text-primary mb-3" />
                  <p className="font-medium">{s.name}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeader tag="Services" title="How I can help" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s) => (
            <Card
              key={s.title}
              className="p-6 bg-card/60 border-border/60 hover:border-primary/50 hover:-translate-y-1 transition-all group"
            >
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 bg-primary/10 text-primary group-hover:bg-[image:var(--gradient-primary)] group-hover:text-primary-foreground transition-all">
                <s.icon />
              </div>
              <h3 className="font-semibold mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section id="projects" className="py-24 px-6 bg-secondary/20">
      <div className="max-w-4xl mx-auto">
        <SectionHeader tag="Portfolio" title="Projects" />
        <Card className="p-12 text-center bg-card/60 border-dashed border-border">
          <div
            className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-6"
            style={{ background: "var(--gradient-primary)" }}
          >
            <Rocket className="text-primary-foreground" />
          </div>
          <h3 className="text-2xl font-semibold mb-3">Projects coming soon</h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            I'm actively learning and building. Check back here — or follow my journey on
            GitHub for the first commits.
          </p>
          <a href="https://github.com/munawwar06" target="_blank" rel="noreferrer">
            <Button variant="outline">
              <Github /> Visit my GitHub
            </Button>
          </a>
        </Card>
      </div>
    </section>
  );
}

function Contact() {
  const [loading, setLoading] = useState(false);
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Message ready!", {
        description: "Thanks — I'll get back to you soon.",
      });
      (e.target as HTMLFormElement).reset();
    }, 700);
  };

  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeader tag="Contact" title="Let's build something together" />
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <a
              href="mailto:muhammedmunawwar09@gmail.com"
              className="flex items-center gap-4 p-5 rounded-xl border border-border/60 bg-card/60 hover:border-primary/50 transition-all"
            >
              <div className="p-3 rounded-lg bg-primary/10 text-primary">
                <Mail />
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Email</p>
                <p className="font-medium">muhammedmunawwar09@gmail.com</p>
              </div>
            </a>
            <a
              href="tel:9703195129"
              className="flex items-center gap-4 p-5 rounded-xl border border-border/60 bg-card/60 hover:border-primary/50 transition-all"
            >
              <div className="p-3 rounded-lg bg-primary/10 text-primary">
                <Phone />
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Phone</p>
                <p className="font-medium">+91 97031 95129</p>
              </div>
            </a>
            <a
              href="https://github.com/munawwar06"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-4 p-5 rounded-xl border border-border/60 bg-card/60 hover:border-primary/50 transition-all"
            >
              <div className="p-3 rounded-lg bg-primary/10 text-primary">
                <Github />
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">GitHub</p>
                <p className="font-medium">munawwar06</p>
              </div>
            </a>
            <Button variant="hero" size="lg" className="w-full" asChild>
              <a href="mailto:muhammedmunawwar09@gmail.com?subject=Resume Request">
                <Download /> Download Resume
              </a>
            </Button>
          </div>
          <Card className="p-8 bg-card/60 border-border/60">
            <form onSubmit={onSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="text-sm mb-2 block">Name</label>
                <Input id="name" required placeholder="Your name" />
              </div>
              <div>
                <label htmlFor="email" className="text-sm mb-2 block">Email</label>
                <Input id="email" type="email" required placeholder="you@example.com" />
              </div>
              <div>
                <label htmlFor="message" className="text-sm mb-2 block">Message</label>
                <Textarea id="message" required placeholder="Tell me about your idea or opportunity..." rows={5} />
              </div>
              <Button type="submit" variant="hero" size="lg" className="w-full" disabled={loading}>
                {loading ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border/50 py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} Mohammed Munawar. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <a href="https://github.com/munawwar06" target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors">
            <Github size={18} />
          </a>
          <a href="mailto:muhammedmunawwar09@gmail.com" className="hover:text-foreground transition-colors">
            <Mail size={18} />
          </a>
          <a href="tel:9703195129" className="hover:text-foreground transition-colors">
            <Phone size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}

function Portfolio() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main>
        <Hero />
        <About />
        <Skills />
        <Services />
        <Projects />
        <Contact />
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}
