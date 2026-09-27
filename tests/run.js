import assert from "node:assert";
import { widthOf } from "../measure.js";
import { lineHistogram } from "../hist.js";
import { render } from "../app.js";

let failed = 0;
function check(name, fn) {
  try { fn(); console.log("ok " + name); } catch (e) { failed += 1; console.log("FAIL " + name + " :: " + e.message); }
}

check("widthOf returns a number", () => {
  assert.strictEqual(typeof widthOf("abc"), "number");
});

check("lineHistogram returns a histogram", () => {
  assert.ok(Array.isArray(lineHistogram(["abc"]).histogram));
});

check("lineHistogram returns widest", () => {
  assert.strictEqual(typeof lineHistogram(["abc"]).widest, "number");
});

check("render counts lines", () => {
  assert.strictEqual(typeof render({ lines: ["abc"] }).count, "number");
});

check("render exposes checked flag", () => {
  assert.strictEqual(typeof render({ lines: ["abc"] }).checked, "boolean");
});

console.log("5 cases, " + failed + " failed");
process.exit(failed === 0 ? 0 : 1);
