"use client";
import { useState } from "react";
import Link from "next/link";

const ALL_WORDS = [
  { word: "Hello", zh: "你好", emoji: "👋", day: 1, learned: true },
  { word: "Hi", zh: "嗨", emoji: "😊", day: 1, learned: true },
  { word: "Bye", zh: "再见", emoji: "👋", day: 1, learned: true },
  { word: "Mom", zh: "妈妈", emoji: "👩", day: 2, learned: true },
  { word: "Dad", zh: "爸爸", emoji: "👨", day: 2, learned: true },
  { word: "Baby", zh: "宝宝", emoji: "👶", day: 2, learned: true },
  { word: "Apple", zh: "苹果", emoji: "🍎", day: 3, learned: false },
  { word: "Cake", zh: "蛋糕", emoji: "🎂", day: 3, learned: false },
  { word: "Milk", zh: "牛奶", emoji: "🥛", day: 3, learned: false },
];

function speak(text: string) {
  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "en-US"; u.rate = 0.85;
    window.speechSynthesis.speak(u);
  }
}

export default function WordsPage() {
  const [filter, setFilter] = useState<"all"|"learned"|"new">("all");
  const filtered = ALL_WORDS.filter(w => filter === "all" ? true : filter === "learned" ? w.learned : !w.learned);

  return (
    <div style={{ minHeight: "100vh", background: "#f0fff4", paddingBottom: 80 }}>
      <header style={{ background: "linear-gradient(135deg, #2D6A4F, #52B788)", padding: "20px 24px", display: "flex", alignItems: "center", gap: 16 }}>
        <Link href="/" style={{ color: "#fff", textDecoration: "none", fontSize: 20 }}>←</Link>
        <div style={{ color: "#fff", fontWeight: 900, fontSize: 20 }}>📖 我的单词本</div>
      </header>
      <div style={{ padding: "16px 20px" }}>
        <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
          {(["all","learned","new"] as const).map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{
              background: filter === f ? "#2D6A4F" : "#fff",
              color: filter === f ? "#fff" : "#555",
              border: "2px solid " + (filter === f ? "#2D6A4F" : "#ddd"),
              borderRadius: 20, padding: "6px 16px", fontWeight: 800, cursor: "pointer", fontSize: 13
            }}>
              {f === "all" ? "全部" : f === "learned" ? "✅ 已学" : "🆕 待学"}
            </button>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {filtered.map(w => (
            <div key={w.word} onClick={() => speak(w.word)} style={{
              background: "#fff", borderRadius: 20, padding: 16, textAlign: "center",
              boxShadow: "0 4px 16px rgba(0,0,0,0.07)", cursor: "pointer",
              border: w.learned ? "2px solid #95D5B2" : "2px solid #eee",
              position: "relative"
            }}>
              {w.learned && <div style={{ position: "absolute", top: 8, right: 8, fontSize: 14 }}>✅</div>}
              <div style={{ fontSize: 40, marginBottom: 8 }}>{w.emoji}</div>
              <div style={{ fontWeight: 900, fontSize: 18, color: "#2D6A4F" }}>{w.word}</div>
              <div style={{ fontSize: 13, color: "#888", marginTop: 4 }}>{w.zh}</div>
              <div style={{ fontSize: 11, color: "#aaa", marginTop: 4 }}>Day {w.day} · 点击发音</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
