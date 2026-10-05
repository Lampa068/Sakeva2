"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowUpRight,
  ChevronDown,
  Clapperboard,
  Copy,
  Menu,
  MessageCircle,
  Sparkles,
  X,
} from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";

const SERVER_IP = "mc.sakeva.net";

export function useRevealOnScroll() {
  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>(".reveal");

    if (!targets.length) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12 },
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);
}

export function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    window.history.scrollRestoration = "manual";

    if (!window.location.hash) {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
}

function CopyAddress({ compact = false }: { compact?: boolean }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(SERVER_IP);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:?body=${encodeURIComponent(SERVER_IP)}`;
    }
  }

  return (
    <div className={`server-address${compact ? " server-address-compact" : ""}`}>
      <span className="address-label">IP СЕРВЕРА</span>
      <code>{SERVER_IP}</code>
      <button
        type="button"
        className="copy-button"
        aria-label={copied ? "Адрес скопирован" : "Скопировать адрес сервера"}
        onClick={handleCopy}
      >
        {copied ? <Sparkles size={15} /> : <Copy size={16} />}
      </button>
    </div>
  );
}

function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);
  const isCurrentPath = (href: string) =>
    href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(`${href}/`);
  const navClassName = (href: string) =>
    isCurrentPath(href) ? "nav-link nav-current" : "nav-link";
  const closeMoreMenu = () => {
    setMoreOpen(false);
    closeMenu();
  };

  return (
    <header className="site-header">
      <div className="header-inner page-width">
        <Link className="wordmark" href="/" aria-label="Sakeva — главная" onClick={closeMenu}>
          SAKEVA
        </Link>

        <button
          type="button"
          className="mobile-menu-toggle"
          aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>

        <nav
          className={`main-nav${menuOpen ? " main-nav-open" : ""}`}
          aria-label="Основная навигация"
        >
          <Link className={navClassName("/")} href="/" onClick={closeMenu}>
            Главная
          </Link>

          <a
            className="nav-link"
            href="https://shop.sakeva.net"
            target="_blank"
            rel="noreferrer"
            onClick={closeMenu}
          >
            Магазин
          </a>

          <Link className={navClassName("/news")} href="/news" onClick={closeMenu}>
            Новости
          </Link>

          <Link className={navClassName("/rules")} href="/rules" onClick={closeMenu}>
            Правила
          </Link>

          <Link className={navClassName("/wiki")} href="/wiki" onClick={closeMenu}>
            Вики
          </Link>

          <div className="nav-more-wrap">
            <button
              className={`nav-link nav-more${isCurrentPath("/team") ? " nav-current" : ""}`}
              type="button"
              aria-expanded={moreOpen}
              aria-current={isCurrentPath("/team") ? "page" : undefined}
              onClick={() => setMoreOpen((prev) => !prev)}
            >
              Прочее <ChevronDown size={14} />
            </button>

            {moreOpen && (
              <div className="nav-dropdown">
                <Link href="/wiki" onClick={closeMoreMenu}>
                  Градиент
                </Link>
                <Link
                  href="/team"
                  aria-current={isCurrentPath("/team") ? "page" : undefined}
                  onClick={closeMoreMenu}
                >
                  Команда проекта
                </Link>
              </div>
            )}
          </div>
        </nav>

        <a className="header-play" href="#connect">
          Играть <ArrowUpRight size={15} />
        </a>
      </div>

      {menuOpen && (
        <button
          type="button"
          className="mobile-menu-backdrop"
          aria-label="Закрыть меню"
          onClick={closeMenu}
        />
      )}
    </header>
  );
}

function SiteFooter() {
  return (
    <footer className="site-footer" id="connect">
      <div className="page-width footer-main">
        <div className="footer-about">
          <Link className="wordmark footer-wordmark" href="/">
            SAKEVA
          </Link>

          <p>Место, где Minecraft снова становится приключением.</p>
          <CopyAddress compact />
        </div>

        <div className="footer-socials">
          <span className="footer-eyebrow">Остаёмся на связи</span>

          <a href="https://t.me/sakevanetwork" target="_blank" rel="noreferrer" aria-label="Telegram">
            <MessageCircle />
          </a>

          <a href="https://www.youtube.com/@SakevaMC" target="_blank" rel="noreferrer" aria-label="YouTube">
            <Clapperboard />
          </a>

          <a href="https://www.tiktok.com/@sakevamc" target="_blank" rel="noreferrer" aria-label="TikTok">
            🎵
          </a>
        </div>

        <div className="footer-legal">
          <a href="#privacy">Политика обработки персональных данных</a>
          <a href="#terms">Пользовательское соглашение</a>
          <a href="#offer">Публичная оферта</a>
        </div>
      </div>

      <div className="page-width footer-bottom">
        <span>© {new Date().getFullYear()} Lampa752</span>
        <span>Made by Lampa752</span>
      </div>
    </footer>
  );
}

export function SiteLayout({ children }: { children: ReactNode }) {
  useRevealOnScroll();

  return (
    <>
      <ScrollToTop />
      <SiteHeader />
      <main className="subpage-main">{children}</main>
      <SiteFooter />
    </>
  );
}
