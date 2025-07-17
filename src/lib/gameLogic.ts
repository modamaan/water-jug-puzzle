// Types
export type Jug = { capacity: number; current: number };
export type GameState = {
  jugs: Jug[];
  moves: number;
  history: Jug[][];
};

// Fill a jug to its capacity
export function fillJug(jugs: Jug[], index: number): Jug[] {
  return jugs.map((jug, i) => i === index ? { ...jug, current: jug.capacity } : jug);
}

// Empty a jug
export function emptyJug(jugs: Jug[], index: number): Jug[] {
  return jugs.map((jug, i) => i === index ? { ...jug, current: 0 } : jug);
}

// Pour from one jug to another
export function pourJug(jugs: Jug[], from: number, to: number): Jug[] {
  if (from === to) return jugs;
  const source = jugs[from];
  const target = jugs[to];
  const pourAmount = Math.min(source.current, target.capacity - target.current);
  if (pourAmount === 0) return jugs;
  return jugs.map((jug, i) => {
    if (i === from) return { ...jug, current: jug.current - pourAmount };
    if (i === to) return { ...jug, current: jug.current + pourAmount };
    return jug;
  });
}

// Check win condition
export function checkWin(jugs: Jug[], goal: number): boolean {
  return jugs.some(jug => jug.current === goal);
}

// Push current state to history for undo
export function pushHistory(history: Jug[][], jugs: Jug[]): Jug[][] {
  return [...history, jugs.map(jug => ({ ...jug }))];
}

// Undo last move
export function undo(history: Jug[][]): { jugs: Jug[]; history: Jug[][] } {
  if (history.length === 0) return { jugs: [], history: [] };
  const newHistory = [...history];
  const jugs = newHistory.pop()!;
  return { jugs, history: newHistory };
} 