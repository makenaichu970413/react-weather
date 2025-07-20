//? Module

export function FormatCelsius(value: number | null): number | null {
  if (!value && value != 0) return null;
  const temp = value - 273.15;
  return parseFloat(temp.toFixed(2));
}
