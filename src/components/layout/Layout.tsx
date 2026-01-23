"use client";

import Header from "./Header";
import Footer from "./Footer";
import { Toaster } from "@/components/ui/toaster";
import { Mouse } from "@/components/ui/mouse";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col relative">
      <Header />
      <main className="flex-1 pt-16 md:pt-20 relative">
        <Mouse />
        {children}
      </main>
      <Toaster />
      <Footer />
    </div>
  );
};

export default Layout;
