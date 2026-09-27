// hist.js：直方图（基线：一律给空表）
import { widthOf } from "./measure.js";

export function lineHistogram(lines) {
  if (!lines || lines.length === 0) {
    const error = new Error("no lines to measure");
    error.code = "E_NO_LINES";
    throw error;
  }
  const histogram = [];
  let widest = 0;
  let total_chars = 0;
  for (const line of lines) {
    const width = widthOf(line);
    histogram[width] = (histogram[width] || 0) + 1;
    total_chars += width;
    if (width > widest) {
      widest = width;
    }
  }
  for (let size = 0; size <= widest; size += 1) {
    if (!histogram[size]) {
      histogram[size] = 0;
    }
  }
  return { histogram: histogram, widest: widest, total_chars: total_chars };
}
