import { Playfair_Display, JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ConvexClientProvider } from "@/components/ConvexClientProvider";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Asharib Hashmi | Full-Stack Developer",
  description:
    "Portfolio of Asharib Hashmi, a Lahore-based Full-Stack Web Developer specializing in high-performance web applications and modern UI/UX principles.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${playfair.variable} ${jetbrains.variable} ${plusJakarta.variable}`}>
      <body className="antialiased selection:bg-white selection:text-black">
        <div className="grain-overlay" />
        <ConvexClientProvider>{children}</ConvexClientProvider>
      </body>
    </html>
  );
}
