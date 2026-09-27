// hist.js：直方图（基线：一律给空表）
import { widthOf } from "./measure.js";

export function lineHistogram(lines) {
  return { histogram: [], widest: 0, total_chars: 0 };
}
