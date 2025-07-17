"use client";
import { useState, useEffect } from "react";
import levels from "../../../lib/levels.json";
import { useParams, notFound, useRouter } from "next/navigation";
import Jug from "@/components/Jug";
import UndoButton from "@/components/UndoButton";
import {
  fillJug,
  emptyJug,
  pourJug,
  checkWin,
  pushHistory,
  undo
} from "@/lib/gameLogic";
import Link from "next/link";
import { Home } from "lucide-react";
import Confetti from "react-confetti";

export default function GamePage() {
  const params = useParams();
  const router = useRouter();
  const level = levels.find((l) => l.id === Number(params.levelId));
  if (!level) return notFound();
  const currentLevelIndex = levels.findIndex(l => l.id === Number(params.levelId));
  const nextLevel = levels[currentLevelIndex + 1];

  // Initial state
  const initialJugs = level.jugs.map((cap) => ({ capacity: cap, current: 0 }));
  const [jugs, setJugs] = useState(initialJugs);
  const [moves, setMoves] = useState(0);
  const [history, setHistory] = useState([]);
  const [selected, setSelected] = useState(null); // for pour
  const [win, setWin] = useState(false);

  // Unlock next level in localStorage when win becomes true
  useEffect(() => {
    if (win) {
      const currentLevel = Number(params.levelId);
      const unlocked = parseInt(localStorage.getItem("unlockedLevel") || "1", 10);
      if (currentLevel === unlocked) {
        localStorage.setItem("unlockedLevel", (currentLevel + 1).toString());
      }
    }
  }, [win, params.levelId]);

  // Handlers
  const handleFill = (i) => {
    if (win) return;
    setHistory(pushHistory(history, jugs));
    setJugs(fillJug(jugs, i));
    setMoves(moves + 1);
    if (checkWin(fillJug(jugs, i), level.goal)) setWin(true);
    setSelected(null);
  };
  const handleEmpty = (i) => {
    if (win) return;
    setHistory(pushHistory(history, jugs));
    setJugs(emptyJug(jugs, i));
    setMoves(moves + 1);
    if (checkWin(emptyJug(jugs, i), level.goal)) setWin(true);
    setSelected(null);
  };
  const handlePour = (i) => {
    if (win) return;
    if (selected === null) {
      setSelected(i);
      return;
    }
    if (selected === i) {
      setSelected(null);
      return;
    }
    setHistory(pushHistory(history, jugs));
    const newJugs = pourJug(jugs, selected, i);
    setJugs(newJugs);
    setMoves(moves + 1);
    if (checkWin(newJugs, level.goal)) setWin(true);
    setSelected(null);
  };
  const handleUndo = () => {
    if (history.length === 0) return;
    const { jugs: prevJugs, history: newHistory } = undo(history);
    setJugs(prevJugs);
    setHistory(newHistory);
    setMoves(moves - 1);
    setWin(false);
    setSelected(null);
  };
  const handleReset = () => {
    setJugs(initialJugs);
    setMoves(0);
    setHistory([]);
    setWin(false);
    setSelected(null);
  };

  // Get window size for confetti
  let width = 300, height = 300;
  if (typeof window !== "undefined") {
    width = window.innerWidth;
    height = window.innerHeight;
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-100 to-blue-200 p-4">
      {/* Confetti Celebration */}
      {win && <Confetti width={width} height={height} numberOfPieces={300} recycle={false} />}
      {/* Home Button */}
      <div className="w-full max-w-md flex justify-start mb-4">
        <Link href="/levels">
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-200 text-blue-800 font-semibold shadow hover:bg-blue-300 transition">
            <Home className="w-5 h-5" /> Home
          </button>
        </Link>
      </div>
      {/* Rules Section */}
      <div className="w-full max-w-md mb-6 p-4 bg-blue-50 border border-blue-200 rounded-xl shadow text-blue-900">
        <h2 className="font-bold text-lg mb-2">Rules of the Water Jug Problem</h2>
        <ul className="list-disc pl-5 space-y-1 text-sm">
          <li>You have two jugs with different capacities.</li>
          <li>Your goal is to measure a specific amount of liquid using only these jugs.</li>
          <li>You can fill a jug completely.</li>
          <li>You can empty a jug completely.</li>
          <li>You can pour water from one jug to another until either the source jug is empty or the destination jug is full.</li>
        </ul>
      </div>
      <div className="w-full max-w-md bg-white/80 rounded-2xl shadow-xl p-6 flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-2 text-blue-900 tracking-tight">Level {level.id}</h1>
        <div className="mb-1 text-blue-600 text-sm font-medium">{level.difficulty}</div>
        <div className="mb-2 px-3 py-1 rounded bg-blue-100 text-blue-800 font-semibold text-base">Target: {level.goal}L</div>
        <div className="mb-1 text-blue-700 text-lg">Goal: <span className="font-semibold">{level.goal}L</span></div>
        <div className="mb-4 text-blue-500 text-sm">Optimal: {level.optimalMoves} moves</div>
        <div className="flex justify-center gap-4 mb-6 w-full">
          {jugs.map((jug, i) => (
            <Jug
              key={i}
              capacity={jug.capacity}
              current={jug.current}
              onFill={handleFill}
              onEmpty={handleEmpty}
              onPour={handlePour}
              index={i}
              selected={selected === i}
              onSelect={setSelected}
            />
          ))}
        </div>
        <div className="flex items-center gap-3 mb-4">
          <span className="text-blue-800 font-medium">Moves: {moves}</span>
          <UndoButton onUndo={handleUndo} disabled={history.length === 0 || win} />
          <button onClick={handleReset} className="px-4 py-2 rounded bg-blue-200 text-blue-800 font-semibold shadow hover:bg-blue-300 transition">Reset</button>
        </div>
        {selected !== null && !win && (
          <div className="mb-2 text-blue-600 text-sm animate-pulse">Select another jug to pour into</div>
        )}
        {win && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
            <div className="bg-white rounded-2xl shadow-2xl p-8 flex flex-col items-center max-w-xs">
              <div className="text-2xl font-bold text-blue-700 mb-2">You win!</div>
              <div className="text-blue-800 mb-2">You measured <span className="font-semibold">{level.goal}L</span> in <span className="font-semibold">{moves}</span> moves.</div>
              <button onClick={handleReset} className="mt-2 px-6 py-2 rounded bg-blue-500 text-white font-semibold shadow hover:bg-blue-600 transition">Play Again</button>
              {nextLevel && (
                <button
                  onClick={() => router.push(`/game/${nextLevel.id}`)}
                  className="mt-2 px-6 py-2 rounded bg-green-500 text-white font-semibold shadow hover:bg-green-600 transition"
                >
                  Next Level
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
