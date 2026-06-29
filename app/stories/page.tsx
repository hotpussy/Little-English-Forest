"use client";
import { useState } from "react";
import Link from "next/link";

const STORIES = [
  { id: 1, title: "The Little Apple", emoji: "🍎", pages: 6, level: "⭐", done: true,
    preview: "One day, a little red apple fell from the tree..." },
  { id: 2, title: "My Happy Family", emoji: "👨‍👩‍👧", pages: 8, level: "⭐", done: true,
    preview: "Mom and Dad love me so much..." },
  { id: 3, title: "A Rainbow Day", emoji: "🌈", pages: 10, level: "⭐⭐", done: false,
    preview: "After the rain, a beautiful rainbow appeared..." },
];

function speak(text: string) {
  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "en-US"; u.rate = 0.8;
    window.speechSynthesis.speak(u);
  }
}

export default function StoriesPage() {
  const [reading, setReading] = useState<typeof STORIES[0]|null>(null);

  if (reading) return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(180deg, #fce4ec, #fff8f0)", display: "flex", flexDirection: "column", alignItems: "center", padding: 24 }}>
      <button onClick={() => setReading(null)} style={{ alignSelf: "flex-start", background: "none", border: "none", fontSize: 28, cursor: "pointer" }}>←</button>
      <div style={{ fontSize: 80, marginTop: 20 }}>{reading.emoji}</div>
      <div style={{ fontSize: 24, fontWeight: 900, color: "#2D6A4F", margin: "16px 0 8px" }}>{reading.title}</div>
      <div style={{ background: "#fff", borderRadius: 24, padding: 24, maxWidth: 340, boxShadow: "0 8px 32px rgba(0,0,0,0.08)", marginBottom: 24 }}>
        <div style={{ fontSize: 16, lineHeight: 2, color: "#444" }}>{reading.preview}</div>
        <div style={{ fontSize: 14, color: "#aaa", marginTop: 16 }}>共 {reading.pages} 页 · 点击朗读</div>
      </div>
      <button onClick={() => speak(reading.preview)} style={{ background: "linear-gradient(135deg, #52B788, #2D6A4F)", color: "#fff", border: "none", borderRadius: 20, padding: "14px 40px", fontSize: 16, fontWeight: 900, cursor: "pointer" }}>
        🔊 AI 朗读
      </button>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: "#fff8f0", paddingBottom: 80 }}>
      <header style={{ background: "linear-gradient(135deg, #FF6B6B, #FF8E8E)", padding: "20px 24px", display: "flex", alignItems: "center", gap: 16 }}>
        <Link href="/" style={{ color: "#fff", textDecoration: "none", fontSize: 20 }}>←</Link>
        <div style={{ color: "#fff", fontWeight: 900, fontSize: 20 }}>📚 AI 绘本</div>
      </header>
      <div style={{ padding: "16px 20px", display: "flex", flexDirection: "column", gap: 16 }}>
        {STORIES.map(s => (
          <div key={s.id} onClick={() => setReading(s)} style={{
            background: "#fff", borderRadius: 24, padding: 20,
            display: "flex", gap: 16, alignItems: "center",
            boxShadow: "0 4px 16px rgba(0,0,0,0.07)", cursor: "pointer"
          }}>
            <div style={{ fontSize: 56 }}>{s.emoji}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 900, fontSize: 17, color: "#2D6A4F" }}>{s.title}</div>
              <div style={{ fontSize: 13, color: "#888", margin: "4px 0" }}>{s.preview.slice(0,36)}…</div>
              <div style={{ display: "flex", gap: 8 }}>
                <span style={{ background: "#f0fff4", color: "#2D6A4F", borderRadius: 10, padding: "2px 10px", fontSize: 12, fontWeight: 700 }}>{s.pages}页</span>
                <span style={{ background: "#fff3cd", color: "#856404", borderRadius: 10, padding: "2px 10px", fontSize: 12, fontWeight: 700 }}>{s.level}</span>
                {s.done && <span style={{ background: "#d4edda", color: "#155724", borderRadius: 10, padding: "2px 10px", fontSize: 12, fontWeight: 700 }}>✅ 已读</span>}
              </div>
            </div>
          </div>
        ))}
        <div style={{ background: "linear-gradient(135deg, #667eea, #764ba2)", borderRadius: 24, padding: 20, textAlign: "center", color: "#fff" }}>
          <div style={{ fontSize: 32, marginBottom: 8 }}>✨</div>
          <div style={{ fontWeight: 900, fontSize: 16, marginBottom: 6 }}>AI 今日绘本生成中…</div>
          <div style={{ fontSize: 13, opacity: 0.8 }}>完成今日课程后解锁专属绘本</div>
        </div>
      </div>
    </div>
  );
}
