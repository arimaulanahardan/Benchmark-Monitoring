export function transformLevel(level: 0 | 1 | 2 | 3) {
  switch (level) {
    case 0:
      return "All Service Lose";
    case 1:
      return "1 Service Win";
    case 2:
      return "2 Service Win";
    case 3:
      return "All Service Win";
  }
}
