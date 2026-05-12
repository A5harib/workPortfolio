"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Mail,
  MapPin,
  Phone,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("idle"); // idle, loading, success, error

  const sendContact = useMutation(api.contacts.send);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    try {
      await sendContact(formData);
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="h-full flex flex-col items-center justify-center border-technical p-12 bg-accent/5"
      >
        <CheckCircle2 size={48} className="text-accent mb-6" />
        <h3 className="text-editorial text-3xl mb-2 font-bold tracking-tighter">
          Transmission Sent
        </h3>
        <p className="font-mono text-sm opacity-60">
          I'll get back to you shortly.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-2">
          <label className="font-mono text-[10px] uppercase opacity-40">
            Full Name
          </label>
          <input
            required
            type="text"
            placeholder="ASHARIB HASHMI"
            className="w-full bg-transparent border-b-technical py-4 font-mono text-sm focus:outline-none focus:border-accent transition-colors uppercase placeholder:opacity-20"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <label className="font-mono text-[10px] uppercase opacity-40">
            Email Address
          </label>
          <input
            required
            type="email"
            placeholder="ASHARIB@DEV.IO"
            className="w-full bg-transparent border-b-technical py-4 font-mono text-sm focus:outline-none focus:border-accent transition-colors uppercase placeholder:opacity-20"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
        </div>
      </div>
      <div className="space-y-2">
        <label className="font-mono text-[10px] uppercase opacity-40">
          Message
        </label>
        <textarea
          required
          rows={4}
          placeholder="DESCRIBE YOUR VISION..."
          className="w-full bg-transparent border-b-technical py-4 font-mono text-sm focus:outline-none focus:border-accent transition-colors uppercase placeholder:opacity-20 resize-none"
          value={formData.message}
          onChange={(e) =>
            setFormData({ ...formData, message: e.target.value })
          }
        />
      </div>
      <button
        disabled={status === "loading"}
        className="w-full md:w-auto px-12 py-5 bg-accent text-background font-mono text-xs font-bold uppercase tracking-[0.2em] hover:bg-white transition-all disabled:opacity-50 flex items-center justify-center gap-3 hover-trigger"
      >
        {status === "loading" ? (
          <Loader2 className="animate-spin" size={16} />
        ) : (
          "Initiate Contact"
        )}
      </button>
      {status === "error" && (
        <p className="font-mono text-[10px] text-red-500 uppercase">
          Transmission Failed. Please retry.
        </p>
      )}
    </form>
  );
}

