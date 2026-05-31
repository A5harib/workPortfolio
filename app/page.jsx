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
  const [status, setStatus] = useState("idle");

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
      <div className="h-full flex flex-col items-center justify-center border-4 border-[#16082B] p-12 bg-[#FBCF0D] shadow-[8px_8px_0px_#16082B]">
        <CheckCircle2
          size={64}
          strokeWidth={3}
          className="text-[#16082B] mb-6"
        />
        <h3 className="font-serif text-4xl mb-2 font-black tracking-tighter text-[#16082B] uppercase">
          Transmission Sent
        </h3>
        <p className="font-mono text-lg font-bold text-[#16082B]">
          AWAITING RESPONSE
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8 bg-[#FFF6DC] border-4 border-[#16082B] p-8 md:p-12 shadow-[12px_12px_0px_#16082B]"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col">
          <label className="font-mono text-sm font-black uppercase text-[#16082B] mb-2">
            Full Name
          </label>
          <input
            required
            type="text"
            placeholder="ASHARIB HASHMI"
            className="w-full bg-white border-4 border-[#16082B] p-4 font-mono text-sm font-bold text-[#16082B] shadow-[4px_4px_0px_#16082B] focus:outline-none focus:bg-[#FBCF0D] focus:shadow-[6px_6px_0px_#E22359] transition-all uppercase placeholder:opacity-40"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        <div className="flex flex-col">
          <label className="font-mono text-sm font-black uppercase text-[#16082B] mb-2">
            Email Address
          </label>
          <input
            required
            type="email"
            placeholder="ASHARIB@DEV.IO"
            className="w-full bg-white border-4 border-[#16082B] p-4 font-mono text-sm font-bold text-[#16082B] shadow-[4px_4px_0px_#16082B] focus:outline-none focus:bg-[#FBCF0D] focus:shadow-[6px_6px_0px_#E22359] transition-all uppercase placeholder:opacity-40"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
        </div>
      </div>
      <div className="flex flex-col">
        <label className="font-mono text-sm font-black uppercase text-[#16082B] mb-2">
          Message
        </label>
        <textarea
          required
          rows={5}
          placeholder="DESCRIBE YOUR VISION..."
          className="w-full bg-white border-4 border-[#16082B] p-4 font-mono text-sm font-bold text-[#16082B] shadow-[4px_4px_0px_#16082B] focus:outline-none focus:bg-[#FBCF0D] focus:shadow-[6px_6px_0px_#E22359] transition-all uppercase placeholder:opacity-40 resize-none"
          value={formData.message}
          onChange={(e) =>
            setFormData({ ...formData, message: e.target.value })
          }
        />
      </div>
      <button
        disabled={status === "loading"}
        className="w-full py-6 bg-[#E22359] text-white border-4 border-[#16082B] shadow-[8px_8px_0px_#16082B] font-mono text-xl font-black uppercase tracking-[0.1em] hover:bg-[#F37324] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[6px_6px_0px_#16082B] active:translate-x-[8px] active:translate-y-[8px] active:shadow-none transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "loading" ? (
          <Loader2
            className="animate-spin text-white"
            size={24}
            strokeWidth={3}
          />
        ) : (
          "Initiate Contact"
        )}
      </button>
      {status === "error" && (
        <div className="bg-[#16082B] text-[#FBCF0D] font-mono p-4 font-bold border-4 border-[#E22359] uppercase text-center">
          Transmission Failed. Please retry.
        </div>
      )}
    </form>
  );
}

