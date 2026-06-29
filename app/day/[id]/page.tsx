"use client";
import { useState } from "react";
import Link from "next/link";
import { use } from "react";

const LESSONS: Record<string, {
  title: string; emoji: string; words: { word: string; zh: string; emoji: string }[];
}> = {
  "1": { title: "Hello World!", emoji: "👋", words: [
    { word: "Hello", zh: "你好", emoji: "👋" },
    { word: "Hi", zh: "嗨", emoji: "😊" },
    { word: "Bye", zh: "再见", emoji: "👋" },
  ]},
  "2": { title: "My Family", emoji: "👨‍👩‍👧", words: [
    { word: "Mom", zh: "妈妈", emoji: "👩" },
    { word: "Dad", zh: "爸爸", emoji: "👨" },
    { word: "Baby", zh: "宝宝", emoji: "👶" },
  ]},
  "3": { title: "Yummy Food!", emoji: "🍎", words: [
    { word: "Apple", zh: "苹果", emoji: "🍎" },
    { word: "Cake", zh: "蛋糕", emoji: "🎂" },
    { word: "Milk", zh: "牛奶", emoji: "🥛" },
  ]},
};

export default function DayPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const lesson = LESSONS[id] || LESSONS["3"];
  const [step, setStep] = useState<"intro"|"word"|"quiz"|"done">("intro");
  const [wordIdx, setWordIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [quizIdx, setQuizIdx] = useState(0);
  const [selected, setSelected] = useState<string|null>(null);

  const currentWord = lesson.words[wordIdx];

  function speak(text: string) {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      const u = new SpeechSynthesisUtterance(text);
      u.lang = "en-US"; u.rate = 0.85;
      window.speechSynthesis.speak(u);
    }
  }

  if (step === "intro") return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(180deg, #e8f5e9, #fff8f0)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ fontSize: 80, marginBottom: 20, animation: "float 2s ease-in-out infinite" }}>{lesson.emoji}</div>
      <div style={{ fontSize: 28, fontWeight: 900, color: "#2D6A4F", marginBottom: 8 }}>Day {id}</div>
      <div style={{ fontSize: 22, fontWeight: 800, color: "#52B788", marginBottom: 32 }}>{lesson.title}</div>
      <div style={{ display: "flex", gap: 12, marginBottom: 40 }}>
        {lesson.words.map(w => (
          <div key={w.word} style={{ background: "#fff", borderRadius: 16, padding: "12px 16px", textAlign: "center", boxShadow: "0 4px 16px rgba(0,0,0,0.08)" }}>
            <div style={{ fontSize: 28 }}>{w.emoji}</div>
            <div style={{ fontWeight: 800, color: "#2D6A4F", marginTop: 4 }}>{w.word}</div>
          </div>
        ))}
      </div>
      <button onClick={() => setStep("word")} style={{ background: "linear-gradient(135deg, #52B788, #2D6A4F)", color: "#fff", border: "none", borderRadius: 24, padding: "16px 48px", fontSize: 18, fontWeight: 900, cursor: "pointer", boxShadow: "0 8px 24px rgba(82,183,136,0.4)" }}>
        开始学习 🚀
      </button>
      <Link href="/" style={{ marginTop: 20, color: "#888", textDecoration: "none", fontSize: 14 }}>← 返回首页</Link>
      <style>{`@keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }`}</style>
    </div>
  );

  if (step === "word") return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(180deg, #e8f5e9, #fff8f0)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ marginBottom: 16, color: "#888", fontSize: 14 }}>{wordIdx + 1} / {lesson.words.length}</div>
      <div style={{ background: "#fff", borderRadius: 32, padding: 40, textAlign: "center", boxShadow: "0 12px 40px rgba(0,0,0,0.1)", width: "100%", maxWidth: 340 }}>
        <div style={{ fontSize: 100, marginBottom: 16 }}>{currentWord.emoji}</div>
        <div style={{ fontSize: 36, fontWeight: 900, color: "#2D6A4F", marginBottom: 8 }}>{currentWord.word}</div>
        <div style={{ fontSize: 18, color: "#888", marginBottom: 24 }}>{currentWord.zh}</div>
        <button onClick={() => speak(currentWord.word)} style={{ background: "linear-gradient(135deg, #ADE8F4, #52B788)", border: "none", borderRadius: 20, padding: "12px 32px", fontSize: 16, fontWeight: 800, color: "#fff", cursor: "pointer", marginBottom: 12, width: "100%" }}>
          🔊 听发音
        </button>
      </div>
      <div style={{ display: "flex", gap: 16, marginTop: 32 }}>
        {wordIdx > 0 && <button onClick={() => setWordIdx(i => i - 1)} style={{ background: "#eee", border: "none", borderRadius: 16, padding: "12px 24px", fontWeight: 800, cursor: "pointer" }}>← 上一个</button>}
        {wordIdx < lesson.words.length - 1
          ? <button onClick={() => { speak(lesson.words[wordIdx+1].word); setWordIdx(i => i + 1); }} style={{ background: "linear-gradient(135deg, #52B788, #2D6A4F)", color: "#fff", border: "none", borderRadius: 16, padding: "12px 32px", fontWeight: 800, cursor: "pointer" }}>下一个 →</button>
          : <button onClick={() => setStep("quiz")} style={{ background: "linear-gradient(135deg, #FFD166, #FF6B6B)", color: "#fff", border: "none", borderRadius: 16, padding: "12px 32px", fontWeight: 800, cursor: "pointer" }}>开始测验 ⭐</button>
        }
      </div>
    </div>
  );

  if (step === "quiz") {
    const q = lesson.words[quizIdx];
    const options = [...lesson.words].sort(() => Math.random() - 0.5).slice(0, 3);
    if (!options.find(o => o.word === q.word)) options[0] = q;
    const shuffled = options.sort(() => Math.random() - 0.5);
    return (
      <div style={{ minHeight: "100vh", background: "linear-gradient(180deg, #fff3cd, #fff8f0)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24 }}>
        <div style={{ fontSize: 14, color: "#888", marginBottom: 16 }}>测验 {quizIdx+1}/{lesson.words.length}</div>
        <div style={{ background: "#fff", borderRadius: 28, padding: 32, textAlign: "center", boxShadow: "0 8px 32px rgba(0,0,0,0.1)", width: "100%", maxWidth: 340, marginBottom: 24 }}>
          <div style={{ fontSize: 80, marginBottom: 12 }}>{q.emoji}</div>
          <div style={{ fontSize: 18, color: "#555", fontWeight: 700 }}>这个是什么？</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, width: "100%", maxWidth: 340 }}>
          {shuffled.map(opt => {
            const isCorrect = opt.word === q.word;
            const bg = selected ? (isCorrect ? "#52B788" : opt.word === selected ? "#FF6B6B" : "#fff") : "#fff";
            const color = selected && (isCorrect || opt.word === selected) ? "#fff" : "#2D6A4F";
            return (
              <button key={opt.word} disabled={!!selected} onClick={() => {
                setSelected(opt.word);
                if (isCorrect) setScore(s => s + 1);
                setTimeout(() => {
                  if (quizIdx < lesson.words.length - 1) { setQuizIdx(i => i + 1); setSelected(null); }
                  else setStep("done");
                }, 900);
              }} style={{ background: bg, color, border: "2px solid #eee", borderRadius: 16, padding: "14px 20px", fontSize: 18, fontWeight: 800, cursor: selected ? "default" : "pointer", transition: "all 0.2s" }}>
                {opt.word} {selected && isCorrect ? "✓" : ""}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(180deg, #e8f5e9, #fff8f0)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24, textAlign: "center" }}>
      <div style={{ fontSize: 80, marginBottom: 16 }}>🎉</div>
      <div style={{ fontSize: 28, fontWeight: 900, color: "#2D6A4F", marginBottom: 8 }}>太棒了！</div>
      <div style={{ fontSize: 60, margin: "16px 0" }}>{"⭐".repeat(score === 3 ? 3 : score >= 2 ? 2 : 1)}</div>
      <div style={{ fontSize: 18, color: "#555", marginBottom: 8 }}>答对了 {score}/{lesson.words.length} 题</div>
      <div style={{ background: "#fff3cd", borderRadius: 20, padding: "16px 24px", marginBottom: 32, maxWidth: 300 }}>
        <div style={{ fontWeight: 800, color: "#856404" }}>❤️ 爸爸陪伴时刻</div>
        <div style={{ color: "#856404", marginTop: 6 }}>今天请爸爸夸孩子一句：<br /><strong>"今天你真棒！"</strong></div>
      </div>
      <Link href="/">
        <button style={{ background: "linear-gradient(135deg, #52B788, #2D6A4F)", color: "#fff", border: "none", borderRadius: 20, padding: "14px 40px", fontSize: 18, fontWeight: 900, cursor: "pointer" }}>
          回到森林 🌳
        </button>
      </Link>
    </div>
  );
}
