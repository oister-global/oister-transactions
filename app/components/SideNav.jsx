"use client";

import { useEffect, useState } from "react";

// Top of the content area, below the sticky headers — used as the click target.
const ACTIVE_OFFSET = 200;

export default function SideNav({ sections }) {
  const [active, setActive] = useState(sections[0]?.id ?? "");

  useEffect(() => {
    const updateActive = () => {
      // At the bottom of the page the last section may never reach the center
      // line, so pin it active once we've scrolled to (near) the bottom.
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      if (atBottom) {
        setActive(sections[sections.length - 1]?.id ?? "");
        return;
      }

      // Reading line at the vertical center of the content area (below the
      // sticky headers). The active section is the one crossing this line, so a
      // section takes over exactly when it becomes more than half of the view.
      const line = (window.innerHeight + ACTIVE_OFFSET) / 2;

      let current = sections[0]?.id ?? "";
      for (const { id } of sections) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= line) current = id;
      }
      setActive(current);
    };

    updateActive();
    window.addEventListener("scroll", updateActive, { passive: true });
    window.addEventListener("resize", updateActive);
    return () => {
      window.removeEventListener("scroll", updateActive);
      window.removeEventListener("resize", updateActive);
    };
  }, [sections]);

  const handleClick = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    setActive(id); // reflect the click immediately, before the scroll settles
    const top = el.getBoundingClientRect().top + window.scrollY - ACTIVE_OFFSET;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <nav className="hidden md:flex flex-col gap-0.5 sticky top-[172px] w-[176px] shrink-0 self-start">
      <p className="text-[10px] font-semibold uppercase tracking-widest text-[#8f949e] px-3 pb-2">
        Contents
      </p>
      {sections.map(({ id, label }) => (
        <a
          key={id}
          href={`#${id}`}
          onClick={(e) => handleClick(e, id)}
          className={`text-sm px-3 py-1.5 rounded-lg border transition-colors duration-150 ${
            active === id
              ? "border-[#c7d2fe] bg-[#eef0fb] text-[#516dc9] font-semibold shadow-sm"
              : "border-transparent text-[#696C7A] hover:bg-[#f5f5fa] hover:text-[#28283B]"
          }`}
        >
          {label}
        </a>
      ))}
    </nav>
  );
}
