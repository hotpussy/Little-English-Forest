"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const DAYS_DATA = [
  { day: 1, title: "Hello World!", words: ["hello", "hi", "bye"], done: true, stars: 3 },
  { day: 2, title: "My Family", words: ["mom", "dad", "baby"], done: true, stars: 2 },
  { day: 3, title: "Yummy Food", words: ["apple", "cake", "milk"], done: false, stars: 0 },
  { day: 4, title: "Colors!", words: ["red", "blue", "green"], done: false, stars: 0 },
  { day: 5, title: "Animals", words: ["cat", "dog", "bird"], done: false, stars: 0 },
];

const COMPANION_MESSAGES = [
  "今天请爸爸抱抱孩子 🤗",
  "今天请爸爸和孩子击掌 👋",
  "今天请爸爸夸一句：你今天真勇敢！",
];

export default function Home() {
  const [streak, setStreak] = useState(2);
  const [showCompanion, setShowCompanion] = useState(false);
  const [todayMsg] = useState(COMPANION_MESSAGES[new Date().getDay() % 3]);

  useEffect(() => {
    const t = setTimeout(() => setShowCompanion(true), 1200);
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(180deg, #e8f5e9 0%, #fff8f0 60%)" }}>
      {/* Header */}
      <header style={{
        background: "linear-gradient(135deg, #2D6A4F 0%, #52B788 100%)",
        padding: "20px 24px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        boxShadow: "0 4px 20px rgba(45,106,79,0.3)"
      }}>
        <div>
          <div style={{ fontSize: 22, fontWeight: 900, color: "#fff", letterSpacing: -0.5 }}>
            🌳 Little English Forest
          </div>
          <div style={{ fontSize: 13, color: "#95D5B2", marginTop: 2 }}>小小英语森林</div>
        </div>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <div style={{
            background: "rgba(255,255,255,0.2)", borderRadius: 20,
            padding: "6px 14px", color: "#FFD166", fontWeight: 800, fontSize: 15
          }}>
            🔥 {streak} 天
          </div>
          <Link href="/settings">
            <div style={{
              width: 40, height: 40, borderRadius: 20,
              background: "rgba(255,255,255,0.25)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 20, cursor: "pointer"
            }}>👨</div>
          </Link>
        </div>
      </header>

      <div style={{ maxWidth: 480, margin: "0 auto", padding: "0 20px 100px" }}>

        {/* Companion Mode Card */}
        {showCompanion && (
          <div style={{
            margin: "20px 0",
            background: "linear-gradient(135deg, #FF6B6B, #FF8E8E)",
            borderRadius: 20, padding: "18px 20px",
            boxShadow: "0 6px 20px rgba(255,107,107,0.3)",
            animation: "float 3s ease-in-out infinite"
          }}>
            <div style={{ color: "#fff", fontWeight: 800, fontSize: 14, marginBottom: 6 }}>
              ❤️ 今日爸爸陪伴时刻
            </div>
            <div style={{ color: "#fff", fontSize: 16, fontWeight: 700 }}>{todayMsg}</div>
          </div>
        )}

        {/* Progress Overview */}
        <div style={{
          background: "#fff",
          borderRadius: 24, padding: 20, marginBottom: 20,
          boxShadow: "0 4px 20px rgba(0,0,0,0.06)"
        }}>
          <div style={{ fontWeight: 800, fontSize: 16, color: "#2D6A4F", marginBottom: 16 }}>
            🌱 今日学习进度
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
            {[
              { label: "已完成", value: "2天", emoji: "✅" },
              { label: "新单词", value: "6个", emoji: "📖" },
              { label: "发音分", value: "91分", emoji: "🎤" },
            ].map(item => (
              <div key={item.label} style={{
                background: "#F0FFF4", borderRadius: 16, padding: "12px 8px",
                textAlign: "center"
              }}>
                <div style={{ fontSize: 22 }}>{item.emoji}</div>
                <div style={{ fontWeight: 900, fontSize: 18, color: "#2D6A4F" }}>{item.value}</div>
                <div style={{ fontSize: 11, color: "#888", marginTop: 2 }}>{item.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Today's Lesson CTA */}
        <Link href="/day/3">
          <div style={{
            background: "linear-gradient(135deg, #52B788, #2D6A4F)",
            borderRadius: 24, padding: "24px 20px", marginBottom: 20,
            boxShadow: "0 8px 30px rgba(82,183,136,0.4)",
            cursor: "pointer", position: "relative", overflow: "hidden"
          }}>
            <div style={{ position: "absolute", right: -10, top: -10, fontSize: 80, opacity: 0.15 }}>🍎</div>
            <div style={{ color: "rgba(255,255,255,0.8)", fontSize: 12, fontWeight: 700, marginBottom: 6 }}>
              DAY 3 · 今日课程
            </div>
            <div style={{ color: "#fff", fontSize: 22, fontWeight: 900, marginBottom: 8 }}>
              Yummy Food! 🍰
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {["apple", "cake", "milk"].map(w => (
                <span key={w} style={{
                  background: "rgba(255,255,255,0.25)",
                  color: "#fff", borderRadius: 20, padding: "4px 12px",
                  fontSize: 13, fontWeight: 700
                }}>{w}</span>
              ))}
            </div>
            <div style={{
              marginTop: 16, background: "#FFD166", borderRadius: 16,
              padding: "10px 0", textAlign: "center",
              fontWeight: 900, fontSize: 16, color: "#2D6A4F"
            }}>
              开始今天的冒险 →
            </div>
          </div>
        </Link>

        {/* Course Map */}
        <div style={{ fontWeight: 800, fontSize: 16, color: "#2D6A4F", marginBottom: 14 }}>
          🗺️ 学习地图
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {DAYS_DATA.map((d, i) => (
            <Link href={`/day/${d.day}`} key={d.day} style={{ textDecoration: "none" }}>
              <div style={{
                background: d.done ? "linear-gradient(135deg, #F0FFF4, #E8F5E9)" : "#fff",
                borderRadius: 20, padding: "16px 18px",
                display: "flex", alignItems: "center", gap: 14,
                boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                border: d.day === 3 ? "2px solid #52B788" : "2px solid transparent",
                cursor: "pointer", transition: "transform 0.15s",
                opacity: d.day > 3 ? 0.5 : 1,
              }}>
                <div style={{
                  width: 48, height: 48, borderRadius: 16,
                  background: d.done ? "#52B788" : d.day === 3 ? "#FFD166" : "#eee",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 22, fontWeight: 900, color: "#fff", flexShrink: 0
                }}>
                  {d.done ? "✓" : d.day === 3 ? "▶" : d.day}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 800, fontSize: 15, color: "#2D6A4F" }}>
                    Day {d.day} · {d.title}
                  </div>
                  <div style={{ fontSize: 12, color: "#888", marginTop: 3 }}>
                    {d.words.join(" · ")}
                  </div>
                </div>
                <div style={{ fontSize: 18 }}>
                  {d.done ? "⭐".repeat(d.stars) : d.day === 3 ? "🔓" : "🔒"}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Growth Diary Teaser */}
        <div style={{
          marginTop: 24,
          background: "linear-gradient(135deg, #ADE8F4, #90E0EF)",
          borderRadius: 24, padding: 20,
          boxShadow: "0 4px 20px rgba(173,232,244,0.5)"
        }}>
          <div style={{ fontWeight: 800, fontSize: 15, color: "#023E8A", marginBottom: 10 }}>
            📔 AI 成长日记 · 今天
          </div>
          <div style={{ fontSize: 13, color: "#023E8A", lineHeight: 1.7 }}>
            学会了 hello, apple, cat…<br />
            第一次完整说出：<strong>I can do it!</strong> 🎉<br />
            今天笑了 <strong>16次</strong> 😊&nbsp;
            爸爸陪伴了 <strong>24分钟</strong> ❤️
          </div>
        </div>
      </div>

      {/* Bottom Nav */}
      <nav style={{
        position: "fixed", bottom: 0, left: 0, right: 0,
        background: "#fff", borderTop: "1px solid #eee",
        display: "flex", justifyContent: "space-around",
        padding: "10px 0 20px", boxShadow: "0 -4px 20px rgba(0,0,0,0.06)"
      }}>
        {[
          { icon: "🏠", label: "首页", href: "/" },
          { icon: "📖", label: "单词", href: "/words" },
          { icon: "📚", label: "绘本", href: "/stories" },
          { icon: "🌳", label: "成长树", href: "/forest" },
          { icon: "⚙️", label: "设置", href: "/settings" },
        ].map(item => (
          <Link key={item.href} href={item.href} style={{ textDecoration: "none" }}>
            <div style={{ textAlign: "center", cursor: "pointer" }}>
              <div style={{ fontSize: 24 }}>{item.icon}</div>
              <div style={{ fontSize: 10, color: "#888", marginTop: 2 }}>{item.label}</div>
            </div>
          </Link>
        ))}
      </nav>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
      `}</style>
    </div>
  );
}
