"use client";

import { SignInButton, UserButton, SignedOut, SignedIn } from "@clerk/nextjs";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Bot } from "lucide-react";

function Header() {
  const path = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);

    // Prevent body scrolling when menu is open
    if (!isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    document.body.style.overflow = "unset";
  };

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/dashboard", label: "Dashboard" },
    { href: "/how-it-works", label: "How it works" },
    { href: "/about-us", label: "About us" },
  ];

  return (
    <>
      {/* HEADER */}
      <header
        className="
          fixed
          top-0
          left-0
          right-0
          w-full
          z-50
          flex
          justify-between
          items-center
          px-6
          md:px-10
          lg:px-16
          py-4
          bg-[#0B1120]/80
          backdrop-blur-xl
          border-b
          border-white/10
          shadow-[0_8px_30px_rgb(0,0,0,0.12)]
          transition-all
          duration-300
        "
      >
        {/* LOGO */}
        <Link
          href="/"
          className="flex items-center gap-3"
          aria-label="Mock AI Home"
          onClick={closeMobileMenu}
        >
          <div
            className="
              w-11
              h-11
              rounded-2xl
              bg-gradient-to-r
              from-cyan-500
              to-purple-500
              flex
              items-center
              justify-center
              shadow-lg
              shadow-cyan-500/20
            "
          >
            <Bot className="text-white" size={22} />
          </div>

          <span
            className="
              text-2xl
              font-black
              bg-gradient-to-r
              from-cyan-400
              via-blue-500
              to-purple-500
              bg-clip-text
              text-transparent
            "
          >
            Mock AI
          </span>
        </Link>

        {/* DESKTOP NAVIGATION */}
        <nav
          className="hidden md:flex items-center gap-3 lg:gap-5"
          aria-label="Main Navigation"
        >
          {navItems.map((item) => (
            <NavItem
              key={item.href}
              path={path}
              href={item.href}
              label={item.label}
              onClick={closeMobileMenu}
            />
          ))}
        </nav>

        {/* MOBILE MENU BUTTON */}
        <div className="md:hidden">
          <button
            onClick={toggleMobileMenu}
            className="
              text-gray-300
              hover:text-cyan-400
              transition-all
              duration-300
            "
            aria-label={isMobileMenuOpen ? "Close Menu" : "Open Menu"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* DESKTOP AUTH */}
        <div className="hidden md:block">
          <SignedOut>
            <SignInButton mode="modal">
              <button
                className="
                  relative
                  inline-flex
                  items-center
                  justify-center
                  overflow-hidden
                  rounded-2xl
                  px-5
                  py-2.5
                  font-semibold
                  text-white
                  transition-all
                  duration-300
                  hover:scale-105
                  active:scale-95
                "
              >
                <span
                  className="
                    absolute
                    inset-0
                    bg-gradient-to-r
                    from-cyan-500
                    via-blue-500
                    to-purple-500
                  "
                ></span>

                <span className="relative z-10">Sign In</span>
              </button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  userButtonAvatarBox:
                    "w-11 h-11 border border-white/10 shadow-lg",
                },
              }}
            />
          </SignedIn>
        </div>
      </header>

      {/* MOBILE MENU */}
      {isMobileMenuOpen && (
        <div
          className="
            fixed
            inset-0
            top-0
            bg-[#0B1120]/95
            backdrop-blur-2xl
            z-40
            md:hidden
            overflow-hidden
            pt-24
          "
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Menu"
        >
          {/* Background Glow */}
          <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-cyan-500/20 rounded-full blur-3xl"></div>

          <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-purple-500/20 rounded-full blur-3xl"></div>

          <div className="relative z-10 h-full overflow-y-auto pb-16">
            <nav className="space-y-5 p-6">

              {navItems.map((item) => (
                <NavItem
                  key={item.href}
                  path={path}
                  href={item.href}
                  label={item.label}
                  mobile
                  onClick={closeMobileMenu}
                />
              ))}

              {/* MOBILE AUTH */}
              <div className="pt-8 border-t border-white/10">

                <SignedOut>
                  <SignInButton mode="modal">
                    <button
                      className="
                        w-full
                        relative
                        inline-flex
                        items-center
                        justify-center
                        overflow-hidden
                        rounded-2xl
                        px-5
                        py-3
                        font-semibold
                        text-white
                        transition-all
                        duration-300
                      "
                      onClick={closeMobileMenu}
                    >
                      <span
                        className="
                          absolute
                          inset-0
                          bg-gradient-to-r
                          from-cyan-500
                          via-blue-500
                          to-purple-500
                        "
                      ></span>

                      <span className="relative z-10">
                        Sign In
                      </span>
                    </button>
                  </SignInButton>
                </SignedOut>

                <SignedIn>
                  <div className="flex justify-center">
                    <UserButton
                      afterSignOutUrl="/"
                      appearance={{
                        elements: {
                          userButtonAvatarBox:
                            "w-14 h-14 mx-auto border border-white/10",
                        },
                      }}
                    />
                  </div>
                </SignedIn>

              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}

function NavItem({ path, href, label, mobile, onClick }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`
        block
        transition-all
        duration-300
        cursor-pointer
        rounded-2xl
        ${
          mobile
            ? "w-full text-lg py-4 text-center"
            : "px-5 py-2.5"
        }

        ${
          path === href
            ? "bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-300 border border-cyan-500/20"
            : "text-gray-300 hover:bg-white/10 hover:text-cyan-300"
        }
      `}
    >
      {label}
    </Link>
  );
}

export default Header;