"use client";

import { useEffect, useState } from "react";

export default function SideNav({ sections }) {
  const [active, setActive] = useState(sections[0]?.id ?? "");

  useEffect(() => {
    const observers = sections.map(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { rootMargin: "-15% 0px -75% 0px", threshold: 0 }
      );
      observer.observe(el);
      return observer;
    });
    return () => observers.forEach((obs) => obs?.disconnect());
  }, [sections]);

  const handleClick = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    const offset = 172;
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
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
          className={`text-sm px-3 py-1.5 rounded-lg transition-colors duration-150 ${
            active === id
              ? "bg-[#eef0fb] text-[#555573] font-semibold"
              : "text-[#696C7A] hover:bg-[#f5f5fa] hover:text-[#28283B]"
          }`}
        >
          {label}
        </a>
      ))}
    </nav>
  );
}
