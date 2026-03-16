export function formatDuration(totalSeconds: number): string {
  if (!Number.isFinite(totalSeconds)) {
    throw new TypeError("Input must be a finite number");
  }

  const sign = totalSeconds < 0 ? "-" : "";
  let seconds = Math.abs(Math.floor(totalSeconds));

  const units = [
    { label: "d", value: 86400 },
    { label: "h", value: 3600 },
    { label: "m", value: 60 },
    { label: "s", value: 1 },
  ];

  const result: string[] = [];

  for (const unit of units) {
    const amount = Math.floor(seconds / unit.value);
    if (amount > 0) {
      result.push(`${amount}${unit.label}`);
      seconds -= amount * unit.value;
    }
  }

  return sign + (result.length ? result.join(" ") : "0s");
}
