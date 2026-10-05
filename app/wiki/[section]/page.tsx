import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteLayout } from "../../_components/site-shell";
import { wikiSections } from "../../_data/site-data";

export function generateStaticParams() {
  return wikiSections.map((section) => ({ section: section.slug }));
}

export default async function WikiSectionPage({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;
  const sectionData = wikiSections.find((item) => item.slug === section);

  if (!sectionData) {
    notFound();
  }

  return (
    <SiteLayout>
      <div className="page-width subpage-wrap article-layout">
        <article className="article-shell reveal">
          <div className="article-topbar" style={{ marginBottom: 18 }}>
            <Link href="/wiki" className="back-link">
              ← Вики
            </Link>
            <span className="news-tag">{sectionData.title}</span>
          </div>

          <h1>{sectionData.title}</h1>
          <p className="section-description">{sectionData.description}</p>

          <div className="wiki-list">
            {sectionData.articles.map((article) => (
              <Link href={`/wiki/${sectionData.slug}/${article.slug}`} key={article.slug} className="wiki-article-card">
                <div>
                  <span className="news-tag">Статья</span>
                  <h3>{article.title}</h3>
                  <p>{article.summary}</p>
                </div>
                <span className="card-arrow">→</span>
              </Link>
            ))}
          </div>
        </article>
      </div>
    </SiteLayout>
  );
}
