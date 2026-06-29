"use client";
import Link from "next/link";

export default function SettingsPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#f8f9fa", paddingBottom: 80 }}>
      <header style={{ background: "linear-gradient(135deg, #6c757d, #495057)", padding: "20px 24px", display: "flex", alignItems: "center", gap: 16 }}>
        <Link href="/" style={{ color: "#fff", textDecoration: "none", fontSize: 20 }}>←</Link>
        <div style={{ color: "#fff", fontWeight: 900, fontSize: 20 }}>⚙️ 家长中心</div>
      </header>
      <div style={{ padding: "20px" }}>
        {/* Stats */}
        <div style={{ background: "#fff", borderRadius: 24, padding: 20, marginBottom: 16, boxShadow: "0 4px 16px rgba(0,0,0,0.07)" }}>
          <div style={{ fontWeight: 800, fontSize: 16, color: "#2D6A4F", marginBottom: 14 }}>📊 今日学习报告</div>
          {[
            ["✅ 完成课程", "2 天"],
            ["⏱️ 学习时长", "26 分钟"],
            ["🎤 发音评分", "91 分"],
            ["📖 新单词", "6 个"],
            ["💬 口语练习", "18 句"],
            ["🔥 连续学习", "2 天"],
          ].map(([k, v]) => (
            <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid #f0f0f0" }}>
              <span style={{ color: "#555", fontSize: 15 }}>{k}</span>
              <span style={{ fontWeight: 800, color: "#2D6A4F", fontSize: 15 }}>{v}</span>
            </div>
          ))}
        </div>
        {/* Companion mode */}
        <div style={{ background: "linear-gradient(135deg, #FF6B6B, #FF8E8E)", borderRadius: 24, padding: 20, marginBottom: 16 }}>
          <div style={{ color: "#fff", fontWeight: 900, fontSize: 16, marginBottom: 8 }}>❤️ 爸爸陪伴模式</div>
          <div style={{ color: "rgba(255,255,255,0.9)", fontSize: 14, lineHeight: 1.7 }}>
            每天完成课程后，系统会给爸爸一条专属陪伴提示。<br />英语不是最重要的，陪伴才是。
          </div>
        </div>
        <div style={{ background: "#fff", borderRadius: 24, padding: 20, boxShadow: "0 4px 16px rgba(0,0,0,0.07)" }}>
          <div style={{ fontWeight: 800, fontSize: 16, color: "#2D6A4F", marginBottom: 14 }}>🔧 设置</div>
          {["每日提醒时间", "孩子名字", "学习难度", "语音速度", "关于我们"].map(item => (
            <div key={item} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 0", borderBottom: "1px solid #f0f0f0", cursor: "pointer" }}>
              <span style={{ color: "#444", fontSize: 15 }}>{item}</span>
              <span style={{ color: "#aaa" }}>›</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
