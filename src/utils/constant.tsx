export const BUDGET_RANGES: Record<string, [number, number]> = {
    "₹5k - ₹1 Lac": [5000, 100000],
    "₹1 Lac - ₹10 Lac": [100000, 1000000],
    "₹10 Lac - ₹25 Lac": [1000000, 2500000],
    "₹25 Lac - ₹50 Lac": [2500000, 5000000],
    "₹50 Lac - ₹75 Lac": [5000000, 7500000],
    "₹75 Lac - ₹1 Cr": [7500000, 10000000],
    "₹1 Cr - ₹2 Cr": [10000000, 20000000],
    "₹2 Cr+": [20000000, Infinity],
  };

  export const SQUARE_FEET_RANGES: Record<string, [number, number]> = {
    "0-1000": [0, 1000],
    "1000-3000": [1000, 3000],
    "3000-4000": [3000, 4000],
    "4000+": [4000, Infinity],
  };
