"use client";

import Link from "next/link";
import { ArrowUpRight, SearchX } from "lucide-react";
import { useState } from "react";
import { SiteLayout } from "../_components/site-shell";
import { newsItems } from "../_data/site-data";

const categories = [
  "Все",
  ...Array.from(new Set(newsItems.map((item) => item.category))),
];

export default function NewsPage() {
  const [activeCategory, setActiveCategory] = useState("Все");

  const filteredNews = newsItems.filter(
    (item) => activeCategory === "Все" || item.category === activeCategory,
  );

  const feature = filteredNews[0];
  const rest = filteredNews.slice(1);

  return (
    <SiteLayout>
      <div className="page-width subpage-wrap">
        <section className="subpage-header reveal">
          <div>
            <p className="section-kicker">СООБЩЕСТВО</p>
            <h1>Новости</h1>
          </div>
        </section>

        {categories.length > 1 && (
          <div className="filter-bar reveal" aria-label="Фильтр новостей">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                className={category === activeCategory ? "filter-pill active" : "filter-pill"}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        )}

        {filteredNews.length === 0 ? (
          <div className="empty-state reveal">
            <SearchX size={36} />
            <h3>Новостей пока нет</h3>
          </div>
        ) : (
          <>
            {feature && (
              <Link href={`/news/${feature.slug}`} className="news-feature reveal">
                <div className="news-feature-body">
                  <div className="news-meta-row">
                    <span className="news-tag">{feature.category}</span>
                    <span className="news-date">{feature.date}</span>
                  </div>

                  <h2>{feature.title}</h2>
                  <p>{feature.description}</p>
                </div>
              </Link>
            )}

            <div className="news-grid">
              {rest.map((item) => (
                <Link href={`/news/${item.slug}`} key={item.slug} className="news-card reveal">
                  <div className="news-card-body">
                    <div className="news-meta-row">
                      <span className="news-tag">{item.category}</span>
                      <span className="news-date">{item.date}</span>
                    </div>

                    <h3>{item.title}</h3>
                    <p>{item.description}</p>

                    <div className="news-card-footer">
                      <ArrowUpRight size={16} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </SiteLayout>
  );
}
