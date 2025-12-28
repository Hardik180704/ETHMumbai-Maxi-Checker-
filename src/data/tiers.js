export const tiers = [
  {
    name: "Gateway Gazer",
    range: [0, 20],
    description: "You just landed at CST. Still figuring out if 'SoBo' is a token.",
    color: "from-gray-400 to-gray-600",
    id: "tourist"
  },
  {
    name: "Auto-Rickshaw Analyst",
    range: [21, 40],
    description: "You know the routes (roadmap), but the meter is always broken (gas fees).",
    color: "from-blue-400 to-blue-600",
    id: "enthusiast"
  },
  {
    name: "Vada Pav Visionary",
    range: [41, 60],
    description: "You're building the spicy stuff. Essential fuel for the ecosystem.",
    color: "from-green-400 to-green-600",
    id: "builder"
  },
  {
    name: "Local Train Legend",
    range: [61, 80],
    description: "You survive the volatility of Dadar station daily. Unshakeable.",
    color: "from-purple-400 to-purple-600",
    id: "contributor"
  },
  {
    name: "Web3 Dabbawala",
    range: [81, 100],
    description: "6 Sigma Precision. You deliver blocks perfectly, rain or shine.",
    color: "from-orange-400 to-pink-600", // Mumbai sunset / ETH colors
    id: "maxi"
  }
];

export const getTier = (percentage) => {
  return tiers.find(t => percentage >= t.range[0] && percentage <= t.range[1]) || tiers[0];
};
