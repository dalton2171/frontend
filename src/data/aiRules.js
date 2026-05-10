export const bannedWords = [
  "hack",
  "spam",
  "attack",
  "malware",
  "phishing",
  "scam",
  "exploit",
  "virus",
  "ddos",
];

export const calculateThreat = (message) => {
  let score = 0;

  bannedWords.forEach((word) => {
    if (
      message.toLowerCase().includes(word)
    ) {
      score += 15;
    }
  });

  if (message.includes("http")) {
    score += 20;
  }

  if (message.length > 400) {
    score += 10;
  }

  return score;
};