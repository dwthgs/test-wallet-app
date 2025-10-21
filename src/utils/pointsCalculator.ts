export function calculateDailyPoints(date: Date = new Date()): number {
  const year = date.getFullYear();

  // Define season start dates
  const seasons = [
    { name: 'winter', start: new Date(year, 11, 1) }, // December 1
    { name: 'spring', start: new Date(year, 2, 1) },  // March 1
    { name: 'summer', start: new Date(year, 5, 1) },  // June 1
    { name: 'autumn', start: new Date(year, 8, 1) },  // September 1
  ];

  // Find current season
  let currentSeason = seasons[0]; // default to winter
  for (const season of seasons) {
    if (date >= season.start) {
      currentSeason = season;
    }
  }

  // Calculate day of season
  const seasonStart = currentSeason.start;
  const dayOfSeason = Math.floor((date.getTime() - seasonStart.getTime()) / (1000 * 60 * 60 * 24)) + 1;

  // Calculate points based on the algorithm
  if (dayOfSeason === 1) {
    return 2;
  } else if (dayOfSeason === 2) {
    return 3;
  } else {
    // For day 3 and beyond: 100% of points from day before previous + 60% of points from previous day
    const points = [2, 3]; // Day 1 and Day 2 points
    
    for (let i = 3; i <= dayOfSeason; i++) {
      const newPoints = points[i - 3] + (points[i - 2] * 0.6);
      points.push(newPoints);
    }
    
    return Math.round(points[dayOfSeason - 1]);
  }
}

export function formatPoints(points: number): string {
  if (points >= 1000) {
    return Math.round(points / 1000) + 'K';
  }
  return points.toString();
}