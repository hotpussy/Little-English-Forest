"use client";
import Link from "next/link";

const BADGES = [
  { emoji: "🍓", name: "草莓徽章", desc: "完成第1天", earned: true },
  { emoji: "🌸", name: "樱花徽章", desc: "连续3天", earned: true },
  { emoji: "🦋", name: "蝴蝶徽章", desc: "完成5天", earned: false },
  { emoji: "⭐", name: "星星徽章", desc: "测验满分", earned: false },
];

export default function ForestPage() {
  const treeLevel = 2;
  const totalDays = 2;

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(180deg, #c8e6c9, #fff8f0)", paddingBottom: 80 }}>
      <header style={{ background: "linear-gradient(135deg, #1B5E20, #2D6A4F)", padding: "20px 24px", display: "flex", alignItems: "center", gap: 16 }}>
        <Link href="/" style={{ color: "#fff", textDecoration: "none", fontSize: 20 }}>←</Link>
        <div style={{ color: "#fff", fontWeight: 900, fontSize: 20 }}>🌳 我的成长树</div>
      </header>
      <div style={{ padding: "24px 20px", textAlign: "center" }}>
        <div style={{ fontSize: 14, color: "#555", marginBottom: 8 }}>已学习 {totalDays} 天 · 树苗成长中</div>
        <div style={{ fontSize: 120, margin: "20px 0", lineHeight: 1 }}>
          {treeLevel >= 3 ? "🌲" : treeLevel >= 2 ? "🌱" : "🪴"}
        </div>
        <div style={{ fontWeight: 900, fontSize: 22, color: "#2D6A4F", marginBottom: 4 }}>
          {treeLevel >= 3 ? "茁壮的大树" : treeLevel >= 2 ? "努力生长的树苗" : "刚刚发芽"}
        </div>
        <div style={{ fontSize: 14, color: "#888", marginBottom: 28 }}>再学 {5 - totalDays} 天解锁下一阶段 🎯</div>

        {/* Progress bar */}
        <div style={{ background: "#ddd", borderRadius: 20, height: 14, maxWidth: 300, margin: "0 auto 32px", overflow: "hidden" }}>
          <div style={{ background: "linear-gradient(90deg, #52B788, #2D6A4F)", height: "100%", width: `${(totalDays/5)*100}%`, borderRadius: 20, transition: "width 1s" }} />
        </div>

        <div style={{ textAlign: "left" }}>
          <div style={{ fontWeight: 800, fontSize: 16, color: "#2D6A4F", marginBottom: 14 }}>🏅 我的徽章</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {BADGES.map(b => (
              <div key={b.name} style={{ background: b.earned ? "#fff" : "#f5f5f5", borderRadius: 20, padding: 16, textAlign: "center", boxShadow: b.earned ? "0 4px 16px rgba(0,0,0,0.08)" : "none", opacity: b.earned ? 1 : 0.4 }}>
                <div style={{ fontSize: 40 }}>{b.emoji}</div>
                <div style={{ fontWeight: 800, fontSize: 14, color: "#2D6A4F", marginTop: 6 }}>{b.name}</div>
                <div style={{ fontSize: 12, color: "#888" }}>{b.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
