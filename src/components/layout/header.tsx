"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Sparkles, Sun, Moon } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

const Header = () => {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const navLinks = [
    { href: "/features", label: "Features" },
    { href: "/modules", label: "Modules" },
    { href: "/pricing", label: "Pricing" },
    { href: "/contact", label: "Contact" },
  ];

  // Theme setup
  useEffect(() => {
    const stored = localStorage.getItem("theme") as "light" | "dark" | null;
    if (stored) {
      setTheme(stored);
      document.documentElement.classList.toggle("dark", stored === "dark");
    } else {
      const prefersDark =
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;
      setTheme(prefersDark ? "dark" : "light");
      document.documentElement.classList.toggle("dark", prefersDark);
    }
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("theme", next);
    document.documentElement.classList.toggle("dark", next === "dark");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 flex-wrap">
          {/* Left: Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">
                AB
              </span>
            </div>
            <span className="text-lg sm:text-xl font-bold">BizAuto</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Sign In (desktop only) */}
            <Link href="/signin" className="hidden md:inline-flex">
              <Button variant="ghost">Sign In</Button>
            </Link>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              title={
                theme === "dark"
                  ? "Switch to light theme"
                  : "Switch to dark theme"
              }
              aria-pressed={theme === "dark"}
              className="hidden sm:inline-flex"
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </Button>

            {/* Get Started Button (desktop only) */}
            <Link href="/signUp" className="hidden sm:inline-flex">
              <Button className="bg-gradient-to-br from-[#7C3AED] to-[#EC4899] text-white rounded-md shadow-md hover:brightness-95 transition-opacity focus:ring-2 focus:ring-[#7C3AED]/40">
                <Sparkles className="w-4 h-4" />
                <span className="text-sm font-medium">Get Started Free</span>
              </Button>
            </Link>

            {/* Mobile Menu Button */}
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden"
                  aria-label="Open menu"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>

              <SheetContent
                side="right"
                className="w-[260px] sm:w-[320px] p-6 overflow-y-auto"
              >
                <nav className="flex flex-col gap-5 mt-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="text-base font-medium hover:text-primary transition-colors py-1"
                    >
                      {link.label}
                    </Link>
                  ))}

                  {/* Mobile Theme Toggle */}
                  <div className="mt-2">
                    <Button
                      variant="ghost"
                      onClick={() => {
                        toggleTheme();
                        setOpen(false);
                      }}
                      className="w-full justify-start"
                    >
                      {theme === "dark" ? (
                        <Sun className="w-4 h-4 mr-2" />
                      ) : (
                        <Moon className="w-4 h-4 mr-2" />
                      )}
                      {theme === "dark" ? "Light Mode" : "Dark Mode"}
                    </Button>
                  </div>

                  {/* Mobile Auth Buttons */}
                  <div className="flex flex-col gap-3 mt-4 pt-4 border-t">
                    <Link href="/signin" onClick={() => setOpen(false)}>
                      <Button variant="ghost" className="w-full justify-start">
                        Sign In
                      </Button>
                    </Link>

                    <Link href="/signUp" onClick={() => setOpen(false)}>
                      <Button className="w-full bg-gradient-to-br from-[#7C3AED] to-[#EC4899] text-white rounded-md shadow-md hover:brightness-95 transition-opacity">
                        <Sparkles className="w-4 h-4 mr-2" />
                        Get Started Free
                      </Button>
                    </Link>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
