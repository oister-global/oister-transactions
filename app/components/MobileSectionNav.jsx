"use client";

import { useEffect, useRef, useState } from "react";

const STICKY_OFFSET = 200; // main header + company header + this nav

export default function MobileSectionNav({ sections }) {
  const [active, setActive] = useState(sections[0]?.id ?? "");
  const navRef = useRef(null);
  const pillRefs = useRef({});

  useEffect(() => {
    const handleScroll = () => {
      const viewportTop = STICKY_OFFSET;
      const viewportBottom = window.innerHeight;
      let bestId = sections[0]?.id ?? "";
      let bestVisible = 0;

      for (const { id } of sections) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        const visibleTop = Math.max(rect.top, viewportTop);
        const visibleBottom = Math.min(rect.bottom, viewportBottom);
        const visible = Math.max(0, visibleBottom - visibleTop);
        if (visible > bestVisible) {
          bestVisible = visible;
          bestId = id;
        }
      }
      setActive(bestId);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  // Scroll active pill into view inside the horizontal nav
  useEffect(() => {
    const pill = pillRefs.current[active];
    const nav = navRef.current;
    if (!pill || !nav) return;
    const navRect = nav.getBoundingClientRect();
    const pillRect = pill.getBoundingClientRect();
    const scrollLeft =
      nav.scrollLeft + (pillRect.left - navRect.left) - navRect.width / 2 + pillRect.width / 2;
    nav.scrollTo({ left: scrollLeft, behavior: "smooth" });
  }, [active]);

  const handleClick = (e, id) => {
    e.preventDefault();
    setActive(id);
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - STICKY_OFFSET;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <div
      ref={navRef}
      className="mobile-nav-scroll md:hidden overflow-x-auto flex gap-2 mt-5 pt-3 pb-2 -mx-3 px-3 border-b-2 border-[#e8eaef] bg-white sticky top-[140px] z-10"
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      {sections.map(({ id, label }) => (
        <a
          key={id}
          ref={(el) => { pillRefs.current[id] = el; }}
          href={`#${id}`}
          onClick={(e) => handleClick(e, id)}
          className={`shrink-0 rounded-sm px-3 py-1 text-xs font-medium transition-colors ${
            active === id
              ? "border-2 border-[#28283B] bg-[#28283B] text-white font-semibold shadow-sm"
              : "border border-[#d0d4de] bg-white text-[#696C7A]"
          }`}
        >
          {label}
        </a>
      ))}
    </div>
  );
}
