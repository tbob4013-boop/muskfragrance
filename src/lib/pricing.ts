export type BottleSize = 35 | 50 | 100;

export const PRICES: Record<BottleSize, number> = {
  35: 350,
  50: 450,
  100: 600,
};

export const priceForSize = (size: BottleSize): number => PRICES[size];