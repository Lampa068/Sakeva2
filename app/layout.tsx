import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sakeva Network — Minecraft без лишнего",
  description:
    "Sakeva Network — уютный Minecraft-сервер с ванильным выживанием, сезоном и режимом «Столбы».",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
