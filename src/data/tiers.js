export const tiers = [
  {
    name: "Tourist",
    range: [0, 20],
    description: "You've heard of ETHMumbai, but have you tried the Vada Pav?",
    color: "from-gray-400 to-gray-600",
    id: "tourist"
  },
  {
    name: "Enthusiast",
    range: [21, 40],
    description: "You follow the updates and maybe own some ENS names.",
    color: "from-blue-400 to-blue-600",
    id: "enthusiast"
  },
  {
    name: "Builder",
    range: [41, 60],
    description: "You're building something cool. Keep shipping!",
    color: "from-green-400 to-green-600",
    id: "builder"
  },
  {
    name: "Core Contributor",
    range: [61, 80],
    description: "Deep in the ecosystem. You check Etherscan for fun.",
    color: "from-purple-400 to-purple-600",
    id: "contributor"
  },
  {
    name: "Maxi God",
    range: [81, 100],
    description: "You ARE ETHMumbai. A living legend.",
    color: "from-orange-400 to-pink-600", // Mumbai sunset / ETH colors
    id: "maxi"
  }
];

export const getTier = (percentage) => {
  return tiers.find(t => percentage >= t.range[0] && percentage <= t.range[1]) || tiers[0];
};
