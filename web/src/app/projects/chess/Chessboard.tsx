"use client";
import { useState } from "react";

type Piece = "wP" | "wR" | "wN" | "wB" | "wQ" | "wK" | "bP" | "bR" | "bN" | "bB" | "bQ" | "bK" | null;

const PIECE_CHAR: Record<Exclude<Piece, null>, string> = {
    wK: "♔", wQ: "♕", wR: "♖", wB: "♗", wN: "♘", wP: "♙",
    bK: "♚", bQ: "♛", bR: "♜", bB: "♝", bN: "♞", bP: "♟",
};

const START_POS: Piece[] = (() => {
    const empty = Array<Piece>(64).fill(null);
    const place = (idx: number, p: Piece) => { empty[idx] = p; };
    // rank 8 (top) to 1 (bottom) in 0..63 index (row-major)
    const backRank = ["R", "N", "B", "Q", "K", "B", "N", "R"] as const;
    for (let f = 0; f < 8; f++) { place(0 * 8 + f, ("b" + backRank[f]) as Piece); }     // 8
    for (let f = 0; f < 8; f++) { place(1 * 8 + f, "bP"); }                           // 7
    for (let f = 0; f < 8; f++) { place(6 * 8 + f, "wP"); }                           // 2
    for (let f = 0; f < 8; f++) { place(7 * 8 + f, ("w" + backRank[f]) as Piece); }     // 1
    return empty;
})();

const files = "abcdefgh";

function algebraicFromIndex(i: number) {
    const r = Math.floor(i / 8);   // 0..7 (top to bottom)
    const f = i % 8;               // 0..7 (left to right)
    const file = files[f];
    const rank = 8 - r;
    return `${file}${rank}`;
}

export default function ChessBoard() {
    const [board, setBoard] = useState<Piece[]>(START_POS);
    const [selected, setSelected] = useState<number | null>(null);

    const onSquareClick = (i: number) => {
        if (selected === null) {
            if (board[i]) setSelected(i); // select only if a piece is there
            return;
        }
        if (selected === i) { setSelected(null); return; } // deselect
        // naive move (no legality): move piece, overwrite destination
        setBoard(prev => {
            const next = prev.slice();
            next[i] = prev[selected];
            next[selected] = null;
            return next;
        });
        setSelected(null);
    };
    return (
        <div className="w-full max-w-[560px]">
            {/* Board */}
            <div className="grid grid-cols-8 aspect-square w-full select-none rounded-lg overflow-hidden shadow">
                {Array.from({ length: 64 }, (_, i) => {
                    const r = Math.floor(i / 8), c = i % 8;
                    const isDark = (r + c) % 2 === 1;
                    const piece = board[i];
                    const isSel = i === selected;
                    return (
                        <button
                            key={i}
                            aria-label={algebraicFromIndex(i)}
                            onClick={() => onSquareClick(i)}
                            className={[
                                "flex items-center justify-center text-3xl sm:text-4xl",
                                "transition-colors",
                                isDark ? "bg-emerald-900/80" : "bg-emerald-200",
                                isSel ? "outline outline-4 outline-yellow-400" : "",
                                "hover:brightness-110"
                            ].join(" ")}
                        >
                            {piece ? PIECE_CHAR[piece] : null}
                        </button>
                    );
                })}
            </div>

            {/* Coordinates (optional) */}
            <div className="mt-2 flex justify-between text-xs text-muted-foreground px-1">
                {files.split("").map(f => <span key={f}>{f}</span>)}
            </div>
        </div>
    );
}