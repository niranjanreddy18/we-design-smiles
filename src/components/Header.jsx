import { useState, useEffect } from "react";

/**
 * Default navigation sections for the dental clinic website.
 * Each section maps directly to an element ID in the DOM.
 */
const DEFAULT_SECTIONS = [
  { id: "home", label: "Home" },
  { id: "videos", label: "Videos" },
  { id: "gallery", label: "Gallery" },
  { id: "about", label: "About Us" },
  { id: "services", label: "Services" },
  { id: "appointment", label: "Book Appointment" },
];

/**
 * Sticky React navigation header for "WE DESIGN SMILES" dental clinic.
 *
 * Features:
 * - Brand logo smoothly scrolling to #home with teal accents (#06b6d4)
 * - Desktop horizontal navigation with active section indicator
 * - Mobile hamburger toggle menu with accessible ARIA attributes
 * - IntersectionObserver to track visible sections without scroll event lag
 * - Emphasized teal CTA button for "Book Appointment"
 * - Smooth scroll navigation without unwanted reloads
 * - Configurable via `sections` prop
 *
 * @param {Object} props
 * @param {Array<{id: string, label: string}>} [props.sections] - Navigation sections
 */
export default function Header({ sections = DEFAULT_SECTIONS }) {
  const [activeId, setActiveId] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);

  // Separate standard navigation links from the highlighted CTA
  const navLinks = sections.filter((s) => s.id !== "appointment");
  const ctaSection = sections.find((s) => s.id === "appointment") || {
    id: "appointment",
    label: "Book Appointment",
  };

  /**
   * Track visible sections using IntersectionObserver.
   * Avoids performance degradation associated with window scroll listeners.
   */
  useEffect(() => {
    const targets = sections
      .map((s) => document.getElementById(s.id))
      .filter(Boolean);

    if (targets.length === 0) return;

    const visibleEntries = new Map();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          visibleEntries.set(entry.target.id, entry);
        });

        // Determine the section with the highest visibility ratio
        let bestId = null;
        let highestRatio = 0;

        visibleEntries.forEach((entry, id) => {
          if (entry.isIntersecting && entry.intersectionRatio > highestRatio) {
            highestRatio = entry.intersectionRatio;
            bestId = id;
          }
        });

        if (bestId) {
          setActiveId(bestId);
        } else {
          // Fallback if low ratios during transitions: pick first intersecting
          const currentIntersecting = Array.from(visibleEntries.values()).find(
            (e) => e.isIntersecting
          );
          if (currentIntersecting) {
            setActiveId(currentIntersecting.target.id);
          }
        }
      },
      {
        root: null,
        rootMargin: "-20% 0px -40% 0px",
        threshold: [0, 0.2, 0.4, 0.6, 0.8, 1.0],
      }
    );

    targets.forEach((target) => observer.observe(target));

    return () => {
      observer.disconnect();
    };
  }, [sections]);

  /**
   * Reusable smooth-scroll handler that prevents unwanted page reloads
   * and synchronizes the active state and mobile drawer.
   */
  const scrollToSection = (e, id) => {
    if (e) {
      e.preventDefault();
    }
    const targetElement = document.getElementById(id);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
      setActiveId(id);
      if (window.history && window.history.pushState) {
        window.history.pushState(null, "", `#${id}`);
      }
    }
    setMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-xs transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">

        {/* ─── 1. Branding: WE DESIGN SMILES ─── */}
        <a
          href="#home"
          onClick={(e) => scrollToSection(e, "home")}
          aria-label="WE DESIGN SMILES - Return to Home"
          className="flex items-center gap-3 shrink-0 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#06b6d4] rounded-lg transition-transform"
        >
          {/* Clinic Brand Icon Badge */}
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-[#06b6d4] to-cyan-600 flex items-center justify-center shadow-md shadow-[#06b6d4]/20 group-hover:shadow-[#06b6d4]/40 transition-shadow">
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6 text-slate-950 fill-current"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              {/* Aesthetic smile tooth icon */}
              <path d="M12 2C8.69 2 6 4.69 6 8c0 2.21 1.25 4.13 2.15 6.47.88 2.29 1.35 4.53 3.85 4.53 2.5 0 2.97-2.24 3.85-4.53C16.75 12.13 18 10.21 18 8c0-3.31-2.69-6-6-6zm0 15c-1.4 0-1.85-1.95-2.65-4.03-.89-2.32-2.35-4.32-2.35-5.97 0-2.21 1.79-4 4-4s4 1.79 4 4c0 1.65-1.46 3.65-2.35 5.97-.8 2.08-1.25 4.03-2.65 4.03z" />
            </svg>
          </div>

          {/* Clinic Brand Text */}
          <div className="flex flex-col">
            <span className="text-sm sm:text-base lg:text-lg font-black tracking-tight text-slate-900 group-hover:text-[#06b6d4] transition-colors leading-tight">
              WE DESIGN SMILES
            </span>
            <span className="text-[10px] sm:text-xs font-semibold tracking-widest uppercase text-[#06b6d4] leading-none">
              Aesthetic Dental Studio
            </span>
          </div>
        </a>

        {/* ─── 2. Desktop Navigation Menu ─── */}
        <nav
          aria-label="Main Navigation"
          className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium"
        >
          {navLinks.map((link) => {
            const isActive = activeId === link.id;
            return (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => scrollToSection(e, link.id)}
                aria-current={isActive ? "page" : undefined}
                className={`relative py-1 transition-all duration-200 ${
                  isActive
                    ? "text-[#06b6d4] font-semibold"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {link.label}

                {/* Active Indicator Underline */}
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#06b6d4] shadow-[0_0_8px_#06b6d4] rounded-full animate-in fade-in duration-200"
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* ─── 3. Desktop CTA Button ─── */}
        <div className="hidden md:flex items-center">
          <a
            href={`#${ctaSection.id}`}
            onClick={(e) => scrollToSection(e, ctaSection.id)}
            className="px-5 py-2.5 rounded-full bg-[#06b6d4] hover:bg-[#0891b2] text-slate-950 font-bold text-xs sm:text-sm tracking-wide shadow-md hover:shadow-lg hover:shadow-[#06b6d4]/30 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all duration-200 cursor-pointer"
          >
            {ctaSection.label}
          </a>
        </div>

        {/* ─── 4. Mobile Controls: CTA + Hamburger Toggle ─── */}
        <div className="flex items-center gap-2.5 md:hidden">
          {/* Quick Mobile CTA */}
          <a
            href={`#${ctaSection.id}`}
            onClick={(e) => scrollToSection(e, ctaSection.id)}
            className="px-3.5 py-1.5 rounded-full bg-[#06b6d4] hover:bg-[#0891b2] text-slate-950 font-bold text-xs tracking-wide shadow-xs active:scale-95 transition-all"
          >
            Book
          </a>

          {/* Hamburger Menu Button */}
          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation-menu"
            className="p-2 rounded-xl text-slate-700 hover:text-slate-900 hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#06b6d4] transition-colors"
          >
            {menuOpen ? (
              // Close (X) Icon
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              // Hamburger Icon
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* ─── 5. Mobile Navigation Dropdown ─── */}
      {menuOpen && (
        <div
          id="mobile-navigation-menu"
          className="md:hidden bg-white/95 backdrop-blur-xl border-t border-slate-200 px-4 py-5 shadow-2xl transition-all"
        >
          <nav aria-label="Mobile Navigation" className="flex flex-col gap-1.5">
            {navLinks.map((link) => {
              const isActive = activeId === link.id;
              return (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => scrollToSection(e, link.id)}
                  aria-current={isActive ? "page" : undefined}
                  className={`flex items-center justify-between py-3 px-4 rounded-xl text-sm font-semibold transition-all ${
                    isActive
                      ? "text-[#06b6d4] bg-[#06b6d4]/10 border-l-4 border-[#06b6d4]"
                      : "text-slate-700 hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#06b6d4] shadow-[0_0_6px_#06b6d4]" />
                  )}
                </a>
              );
            })}

            {/* Mobile Prominent CTA */}
            <div className="pt-3 mt-2 border-t border-slate-200">
              <a
                href={`#${ctaSection.id}`}
                onClick={(e) => scrollToSection(e, ctaSection.id)}
                className="w-full flex items-center justify-center py-3.5 px-4 rounded-xl bg-[#06b6d4] hover:bg-[#0891b2] text-slate-950 font-bold text-sm tracking-wide shadow-md active:scale-98 transition-all"
              >
                {ctaSection.label}
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
