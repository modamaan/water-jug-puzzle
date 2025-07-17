"use client"
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Droplets, Target, Clock, Trophy, Star, Lock } from "lucide-react";
import levels from "@/lib/levels.json";

const getDifficultyColor = (difficulty) => {
  switch ((difficulty || "").toLowerCase()) {
    case "easy":
      return "bg-green-100 text-green-700 border-green-200";
    case "medium":
      return "bg-yellow-100 text-yellow-700 border-yellow-200";
    case "hard":
      return "bg-red-100 text-red-700 border-red-200";
    default:
      return "bg-blue-100 text-blue-700 border-blue-200";
  }
};

const getDifficultyIcon = (difficulty) => {
  switch ((difficulty || "").toLowerCase()) {
    case "easy":
      return <Star className="w-3 h-3" />;
    case "medium":
      return <Trophy className="w-3 h-3" />;
    case "hard":
      return <Target className="w-3 h-3" />;
    default:
      return <Star className="w-3 h-3" />;
  }
};

export default function LevelsPage() {
  const [unlocked, setUnlocked] = useState(1);

  useEffect(() => {
    // Get unlocked level from localStorage or default to 1
    const saved = parseInt(localStorage.getItem("unlockedLevel") || "1", 10);
    setUnlocked(saved);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 p-4">
      {/* Header Section */}
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 pt-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="relative">
              <Droplets className="w-10 h-10 text-blue-600" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-cyan-400 rounded-full animate-pulse"></div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Water Jug Problems
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Challenge your mind with these water jug puzzles. Pour, measure, and
            solve your way through increasingly difficult levels.
          </p>
        </div>

        {/* Levels Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {levels.map((level) => {
            const isLocked = level.id > unlocked;
            return (
              <div
                key={level.id}
                className={`group relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 overflow-hidden ${isLocked ? "opacity-60 pointer-events-none" : "hover:shadow-xl hover:border-blue-200/50 hover:-translate-y-1 transition-all duration-300"}`}
              >
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-cyan-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Water Drop Animation */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                </div>

                <div className="relative p-6">
                  {/* Level Number */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-md">
                        {level.id}
                      </div>
                      <span className="text-lg font-semibold text-gray-800">
                        Level {level.id}
                      </span>
                    </div>

                    {/* Difficulty Badge */}
                    <div
                      className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(
                        level.difficulty
                      )}`}
                    >
                      {getDifficultyIcon(level.difficulty)}
                      {level.difficulty}
                    </div>
                  </div>

                  {/* Goal */}
                  <div className="flex items-center gap-2 mb-3 p-3 bg-blue-50/80 rounded-xl border border-blue-100">
                    <Target className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-800">
                      Target: <span className="font-bold">{level.goal}L</span>
                    </span>
                  </div>

                  {/* Jug Sizes */}
                  <div className="flex items-center gap-2 mb-3">
                    <Droplets className="w-4 h-4 text-cyan-600" />
                    <span className="text-sm text-gray-600">
                      Jugs: {" "}
                      <span className="font-semibold text-gray-800">
                        {level.jugs.join("L, ")}L
                      </span>
                    </span>
                  </div>

                  {/* Optimal Moves */}
                  <div className="flex items-center gap-2 mb-4">
                    <Clock className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-gray-600">
                      Optimal: {" "}
                      <span className="font-semibold text-gray-800">
                        {level.optimalMoves} moves
                      </span>
                    </span>
                  </div>

                  {/* Play Button or Locked */}
                  <div className="flex items-center justify-center pt-2">
                    {isLocked ? (
                      <div className="px-4 py-2 bg-gray-300 text-gray-500 rounded-xl font-medium text-sm flex items-center gap-2">
                        <Lock className="w-4 h-4" /> Locked
                      </div>
                    ) : (
                      <Link href={`/game/${level.id}`}>
                        <div className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl font-medium text-sm group-hover:from-blue-600 group-hover:to-cyan-600 transition-all duration-300 shadow-md">
                          Play Level
                        </div>
                      </Link>
                    )}
                  </div>
                </div>

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-400/0 via-cyan-400/0 to-blue-400/0 group-hover:from-blue-400/10 group-hover:via-cyan-400/10 group-hover:to-blue-400/10 transition-all duration-300 pointer-events-none"></div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="text-center mt-16 pb-8">
          <p className="text-gray-500 text-sm">
            Complete all levels to become a Water Puzzle Master! 💧
          </p>
        </div>
      </div>
    </main>
  );
}
