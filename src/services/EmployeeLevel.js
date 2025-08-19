export const getEmployeeLevel = (num) => {
  const levels = [
    "Trainee", // 0
    "Junior",  // 1
    "Semi-Senior", // 2
    "Mid",     // 3
    "Senior",  // 4
    "Lead",    // 5
    "Manager", // 6
  ];

  const index = num % levels.length; // siempre entre 0 y 6

  return levels[index];
}
