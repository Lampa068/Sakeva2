"use client";

import Link from "next/link";
import { notFound, usePathname } from "next/navigation";
import { use, useEffect, useState } from "react";
import { SiteLayout } from "../../../_components/site-shell";
import { wikiSections, type WikiArticle } from "../../../_data/site-data";

type ArticleBlock = WikiArticle["blocks"][number];

function renderArticleBlock(block: ArticleBlock, index: number) {
  const content = block.content ?? [];

  switch (block.type) {
    case "text":
      return (
        <div key={index}>
          {content.map((paragraph, paragraphIndex) => (
            <p key={paragraphIndex}>{paragraph}</p>
          ))}
        </div>
      );

    case "list":
      return (
        <div key={index}>
          <h2>{block.title}</h2>
          <ul>
            {content.map((item, itemIndex) => (
              <li key={itemIndex}>{item}</li>
            ))}
          </ul>
        </div>
      );

    case "quote":
      return <blockquote key={index}>{content[0]}</blockquote>;

    case "warning":
      return (
        <div key={index} className="warning-box">
          <strong>{block.title}</strong>
          <p>{content[0]}</p>
        </div>
      );

    case "code":
      return (
        <pre key={index} className="code-box">
          <code>{content.join("\n")}</code>
        </pre>
      );

    case "table":
      return (
        <div key={index} className="table-wrap">
          <h2>{block.title}</h2>
          <table>
            <tbody>
              {block.rows?.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <td key={`${rowIndex}-${cellIndex}`}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
  }
}

export default function WikiArticlePage({
  params,
}: {
  params: Promise<{ section: string; article: string }>;
}) {
  const { section: sectionSlug, article: articleSlug } = use(params);
  const pathname = usePathname();
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) {
          setActiveId(visible.target.id);
        }
      },
      { rootMargin: "-10% 0px -70% 0px", threshold: 0.1 },
    );

    const sections = document.querySelectorAll("[data-toc-id]");
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [sectionSlug, articleSlug, pathname]);

  const sectionData = wikiSections.find((item) => item.slug === sectionSlug);

  if (!sectionData) {
    notFound();
  }

  const article = sectionData.articles.find((item) => item.slug === articleSlug);

  if (!article) {
    notFound();
  }

  return (
    <SiteLayout>
      <div className="page-width subpage-wrap wiki-article-layout">
        <aside className="toc-panel reveal">
          <div className="toc-header">Оглавление</div>

          <nav className="toc-nav">
            {article.sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className={activeId === section.id ? "toc-link active" : "toc-link"}
              >
                {section.title}
              </a>
            ))}
          </nav>
        </aside>

        <article className="article-shell reveal">
          <div className="article-topbar">
            <Link href={`/wiki/${sectionData.slug}`} className="back-link">
              ← {sectionData.title}
            </Link>
            <span className="news-tag">Вики</span>
          </div>

          <h1>{article.title}</h1>
          <p className="section-description">{article.summary}</p>

          <div className="article-copy">
            {article.blocks.map(renderArticleBlock)}
          </div>

          <div className="vote-box">
            <span>Статья помогла?</span>
            <div className="vote-actions">
              <button type="button" className="solid-button">Да</button>
              <button type="button" className="solid-button alt-button">Нет</button>
            </div>
          </div>
        </article>
      </div>
    </SiteLayout>
  );
}
