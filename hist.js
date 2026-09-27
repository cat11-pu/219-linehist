// hist.js：直方图（下标是行长，值是该行长的行数）
import { widthOf } from "./measure.js";

export function lineHistogram(lines) {
  if (!Array.isArray(lines) || lines.length === 0) {
    const error = new Error("no lines to histogram");
    error.code = "E_NO_LINES";
    throw error;
  }
  // 单次扫描：每行只量一次，同时记下最长行
  const widths = new Array(lines.length);
  let widest = 0;
  for (let index = 0; index < lines.length; index += 1) {
    const width = widthOf(lines[index]);
    widths[index] = width;
    if (width > widest) widest = width;
  }
  // 直方图长度必须覆盖到最长行（长度 = widest + 1），空行计入下标零
  const histogram = new Array(widest + 1).fill(0);
  let total = 0;
  for (let index = 0; index < widths.length; index += 1) {
    histogram[widths[index]] += 1;
    total += widths[index];
  }
  return { histogram: histogram, widest: widest, total_chars: total };
}
