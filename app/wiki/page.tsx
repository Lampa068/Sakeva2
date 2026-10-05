"use client";

import Link from "next/link";
import { ArrowUpRight, Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import { SiteLayout } from "../_components/site-shell";
import { wikiSections } from "../_data/site-data";

export default function WikiHomePage() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSearchOpen(true);
      }

      if (event.key === "Escape") {
        setSearchOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const normalizedQuery = query.trim().toLowerCase();
  const results = normalizedQuery
    ? wikiSections
        .map((section) => ({
          section,
          matches: section.articles.filter(
            (article) =>
              article.title.toLowerCase().includes(normalizedQuery) ||
              article.summary.toLowerCase().includes(normalizedQuery),
          ),
        }))
        .filter((entry) => entry.matches.length > 0)
    : [];

  return (
    <SiteLayout>
      <div className="page-width subpage-wrap">
        <section className="subpage-header reveal">
          <div>
            <p className="section-kicker">СПРАВКА</p>
            <h1>Вики</h1>
          </div>
        </section>

        <div className="wiki-search reveal">
          <button type="button" className="search-button" onClick={() => setSearchOpen(true)}>
            <Search size={16} />
            <span>Поиск по вики</span>
            <kbd>Ctrl K</kbd>
          </button>
        </div>

        <div className="category-grid reveal">
          {wikiSections.map((section) => (
            <Link href={`/wiki/${section.slug}`} key={section.slug} className="category-card">
              <span className="category-icon">{section.icon}</span>
              <div>
                <h3>{section.title}</h3>
                <small>{section.articles.length} статей</small>
              </div>
              <ArrowUpRight size={16} />
            </Link>
          ))}
        </div>

        <section className="popular-block reveal">
          <h2>Популярные статьи</h2>

          <div className="popular-list">
            {wikiSections[0].articles.map((article) => (
              <Link href={`/wiki/${wikiSections[0].slug}/${article.slug}`} key={article.slug} className="popular-item">
                <span>{article.title}</span>
                <ArrowUpRight size={14} />
              </Link>
            ))}
          </div>
        </section>
      </div>

      {searchOpen && (
        <div className="search-overlay" role="dialog" aria-modal="true">
          <div className="search-panel">
            <div className="search-panel-header">
              <div className="search-input-wrap">
                <Search size={16} />
                <input
                  autoFocus
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Поиск статьи или раздела"
                  aria-label="Поиск по вики"
                />
              </div>

              <button type="button" className="icon-button" onClick={() => setSearchOpen(false)}>
                <X size={16} />
              </button>
            </div>

            <div className="search-results">
              {results.length === 0 ? (
                <p className="empty-search">Ничего не найдено</p>
              ) : (
                results.map(({ section, matches }) => (
                  <div key={section.slug} className="search-group">
                    <h4>{section.title}</h4>
                    <ul>
                      {matches.map((article) => (
                        <li key={article.slug}>
                          <Link href={`/wiki/${section.slug}/${article.slug}`} onClick={() => setSearchOpen(false)}>
                            {article.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </SiteLayout>
  );
}
