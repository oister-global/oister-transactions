"use client";

import { Fragment, useEffect, useState } from "react";

const MAX_ARTICLES = 5;

function formatDate(dateStr) {
  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function Tag({ label }) {
  return (
    <span className="rounded-full bg-[#eef1fb] px-2 py-0.5 text-xs font-medium text-[#555573]">
      {label}
    </span>
  );
}

function NewsItem({ article, companyName }) {
  const { title, url, source, publishedAt } = article;
  const meta = [source?.name, formatDate(publishedAt)].filter(Boolean);
  const titleEl = title || "Untitled";
  return (
    <li className="flex gap-3 py-4 border-b border-[#e8eaef] last:border-b-0">
      <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#555573] sm:mt-2" />
      <div className="flex flex-col gap-1.5">
        {url ? (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold leading-snug text-[#28283B] hover:text-[#555573] transition-colors sm:text-base"
          >
            {titleEl}
          </a>
        ) : (
          <span className="text-sm font-semibold leading-snug text-[#28283B] sm:text-base">
            {titleEl}
          </span>
        )}
        <div className="flex flex-wrap items-center gap-2 text-xs text-[#696C7A]">
          {meta.map((item, i) => (
            <Fragment key={i}>
              {i > 0 && <span>·</span>}
              <span className={i === 0 ? "font-medium text-[#28283B]" : ""}>{item}</span>
            </Fragment>
          ))}
          {meta.length > 0 && companyName && <span>·</span>}
          {companyName && <Tag label={companyName} />}
        </div>
      </div>
    </li>
  );
}

export default function CompanyNews({ companyName }) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(Boolean(companyName));
  const [error, setError] = useState(null);
  const [activeQuery, setActiveQuery] = useState(companyName);

  // Reset request state during render when companyName changes (the React-
  // sanctioned alternative to resetting via a setState call inside the effect).
  if (activeQuery !== companyName) {
    setActiveQuery(companyName);
    setArticles([]);
    setError(null);
    setLoading(Boolean(companyName));
  }

  useEffect(() => {
    if (!companyName) return;
    let cancelled = false;
    fetch(`/api/news?q=${encodeURIComponent(companyName)}`)
      .then((res) => res.json())
      .then((data) => {
        if (cancelled) return;
        if (Array.isArray(data?.articles)) {
          setArticles(
            data.articles
              .filter((a) => a?.title && a.title !== "[Removed]")
              .slice(0, MAX_ARTICLES)
          );
        } else {
          setError(data?.error || "Failed to load news");
        }
      })
      .catch(() => {
        if (!cancelled) setError("Failed to load news");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [companyName]);

  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
  const recentCount = articles.filter((a) => new Date(a.publishedAt) > oneYearAgo).length;

  return (
    <section className="section-card">
      <div className="flex flex-col gap-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-1">
            <h2 className="text-xl font-semibold text-[#28283B]">
              News related to {companyName}
            </h2>
            {!loading && !error && articles.length > 0 && (
              <p className="text-sm text-[#696C7A]">
                Media has covered {companyName} for a total of{" "}
                <span className="font-medium text-[#28283B]">{articles.length} events</span> in the
                last 1 year, {recentCount} of them have been about company updates.
              </p>
            )}
          </div>
        </div>

        {loading && (
          <div className="flex flex-col gap-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-12 animate-pulse rounded-lg bg-[#f0f0f5]" />
            ))}
          </div>
        )}

        {error && (
          <p className="text-sm text-[#696C7A]">
            {error === "NEWSAPI_KEY not configured"
              ? "News is unavailable — add NEWSAPI_KEY to .env.local to enable it."
              : "Could not load news at this time."}
          </p>
        )}

        {!loading && !error && articles.length === 0 && (
          <p className="text-sm text-[#696C7A]">No recent news found for {companyName}.</p>
        )}

        {!loading && !error && articles.length > 0 && (
          <ul className="flex flex-col">
            {articles.map((article, idx) => (
              <NewsItem key={article.url || idx} article={article} companyName={companyName} />
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
