import { useEffect, useState } from 'react';

interface ConfettiPiece {
  id: number;
  left: number;
  color: string;
  size: number;
  duration: number;
  delay: number;
}

const COLORS = [
  '#c9a84c',
  '#e8a0b4',
  '#7eb3d8',
  '#e8c170',
  '#9b1b30',
  '#ff6b8a',
  '#ffd700',
  '#ff69b4',
];

export default function Confetti() {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);

  useEffect(() => {
    const generated: ConfettiPiece[] = Array.from({ length: 60 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      color: COLORS[Math.floor(Math.random() * COLORS.length)]!,
      size: Math.random() * 8 + 6,
      duration: Math.random() * 2 + 2,
      delay: Math.random() * 2,
    }));
    setPieces(generated);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {pieces.map((piece) => (
        <div
          key={piece.id}
          style={{
            position: 'absolute',
            left: `${piece.left}%`,
            top: '-10px',
            width: `${piece.size}px`,
            height: `${piece.size * 0.6}px`,
            backgroundColor: piece.color,
            borderRadius: '2px',
            animation: `confettiFall ${piece.duration}s ease-in ${piece.delay}s forwards`,
          }}
        />
      ))}
    </div>
  );
}
