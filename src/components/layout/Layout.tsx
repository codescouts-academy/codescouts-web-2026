"use client";

import Header from "./Header";
import Footer from "./Footer";
import { Toaster } from "@/components/ui/toaster";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="min-h-screen flex flex-col relative">
      <Header />
      <main className="flex-1 pt-16 md:pt-20 relative">
        <motion.div
          className="fixed w-48 h-48 bg-primary/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none z-[5]"
          style={{
            left: springX,
            top: springY,
          }}
        />
        {children}
      </main>
      <Toaster />
      <Footer />
    </div>
  );
};

export default Layout;
