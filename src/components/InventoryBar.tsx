import type { Inventory } from '../engine/types';

interface InventoryBarProps {
  inventory: Inventory;
}

const shards = [
  {
    key: 'petal' as const,
    name: 'Petal Shard',
    image: '/assets/shard_petal.png',
    color: 'bg-shard-petal',
  },
  {
    key: 'ribbon' as const,
    name: 'Ribbon Shard',
    image: '/assets/shard_ribbon.png',
    color: 'bg-shard-ribbon',
  },
  {
    key: 'candle' as const,
    name: 'Candle Shard',
    image: '/assets/shard_candle.png',
    color: 'bg-shard-candle',
  },
];

export default function InventoryBar({ inventory }: InventoryBarProps) {
  const count = [inventory.petal, inventory.ribbon, inventory.candle].filter(
    Boolean,
  ).length;

  return (
    <div className="mt-6 pt-4 border-t border-gold/20">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-heading text-gold/70 uppercase tracking-widest">
          Shards
        </span>
        <span className="text-xs font-heading text-gold">{count}/3</span>
      </div>
      <div className="flex justify-center gap-3">
        {shards.map((shard) => {
          const collected = inventory[shard.key];
          return (
            <div
              key={shard.key}
              className={`flex flex-col items-center transition-all duration-500 ${
                collected
                  ? 'opacity-100 scale-100'
                  : 'opacity-30 scale-90'
              }`}
              aria-label={
                collected
                  ? `${shard.name} — collected`
                  : `${shard.name} — not yet found`
              }
            >
              <div
                className={`w-16 h-16 rounded-lg flex items-center justify-center transition-colors duration-500 ${
                  collected
                    ? `${shard.color} shadow-md animate-pulse-glow`
                    : 'bg-ink/10'
                }`}
              >
                <img
                  src={shard.image}
                  alt={shard.name}
                  className="w-14 h-14 object-contain"
                  style={{ imageRendering: 'pixelated' }}
                />
              </div>
              <span className="text-[10px] text-gold/60 mt-1">
                {shard.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
