'use client';

import Link from "next/link";
import { ScrollToTop, useRevealOnScroll } from "./_components/site-shell";
import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Clapperboard,
  Copy,
  Leaf,
  MapPinned,
  Menu,
  MessageCircle,
  Pickaxe,
  ShieldCheck,
  Shirt,
  Sparkles,
  UsersRound,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";

const SERVER_IP = "mc.sakeva.net";

const features = [
  {
    icon: Leaf,
    number: "01",
    title: "Ванильность",
    text: "Выживание, каким оно должно быть: честное, неспешное и по-настоящему ваше.",
  },
  {
    icon: ShieldCheck,
    number: "02",
    title: "Честная игра",
    text: "Анти-чит и внимательная модерация защищают комфорт каждого игрока.",
  },
  {
    icon: Activity,
    number: "03",
    title: "Стабильность",
    text: "Надёжный сервер, чтобы строить планы, а не ждать перезагрузки.",
  },
  {
    icon: UsersRound,
    number: "04",
    title: "Своё сообщество",
    text: "Здесь знакомятся, объединяются и возвращаются не только ради игры.",
  },
  {
    icon: Shirt,
    number: "05",
    title: "Система скинов",
    text: "Оставайтесь собой и в кубическом мире.",
  },
];

const questions = [
  {
    question: "Сколько длится сезон?",
    answer:
      "Сезон длится несколько месяцев. О дате нового старта заранее сообщаем в новостях и нашем сообществе.",
  },
  {
    question: "Бесплатный ли доступ?",
    answer:
      "Да, играть можно бесплатно. Для подключения достаточно Minecraft Java Edition и адреса нашего сервера.",
  },
  {
    question: "Какие размеры миров?",
    answer:
      "Мир достаточно большой для путешествий и новых открытий. Актуальные границы и карту можно найти в вики.",
  },
];

function CopyAddress({ compact = false }: { compact?: boolean }) {
  const [copied, setCopied] = useState(false);

  async function copyAddress() {
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
        className="copy-button"
        type="button"
        aria-label={copied ? "Адрес скопирован" : "Скопировать адрес сервера"}
        onClick={copyAddress}
      >
        {copied ? <Check size={17} /> : <Copy size={17} />}
      </button>
    </div>
  );
}

