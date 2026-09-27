// measure.js：量行长（按字符个数，空行给零）
export function widthOf(line) {
  if (typeof line !== "string") {
    const error = new Error("line must be a string");
    error.code = "E_BAD_LINE";
    throw error;
  }
  return line.length;
}
