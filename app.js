// app.js：渲染结果
import { widthOf } from "./measure.js";
import { lineHistogram } from "./hist.js";

export function render(spec) {
  const lines = spec.lines || [];
  const view = lineHistogram(lines);
  const histogram = view.histogram || [];
  return { histogram: histogram, widest: view.widest || 0, total_chars: view.total_chars || 0,
           count: lines.length,
           kinds: histogram.filter((item) => item > 0).length,
           checked: lines.every((line) => widthOf(line) >= 0),
           tail: widthOf("abc") };
}