const GithubIcon = ({ size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="square"
    strokeLinejoin="miter"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.28 1.15-.28 2.35 0 3.5-.73 1.02-1.08 2.25-1 3.5 0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ size = 24 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="square"
    strokeLinejoin="miter"
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
    color: "#FBCF0D",
    textColor: "#16082B",
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
    color: "#E22359",
    textColor: "#FFF6DC",
  },
  {
    id: "03",
    title: "FH Group",
    location: "Media Portal",
    tagline: "High-Traffic Content Platform",
    description:
      "Optimized load speeds by 40% and built a custom 'One-Click' CMS for multi-media galleries.",
    tech: ["Image Optimization", "Next.js", "Custom CMS"],
    link: "https://www.drtauqeerimran.com/",
    color: "#8E007E",
    textColor: "#FFF6DC",
  },
  {
    id: "04",
    title: "Oceanblue",
    location: "Marketplace",
    tagline: "Location-Based Laundry Service",
    description:
      "Integrated Google Maps API for real-time vendor discovery and designed a comprehensive vendor dashboard.",
    tech: ["Google Maps API", "React", "Dashboard Design"],
    link: "https://oceanblue-two.vercel.app",
    color: "#F37324",
    textColor: "#16082B",
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

export default function Home() {
  return (
    <main className="min-h-screen bg-[#FFF6DC] text-[#16082B] ">
      <header className="sticky top-0 z-50 bg-[#FFF6DC] border-b-4 border-[#16082B]">
        <div className="border-b-4 border-[#16082B] bg-[#FBCF0D] px-4 py-1 flex items-center justify-between font-mono font-black uppercase text-xs md:text-sm tracking-widest relative z-50">
          <span className="flex items-center gap-2">
            <span className="w-3 h-3 bg-[#E22359] border-2 border-[#16082B] inline-block"></span>
            System Online
          </span>
          <span className="hidden md:inline-block">Location: Lahore, PK</span>
        </div>

        <div className="px-6 md:px-12 lg:px-20 py-1 md:py-2 max-w-[1600px] mx-auto">
          <nav className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 md:gap-4">
            <div className="border-4 border-[#16082B] bg-white py-1.5 px-3 shadow-[4px_4px_0px_#16082B]">
              <h1 className="font-serif text-xl md:text-2xl font-black tracking-tighter uppercase">
                Asharib <span className="text-[#E22359]">Hashmi</span>
              </h1>
            </div>
            <div className="flex flex-wrap items-center gap-2 md:gap-3">
              <a
                href="#work"
                className="px-3 py-1.5 bg-[#FFF6DC] border-4 border-[#16082B] shadow-[3px_3px_0px_#16082B] font-mono text-xs md:text-sm font-black uppercase hover:bg-[#FBCF0D] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-all"
              >
                Work
              </a>
              <a
                href="#stack"
                className="px-3 py-1.5 bg-[#FFF6DC] border-4 border-[#16082B] shadow-[3px_3px_0px_#16082B] font-mono text-xs md:text-sm font-black uppercase hover:bg-[#F37324] hover:text-white active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-all"
              >
                Stack
              </a>
              <a
                href="#contact"
                className="px-4 md:px-6 py-1.5 bg-[#16082B] text-[#FBCF0D] border-4 border-[#16082B] shadow-[3px_3px_0px_#E22359] font-mono text-xs md:text-sm font-black uppercase active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-all"
              >
                Contact
              </a>
            </div>
          </nav>
        </div>
      </header>

      <div className="p-6 md:p-12 lg:p-20 max-w-[1600px] mx-auto">

        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-48">
          <div className="lg:col-span-8">
            <div className="inline-block border-4 border-[#16082B] bg-[#E22359] text-white p-4 md:p-8 shadow-[12px_12px_0px_#16082B] mb-8 transform -rotate-2">
              <h2 className="font-serif text-4xl md:text-8xl lg:text-[7rem] font-black leading-none tracking-tighter uppercase">
                Full Stack
              </h2>
            </div>
            <br />
            <div className="inline-block border-4 border-[#16082B] bg-[#FBCF0D] p-4 md:p-8 shadow-[12px_12px_0px_#16082B] transform rotate-1">
              <h2 className="font-serif text-5xl md:text-8xl lg:text-[8rem] font-black leading-none tracking-tighter uppercase text-[#16082B]">
                Developer
              </h2>
            </div>
          </div>
          <div className="lg:col-span-4 flex flex-col justify-end">
            <div className="border-4 border-[#16082B] bg-white p-8 shadow-[8px_8px_0px_#16082B]">
              <p className="font-mono text-lg font-bold mb-8 uppercase leading-snug">
                Based in Lahore, crafting high-performance web applications with
                technical precision.
              </p>
              <div className="flex gap-4">
                <a
                  href="mailto:asharibhashmi7@gmail.com"
                  className="p-4 bg-[#FFF6DC] border-4 border-[#16082B] text-[#16082B] shadow-[4px_4px_0px_#16082B] hover:bg-[#FBCF0D] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all"
                >
                  <Mail size={24} strokeWidth={3} />
                </a>
                <a
                  href="https://github.com/a5harib"
                  className="p-4 bg-[#FFF6DC] border-4 border-[#16082B] text-[#16082B] shadow-[4px_4px_0px_#16082B] hover:bg-[#F37324] hover:text-white active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all"
                >
                  <GithubIcon size={24} />
                </a>
                <a
                  href="https://linkedin.com/in/asharib-hashmi"
                  className="p-4 bg-[#FFF6DC] border-4 border-[#16082B] text-[#16082B] shadow-[4px_4px_0px_#16082B] hover:bg-[#8E007E] hover:text-white active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all"
                >
                  <LinkedinIcon size={24} />
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="work" className="mb-48">
          <div className="border-4 border-[#16082B] bg-[#FBCF0D] inline-block px-8 py-4 mb-16 shadow-[8px_8px_0px_#16082B]">
            <h2 className="font-serif text-5xl md:text-7xl font-black uppercase tracking-tighter">
              Proof of Work
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {projects.map((project) => (
              <div
                key={project.id}
                style={{
                  backgroundColor: project.color,
                  color: project.textColor,
                }}
                className="border-4 border-[#16082B] p-8 md:p-12 shadow-[12px_12px_0px_#16082B] hover:-translate-y-2 hover:translate-x-2 hover:shadow-[4px_20px_0px_#16082B] transition-all flex flex-col"
              >
                <div className="flex justify-between items-start mb-8 border-b-4 border-current pb-4">
                  <span className="font-mono text-2xl font-black">
                    [{project.id}]
                  </span>
                  <span className="font-mono text-sm font-bold uppercase px-3 py-1 border-2 border-current">
                    {project.location}
                  </span>
                </div>

                <h3 className="font-serif text-4xl md:text-4xl font-black uppercase mb-4 leading-none">
                  {project.title}
                </h3>
                <p className="font-mono text-sm font-bold uppercase mb-6 bg-[#16082B] text-white self-start px-3 py-1">
                  {project.tagline}
                </p>
                <p className="font-mono text-base font-bold mb-12 flex-grow">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-3 mb-12">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="text-xs font-mono font-bold border-2 border-current px-3 py-1 uppercase bg-white text-[#16082B]"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <a
                  href={project.link}
                  style={{
                    borderColor: project.textColor,
                    color: project.textColor,
                  }}
                  className="inline-flex items-center justify-between w-full font-mono text-lg font-black uppercase border-4 bg-white/20 p-4 hover:bg-[#16082B] hover:border-[#16082B] hover:!text-white active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all"
                >
                  View <ArrowUpRight size={24} strokeWidth={3} />
                </a>
              </div>
            ))}
          </div>
        </section>

        <section id="stack" className="mb-48">
          <div className="border-4 border-[#16082B] bg-[#E22359] text-white inline-block px-8 py-4 mb-16 shadow-[8px_8px_0px_#16082B]">
            <h2 className="font-serif text-5xl md:text-7xl font-black uppercase tracking-tighter">
              Technical Core
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {Object.entries(skills).map(([category, items], i) => (
              <div
                key={category}
                className="bg-white border-4 border-[#16082B] p-6 shadow-[8px_8px_0px_#16082B]"
              >
                <h4 className="font-mono text-sm font-black uppercase tracking-widest mb-6 border-b-4 border-[#16082B] pb-2 text-[#8E007E]">
                  {category}
                </h4>
                <div className="flex flex-wrap gap-3">
                  {items.map((item) => (
                    <span
                      key={item}
                      className="font-mono text-sm font-bold border-2 border-[#16082B] bg-[#FFF6DC] px-2 py-1 shadow-[2px_2px_0px_#16082B]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section
          id="about"
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-48"
        >
          <div className="lg:col-span-5">
            <div className="bg-[#8E007E] text-[#FFF6DC] border-4 border-[#16082B] p-8 md:p-12 shadow-[12px_12px_0px_#16082B] h-full flex flex-col justify-center">
              <h3 className="font-serif text-5xl font-black uppercase mb-8">
                Foundation
              </h3>
              <div className="bg-white border-4 border-[#16082B] p-4 text-[#16082B] mb-8 shadow-[4px_4px_0px_#FBCF0D] transform -rotate-1">
                <p className="font-mono text-xl font-black uppercase">
                  BS Software Engineering
                </p>
                <p className="font-mono text-sm font-bold uppercase mt-2">
                  University of Central Punjab
                </p>
              </div>
              <p className="font-mono text-base font-bold leading-relaxed mb-8">
                Advanced Software Architecture, Database Systems, Cyber
                Security.
              </p>
              <div className="border-t-4 border-[#FFF6DC] pt-6 mt-auto">
                <p className="font-mono text-xs font-black uppercase mb-2">
                  Focus
                </p>
                <p className="font-mono text-sm font-bold bg-[#16082B] text-[#F37324] inline-block px-3 py-1">
                  API Security & MERN Data-Flows
                </p>
              </div>
            </div>
          </div>
          <div className="lg:col-span-7">
            <div className="bg-white border-4 border-[#16082B] p-8 md:p-16 shadow-[12px_12px_0px_#16082B] h-full flex flex-col justify-center">
              <span className="font-mono text-2xl font-black text-[#E22359] mb-6 block">
                // MANIFESTO
              </span>
              <p className="font-serif text-3xl md:text-5xl font-black uppercase leading-tight text-[#16082B]">
                Precision is not just a requirement; it's a philosophy. In an
                age of digital noise, build for clarity, performance, and{" "}
                <span className="bg-[#FBCF0D] px-2 border-2 border-[#16082B]">
                  long-term resilience.
                </span>
              </p>
            </div>
          </div>
        </section>

        <section id="contact" className="mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5">
              <div className="border-4 border-[#16082B] bg-[#F37324] inline-block px-8 py-4 mb-8 shadow-[8px_8px_0px_#16082B] transform rotate-2">
                <h2 className="font-serif text-6xl md:text-8xl font-black uppercase tracking-tighter text-[#16082B]">
                  Connect
                </h2>
              </div>
              <div className="bg-white border-4 border-[#16082B] p-8 shadow-[8px_8px_0px_#16082B]">
                <p className="font-mono text-lg font-bold uppercase leading-relaxed text-[#16082B]">
                  Open to new opportunities, collaborations, and architecture
                  consultations. State your requirements.
                </p>
              </div>
            </div>

            <div className="lg:col-span-7">
              <ContactForm />
            </div>
          </div>
        </section>

        <footer className="border-t-8 border-[#16082B] pt-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
          <div className="bg-[#16082B] p-6 border-4 border-[#16082B] shadow-[6px_6px_0px_#FBCF0D]">
            <p className="font-mono text-sm font-black uppercase text-white mb-2">
              Status
            </p>
            <p className="font-mono text-xl font-black uppercase text-[#FBCF0D]">
              Open for Architecture
            </p>
          </div>

          <div className="bg-white p-6 border-4 border-[#16082B] shadow-[6px_6px_0px_#E22359] text-right">
            <p className="font-mono text-sm font-black uppercase text-[#16082B] mb-4">
              Terminal Endpoints
            </p>
            <div className="flex flex-col items-end gap-3 font-mono text-sm font-bold uppercase">
              <span className="flex items-center gap-3 border-b-2 border-[#16082B] pb-1">
                asharibhashmi7@gmail.com <Mail size={16} strokeWidth={3} />
              </span>
              <span className="flex items-center gap-3 border-b-2 border-[#16082B] pb-1">
                +92 332 4792043 <Phone size={16} strokeWidth={3} />
              </span>
              <span className="flex items-center gap-3 border-b-2 border-[#16082B] pb-1">
                Lahore, PK <MapPin size={16} strokeWidth={3} />
              </span>
            </div>
          </div>
        </footer>

        <div className="mt-12 border-4 border-[#16082B] bg-[#FBCF0D] p-4 flex justify-between items-center font-mono text-sm font-black uppercase tracking-widest text-[#16082B]">
          <span>© 2026 ASHARIB HASHMI</span>
          <span>STAY PRECISE.</span>
        </div>
      </div>
    </main>
  );
}
