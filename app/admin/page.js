"use client";

import { useState, useEffect } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { motion } from "framer-motion";
import { Lock, Mail, User, Clock, MessageSquare, ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [mounted, setMounted] = useState(false);
  const contacts = useQuery(api.contacts.list);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === "asharib5") {
      setIsAuthenticated(true);
    } else {
      alert("Incorrect Transmission Key.");
    }
  };

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen flex items-center justify-center p-6 bg-background">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md border-technical p-12 bg-accent/5"
        >
          <div className="flex justify-center mb-8 text-accent">
            <Lock size={48} />
          </div>
          <h1 className="text-editorial text-3xl font-bold text-center mb-8 tracking-tighter">
            ADMIN <span className="text-accent italic">ACCESS</span>
          </h1>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="font-mono text-[10px] uppercase opacity-40">Security Key</label>
              <input 
                type="password"
                className="w-full bg-transparent border-b-technical py-4 font-mono text-sm focus:outline-none focus:border-accent transition-colors uppercase"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoFocus
              />
            </div>
            <button className="w-full py-4 bg-accent text-background font-mono text-xs font-bold uppercase tracking-widest hover:bg-white transition-all">
              Unlock Terminal
            </button>
          </form>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="min-h-screen p-6 md:p-12 lg:p-20 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-20">
        <Link href="/" className="inline-flex items-center gap-2 font-mono text-xs uppercase opacity-40 hover:opacity-100 transition-opacity">
          <ChevronLeft size={14} /> Back to Terminal
        </Link>
        <h1 className="text-editorial text-4xl md:text-6xl font-bold tracking-tighter">
          INCOMING <span className="text-accent italic">MESSAGES</span>
        </h1>
      </div>

      <div className="space-y-8">
        {!contacts ? (
          <div className="font-mono text-sm opacity-40 animate-pulse">Syncing with database...</div>
        ) : contacts.length === 0 ? (
          <div className="font-mono text-sm opacity-40 border-technical p-12 text-center italic">
            No transmissions received yet.
          </div>
        ) : (
          contacts.map((contact, i) => (
            <motion.div 
              key={contact._id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="border-technical p-8 md:p-12 group hover:bg-accent/5 transition-colors"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                <div className="space-y-1">
                  <p className="font-mono text-[10px] uppercase opacity-40 flex items-center gap-2">
                    <User size={10} /> Sender
                  </p>
                  <p className="font-mono text-sm uppercase font-bold">{contact.name}</p>
                </div>
                <div className="space-y-1">
                  <p className="font-mono text-[10px] uppercase opacity-40 flex items-center gap-2">
                    <Mail size={10} /> Endpoint
                  </p>
                  <p className="font-mono text-sm uppercase text-accent">{contact.email}</p>
                </div>
                <div className="space-y-1">
                  <p className="font-mono text-[10px] uppercase opacity-40 flex items-center gap-2">
                    <Clock size={10} /> Received
                  </p>
                  <p className="font-mono text-sm uppercase">
                    {mounted && contact.createdAt ? new Date(contact.createdAt).toLocaleString() : "---"}
                  </p>
                </div>
              </div>
              <div className="space-y-2 pt-8 border-t-technical border-white/5">
                <p className="font-mono text-[10px] uppercase opacity-40 flex items-center gap-2">
                  <MessageSquare size={10} /> Payload
                </p>
                <p className="font-mono text-sm opacity-80 leading-relaxed uppercase whitespace-pre-wrap">
                  {contact.message}
                </p>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </main>
  );
}
