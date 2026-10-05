import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { notFound } from "next/navigation";
import { SiteLayout } from "../../_components/site-shell";
import { newsItems } from "../../_data/site-data";

export function generateStaticParams() {
  return newsItems.map((item) => ({ slug: item.slug }));
}

export default async function NewsArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = newsItems.find((item) => item.slug === slug);

  if (!article) {
    notFound();
  }

  const related = newsItems.filter((item) => item.slug !== article.slug).slice(0, 3);

  return (
    <SiteLayout>
      <div className="page-width subpage-wrap article-layout">
        <article className="article-shell reveal">
          <div className="article-topbar">
            <Link href="/news" className="back-link">
              <ArrowLeft size={16} />
              Все новости
            </Link>

            <div className="news-meta-row">
              <span className="news-tag">{article.category}</span>
              <span className="news-date">{article.date}</span>
            </div>
          </div>

          <h1>{article.title}</h1>

          <div className="article-copy">
            <h2>Что изменилось</h2>
            <p>
              Мы обновили структуру старта сезона, добавили новые навигационные подсказки,
              пересмотрели баланс и сделали локации более понятными для новичков. Это позволило
              сократить число вопросов в первые часы игры и сделать мир более комфортным для всех.
            </p>

            <h2>Что дальше</h2>
            <p>
              В ближайшее время мы продолжаем улучшать события, вводим поддержку для большего
              количества сценариев постройки и следим за тем, чтобы каждое обновление приносило
              пользу не только активным игрокам, но и людям, которые только знакомятся с проектом.
            </p>

            <ul>
              <li>Сводные правила старта сезона.</li>
              <li>Новые способы навигации по миру.</li>
              <li>Ускоренный прогресс в первые часы игры.</li>
            </ul>

            <blockquote>
              “Сервер должен быть понятным, стабильным и удобным для каждого, кто заходит на него с первых минут.”
            </blockquote>
          </div>

        </article>

        <aside className="related-block reveal">
          <h3>Другие новости</h3>

          <div className="related-list">
            {related.map((item) => (
              <Link key={item.slug} href={`/news/${item.slug}`} className="related-card">
                <div>
                  <span className="news-tag">{item.category}</span>
                  <h4>{item.title}</h4>
                </div>
                <ArrowUpRight size={16} />
              </Link>
            ))}
          </div>
        </aside>
      </div>
    </SiteLayout>
  );
}