const GithubIcon = ({ size = 20 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.28 1.15-.28 2.35 0 3.5-.73 1.02-1.08 2.25-1 3.5 0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ size = 20 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const projects = [
  {
    id: "01",
    title: "Hillcrest Homes",
    location: "Dubai",
    tagline: "Digital Transformation for Real Estate",
    description:
      "Spearheaded a feature-rich property listing site with custom Admin Dashboard for real-time updates and analytics.",
    tech: ["Next.js", "React Native", "Tailwind CSS"],
    link: "https://www.hillcresthome-re.com/",
  },
  {
    id: "02",
    title: "Todin.app",
    location: "Global",
    tagline: "Cashback & Rewards Ecosystem",
    description:
      "Built a partner directory for e-commerce giants including Amazon and eBay with real-time wallet integration.",
    tech: ["React", "Node.js", "MongoDB"],
    link: "https://todin.app/",
  },
  {
    id: "03",
    title: "FH Group",
    location: "Media Portal",
    tagline: "High-Traffic Content Platform",
    description:
      "Optimized load speeds by 40% and built a custom 'One-Click' CMS for multi-media galleries.",
    tech: ["Image Optimization", "Next.js", "Custom CMS"],
    link: "https://github.com/FHGROUPOC/Dr-Tauqeer-Imran",
  },
  {
    id: "04",
    title: "Oceanblue",
    location: "Marketplace",
    tagline: "Location-Based Laundry Service",
    description:
      "Integrated Google Maps API for real-time vendor discovery and designed a comprehensive vendor dashboard.",
    tech: ["Google Maps API", "React", "Dashboard Design"],
    link: "https://github.com/Asad-10x/oceanblue",
  },
];

const skills = {
  "Languages & Frameworks": [
    "TypeScript",
    "JavaScript (ES6+)",
    "Python",
    "HTML5",
    "CSS3",
  ],
  "Frontend Architecture": [
    "ReactJS",
    "Next.js (App Router)",
    "React Native",
    "Tailwind CSS",
    "Framer Motion",
  ],
  "Backend & API": [
    "Node.js",
    "Server Actions",
    "REST APIs",
    "Clerk",
    "NextAuth",
  ],
  "Data Systems": ["MongoDB", "Supabase", "Convex", "PostgreSQL"],
};

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function Home() {
  return (
    <main className="min-h-screen p-6 md:p-12 lg:p-20 max-w-[1600px] mx-auto">
      {/* Header / Nav */}
      <nav className="flex justify-between items-start mb-32">
        <motion.div {...fadeInUp}>
          <h1 className="text-editorial text-4xl md:text-6xl font-bold tracking-tighter">
            Asharib <span className="text-accent">Hashmi</span>
          </h1>
        </motion.div>
        <motion.div {...fadeInUp} className="hidden md:flex items-center gap-12">
          <div className="flex gap-8 font-mono text-xs uppercase tracking-widest">
            <a href="#work" className="glitch-hover hover-trigger">
              Proof of Work
            </a>
            <a href="#stack" className="glitch-hover hover-trigger">
              Technical Core
            </a>
            <a href="#about" className="glitch-hover hover-trigger">
              Manifesto
            </a>
          </div>
          <a
            href="#contact"
            className="px-6 py-3 border-technical hover:bg-accent hover:text-background transition-all font-mono text-xs uppercase tracking-widest hover-trigger"
          >
            Get in Touch
          </a>
        </motion.div>
      </nav>

      {/* Hero Section */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-64">
        <div className="lg:col-span-8">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-editorial text-5xl md:text-8xl lg:text-9xl font-bold leading-[0.85] tracking-tighter mb-12"
          >
            Full <br />
            Stack <br />
            <span className="text-accent italic">Developer </span>
          </motion.h2>
        </div>
        <div className="lg:col-span-4 flex flex-col justify-end">
          <motion.div {...fadeInUp} className="border-l-technical pl-8 py-4">
            <p className="font-mono text-lg mb-6 opacity-80 leading-relaxed">
              Based in Lahore, Asharib crafts high-performance web applications
              with technical precision and a Stoic approach to problem-solving.
            </p>
            <div className="flex gap-4">
              <a
                href="mailto:asharibhashmi7@gmail.com"
                className="p-3 border-technical hover:bg-accent hover:text-background transition-colors hover-trigger"
              >
                <Mail size={20} />
              </a>
              <a
                href="https://github.com/a5harib"
                className="p-3 border-technical hover:bg-accent hover:text-background transition-colors hover-trigger"
              >
                <GithubIcon size={20} />
              </a>
              <a
                href="https://linkedin.com/in/asharib-hashmi"
                className="p-3 border-technical hover:bg-accent hover:text-background transition-colors hover-trigger"
              >
                <LinkedinIcon size={20} />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Proof of Work Section */}
      <section id="work" className="mb-64 relative">
        <div className="absolute -left-12 top-0 hidden xl:block">
          <span className="vertical-text text-editorial text-2xl opacity-20 tracking-widest">
            PROOF OF WORK
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border-accent border-technical">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-background p-8 md:p-12 hover:bg-muted/30 transition-colors group relative overflow-hidden"
            >
              <div className="flex justify-between items-start mb-12">
                <span className="font-mono text-accent text-sm tracking-widest font-bold">
                  [{project.id}]
                </span>
                <span className="font-mono text-[10px] uppercase opacity-40">
                  {project.location}
                </span>
              </div>

              <h3 className="text-editorial text-4xl md:text-5xl font-bold mb-4 group-hover:text-accent transition-colors">
                {project.title}
              </h3>
              <p className="font-mono text-xs uppercase tracking-widest mb-6 opacity-60 italic">
                {project.tagline}
              </p>
              <p className="font-mono text-sm opacity-80 mb-12 max-w-md leading-relaxed">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-12">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="text-[10px] font-mono border-technical px-2 py-1 opacity-60 group-hover:opacity-100 group-hover:border-accent transition-all"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <a
                href={project.link}
                className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest border-b border-transparent hover:border-accent hover:text-accent transition-all hover-trigger"
              >
                View <ArrowUpRight size={14} />
              </a>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Technical Core Section */}
      <section id="stack" className="mb-64">
        <div className="mb-20">
          <h2 className="text-editorial text-6xl md:text-8xl font-bold tracking-tighter">
            Technical <br /> <span className="text-accent">Core</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {Object.entries(skills).map(([category, items], i) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="border-t-technical pt-6"
            >
              <h4 className="font-mono text-xs uppercase tracking-[0.2em] mb-8 text-accent font-bold">
                {category}
              </h4>
              <ul className="space-y-4">
                {items.map((item) => (
                  <li
                    key={item}
                    className="font-mono text-sm opacity-70 hover:opacity-100 hover:translate-x-2 transition-all duration-300"
                  >
                    — {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Academic Foundation / About */}
      <section
        id="about"
        className="grid grid-cols-1 lg:grid-cols-12 gap-20 mb-64"
      >
        <div className="lg:col-span-5">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="border-technical p-12 bg-accent/5"
          >
            <h3 className="text-editorial text-4xl mb-8">
              Academic <br /> Foundation
            </h3>
            <p className="font-mono text-sm uppercase text-accent mb-2">
              BS Software Engineering
            </p>
            <p className="font-mono text-xs opacity-60 mb-8">
              University of Central Punjab, Lahore
            </p>

            <p className="font-mono text-sm opacity-80 leading-relaxed mb-8">
              Focusing on Advanced Software Architecture and Database Systems.
              Active member of the Cyber Security Society.
            </p>

            <div className="border-t-technical pt-6">
              <p className="font-mono text-[10px] uppercase opacity-40 mb-2">
                Key Project
              </p>
              <p className="font-mono text-sm italic">
                "Data-driven MERN applications with a focus on API security."
              </p>
            </div>
          </motion.div>
        </div>
        <div className="lg:col-span-7 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-editorial text-4xl mb-8 italic">
              The Manifesto
            </h3>
            <p className="font-serif text-2xl md:text-3xl lg:text-4xl leading-tight opacity-90">
              "Precision is not just a technical requirement; it's a philosophy.
              In an age of digital noise, I build for clarity, performance, and
              long-term resilience."
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="mb-64">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <h2 className="text-editorial text-6xl md:text-8xl font-bold tracking-tighter mb-8">
              Get <br /> <span className="text-accent italic">In Touch</span>
            </h2>
            <p className="font-mono text-sm opacity-60 leading-relaxed max-w-sm">
              I am currently open to new opportunities, collaborations, and
              architecture consultations. Drop a message to start the
              conversation.
            </p>
          </div>

          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t-technical pt-20 pb-10">
        <div className="flex flex-col md:flex-row justify-between items-end gap-12">
          <div>
            <p className="font-mono text-[10px] uppercase opacity-40 mb-4">
              Availability
            </p>
            <p className="font-mono text-xl text-accent">
              Open for Architecture & Development.
            </p>
          </div>

          <div className="text-right">
            <p className="font-mono text-[10px] uppercase opacity-40 mb-4">
              Contact Detail
            </p>
            <div className="flex flex-col items-end gap-2 font-mono text-sm">
              <span className="flex items-center gap-2">
                asharibhashmi7@gmail.com <Mail size={14} />
              </span>
              <span className="flex items-center gap-2">
                +92 332 4792043 <Phone size={14} />
              </span>
              <span className="flex items-center gap-2">
                Lahore, PK <MapPin size={14} />
              </span>
            </div>
          </div>
        </div>

        <div className="mt-20 flex justify-between items-center opacity-20 font-mono text-[10px] uppercase tracking-widest">
          <span>© 2026 ASHARIB HASHMI</span>
          <span>STAY PRECISE.</span>
        </div>
      </footer>
    </main>
  );
}
