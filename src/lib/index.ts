export function navigate(to: string) {
  window.location.href = to;
}

export function parseTime(time: number) {
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = time % 60;
  return `${hours > 0 ? `${hours}:` : ''}${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
}