function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);
    return () => document.body.classList.remove("menu-open");
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="site-header">
      <div className="header-inner page-width">
        <Link
          className="wordmark"
          href="/"
          aria-label="Sakeva — главная"
          onClick={closeMenu}
        >
          SAKEVA
        </Link>

        <button
          type="button"
          className="mobile-menu-toggle"
          aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>

        <nav
          className={`main-nav${menuOpen ? " main-nav-open" : ""}`}
          aria-label="Основная навигация"
        >
          <Link className="nav-link nav-current" href="/" onClick={closeMenu}>
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

          <Link className="nav-link" href="/news" onClick={closeMenu}>
            Новости
          </Link>

          <Link className="nav-link" href="/rules" onClick={closeMenu}>
            Правила
          </Link>

          <Link className="nav-link" href="/wiki" onClick={closeMenu}>
            Вики
          </Link>

          <div className="nav-more-wrap">
            <button
              className="nav-link nav-more"
              type="button"
              aria-expanded={moreOpen}
              onClick={() => setMoreOpen(!moreOpen)}
            >
              Прочее <ChevronDown size={14} />
            </button>

            {moreOpen && (
              <div className="nav-dropdown">
                <a
                  href="#features"
                  onClick={() => {
                    setMoreOpen(false);
                    closeMenu();
                  }}
                >
                  Градиент
                </a>

                <Link href="/team" onClick={closeMenu}>
                  Команда проекта
                </Link>
              </div>
            )}
          </div>
        </nav>

        <a className="header-play" href="#connect">
          Играть <ArrowRight size={15} />
        </a>
      </div>

      {menuOpen && (
        <button
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

export default function Home() {
  useRevealOnScroll();

  return (
    <>
      <ScrollToTop />
      <SiteHeader />

      <main>
        <div className="page-width home-content">
          <section className="hero-card" aria-labelledby="hero-title">
            <div className="hero-copy">
              <div className="hero-announcement">
                <span className="live-dot" />
                НОВОЕ
                <span className="announcement-divider">/</span>
                Открылся режим «Столбы»
              </div>

              <p className="hero-kicker">ТВОЙ МИР — ТВОИ ПРАВИЛА.</p>

              <h1 id="hero-title">
                SAKEVA
                <br />
                <span>NETWORK</span>
              </h1>

              <p className="hero-description">
                Место для тех, кто любит Minecraft за свободу, приключения и людей рядом.
                Заходи — твоё следующее большое приключение уже началось.
              </p>

              <div className="hero-actions">
                <a className="button-primary" href="https://discord.com/invite/sakeva">
                  Начать играть <ArrowRight size={17} />
                </a>
                <CopyAddress />
              </div>
            </div>

            <div className="hero-art" aria-label="Пиксельный персонаж Sakeva" role="img">
              <div className="art-character">
                <img src="/images/render.png" alt="рендер" />
              </div>

              <div className="art-caption">
                <span>ИССЛЕДУЙ СВОЙ МИР</span>
                <ArrowUpRight size={15} />
              </div>
            </div>
          </section>

          <section className="mode-grid" aria-label="Игровые режимы">
            <Link className="mode-card reveal" href="/wiki#vanilla">
              <span className="mode-icon mode-icon-green">
                <Leaf size={22} />
              </span>

              <span className="mode-content">
                <span className="mode-heading">
                  Ванилла <span className="mode-badge">СЕЗОН 3</span>
                </span>

                <span className="mode-description">
                  Большой мир, честное выживание и знакомые лица.
                </span>
              </span>

              <ArrowUpRight className="mode-arrow" size={19} />
            </Link>

            <Link className="mode-card reveal" href="/news">
              <span className="mode-icon mode-icon-sand">
                <Pickaxe size={22} />
              </span>

              <span className="mode-content">
                <span className="mode-heading">
                  Столбы <span className="mode-badge mode-badge-new">НОВЫЙ</span>
                </span>

                <span className="mode-description">
                  Острова в небе. Один шанс. Целый мир возможностей.
                </span>
              </span>

              <ArrowUpRight className="mode-arrow" size={19} />
            </Link>
          </section>

          <section className="section-block" id="features">
            <div className="section-heading feature-section-heading reveal">
              <div>
                <p className="section-kicker">ПОЧЕМУ SAKEVA</p>
                <h2>
                  Уникальность
                  <br />
                  и практичность
                </h2>
              </div>

              <p>
                Ничего лишнего. Всё, за что мы сами любим Minecraft и хорошее сообщество.
              </p>
            </div>

            <div className="feature-grid">
              {features.map(({ icon: Icon, number, title, text }, index) => (
                <article
                  className="feature-card reveal"
                  style={{ "--reveal-order": index } as React.CSSProperties}
                  key={title}
                >
                  <div className="feature-top">
                    <span className="feature-icon">
                      <Icon size={20} />
                    </span>
                    <span className="feature-number">{number}</span>
                  </div>

                  <div>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="world-card reveal">
            <div className="world-copy">
              <p className="section-kicker">МИР БЕЗ ГРАНИЦ</p>

              <h2>
                Здесь уже есть
                <br />
                место для тебя
              </h2>

              <p>
                Пройдись по дорогам нашего мира, найди свой будущий дом или просто
                полюбуйся на то, что мы построили вместе.
              </p>

              <Link className="button-secondary" href="/wiki#map">
                Открыть карту <ArrowUpRight size={16} />
              </Link>
            </div>

            <div
              className="world-landscape"
              role="img"
              aria-label="Карта мира Sakeva"
            >
              <img className="world-map" src="/images/map.jpg" alt="Карта мира Sakeva" />

              <div className="map-coordinates">
                <MapPinned size={15} />
                <span>X:    Y:    Z: </span>
              </div>
            </div>
          </section>

          <section className="section-block faq-section">
            <div className="section-heading reveal">
              <div>
                <p className="section-kicker">КОРОТКО О ГЛАВНОМ</p>
                <h2>
                  Вопрос — ответ
                </h2>
              </div>

              <Link className="text-link" href="/wiki">
                Вся вики <ArrowUpRight size={16} />
              </Link>
            </div>

            <div className="faq-grid">
              {questions.map((item, index) => (
                <article
                  className="faq-card reveal"
                  style={{ "--reveal-order": index } as React.CSSProperties}
                  key={item.question}
                >
                  <span className="faq-index">0{index + 1}</span>
                  <h3>{item.question}</h3>
                  <p>{item.answer}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="section-block socials-section">
            <div className="section-heading reveal">
              <div>
                <p className="section-kicker">НЕ ТЕРЯЕМСЯ</p>
                <h2>
                  Мы в социальных
                  <br />
                  сетях
                </h2>
              </div>

              <p>
                Новости, красивые постройки и истории нашего сообщества — там, где тебе удобно.
              </p>
            </div>

            <div className="social-grid">
              <a
                className="social-card social-telegram reveal"
                href="https://t.me/sakevanetwork"
                target="_blank"
                rel="noreferrer"
              >
                <MessageCircle size={25} />
                <span>
                  <b>Telegram</b>
                  <small>Новости и наше сообщество</small>
                </span>
                <ArrowUpRight size={18} />
              </a>

              <a
                className="social-card social-youtube reveal"
                href="https://www.youtube.com/@SakevaMC"
                target="_blank"
                rel="noreferrer"
              >
                <Clapperboard size={25} />
                <span>
                  <b>YouTube</b>
                  <small>Видео о жизни на сервере</small>
                </span>
                <ArrowUpRight size={18} />
              </a>

              <a
                className="social-card social-discord reveal"
                href="https://discord.com/invite/sakeva"
                target="_blank"
                rel="noreferrer"
              >
                <UsersRound size={25} />
                <span>
                  <b>Discord</b>
                  <small>Встречаемся в голосовом</small>
                </span>
                <ArrowUpRight size={18} />
              </a>
            </div>
          </section>

          <section className="closing-banner reveal">
            <span className="closing-mark">
              <Sparkles size={20} />
            </span>

            <div>
              <p className="section-kicker">СВОБОДНОЕ МЕСТО В МИРЕ</p>
              <h2>Увидимся на сервере?</h2>
            </div>

            <a className="button-primary" href="#">
              Зайти в игру <ArrowRight size={17} />
            </a>
          </section>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
