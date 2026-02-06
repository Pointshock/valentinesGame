/** Resolves public asset path with Vite base URL (for GitHub Pages subpath). */
export function asset(path: string): string {
  const base = import.meta.env.BASE_URL;
  return base + path.replace(/^\//, '');
}

export function interpolate(
  template: string,
  vars: Record<string, string>,
): string {
  return template.replace(
    /\{(\w+)\}/g,
    (_, key: string) => vars[key] ?? `{${key}}`,
  );
}

export function rollD20(): number {
  return Math.floor(Math.random() * 20) + 1;
}

export function getRollTier(roll: number): 'low' | 'mid' | 'high' {
  if (roll <= 8) return 'low';
  if (roll <= 14) return 'mid';
  return 'high';
}

export function countShards(inventory: {
  petal: boolean;
  ribbon: boolean;
  candle: boolean;
}): number {
  return [inventory.petal, inventory.ribbon, inventory.candle].filter(Boolean)
    .length;
}
