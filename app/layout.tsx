import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Little English Forest 🌳",
  description: "让每一个孩子，都拥有一位永远耐心、永远鼓励、永远陪伴成长的 AI 英语老师。",
  manifest: "/manifest.json",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body style={{ fontFamily: "'Nunito', system-ui, sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
