import type { ReactNode } from 'react';
import { useGame } from '../engine/gameState';

interface GameCardProps {
  children: ReactNode;
  title?: string;
}

export default function GameCard({ children, title }: GameCardProps) {
  const { transitioning } = useGame();

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div
        className={`w-full max-w-2xl bg-parchment/95 backdrop-blur-sm rounded-2xl shadow-2xl shadow-black/50 border border-gold/30 overflow-hidden transition-all duration-300 ease-in-out ${
          transitioning
            ? 'opacity-0 scale-95'
            : 'opacity-100 scale-100'
        }`}
      >
        {title && (
          <div className="bg-gradient-to-r from-royal via-royal-light to-royal py-3 px-6 border-b border-gold/30">
            <h2 className="font-heading text-lg sm:text-xl text-gold text-center tracking-wide">
              {title}
            </h2>
          </div>
        )}
        <div className="p-5 sm:p-6 md:p-8">{children}</div>
      </div>
    </div>
  );
}
