export const formatTotalTime = (times: string[]): string => {
  const totalMinutes: number = times.reduce((total: number, time: string) => {
    const [minutes, seconds]: number[] = time.split(":").map(Number);
    return total + minutes + seconds / 60;
  }, 0);

  const hours: number = Math.floor(totalMinutes / 60);
  const minutes: number = Math.round(totalMinutes % 60);

  if (hours === 0) {
    return `${minutes} minutes`;
  } else if (hours === 1) {
    return `${hours} hour ${minutes} minutes`;
  } else {
    return `${hours} hours ${minutes} minutes`;
  }
};

// Minutes:Seconds -> ms
export const formatTimeInMs = (time: string): number => {
  const [minutes, seconds]: number[] = time.split(":").map(Number);
  return minutes * 60 * 1000 + seconds * 1000;
};
