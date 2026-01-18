export const normalizeScore = (value: number, betterIs: "higher" | "lower") => {
  return betterIs === "higher" ? value : 100 - value;
};
