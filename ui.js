// ui.js：操作面板与视图（原生 DOM，无弹窗）
import { render } from "./app.js";

export function mount(spec, parts) {
  parts.log.textContent = "行数 " + (spec.lines || []).length + "，点按钮算行长直方图。";

  function draw() {
    let view = null;
    try {
      view = render(spec);
    } catch (error) {
      parts.out.textContent = String(error && error.code ? error.code : error);
      parts.log.textContent = "跑不动：" + String(error && error.message ? error.message : error);
      return;
    }
    parts.out.textContent = JSON.stringify(view, null, 1);
    parts.stage.textContent = "";
    view.histogram.forEach(function (count, size) {
      const row = document.createElement("div");
      row.className = "row";
      const head = document.createElement("span");
      head.textContent = size + " 个字符";
      row.appendChild(head);
      const bar = document.createElement("span");
      bar.className = "bar";
      const fill = document.createElement("i");
      fill.style.width = Math.min(100, count * 25) + "%";
      bar.appendChild(fill);
      row.appendChild(bar);
      const mark = document.createElement("span");
      mark.className = "chip" + (count > 0 ? " ok" : "");
      mark.textContent = count + " 行";
      row.appendChild(mark);
      parts.stage.appendChild(row);
    });
    parts.legend.textContent = "行数 " + view.count + "，最宽 " + view.widest + "，总字符 " + view.total_chars;
    parts.log.textContent = "是否逐行计过 " + view.checked;
  }

  const runButton = document.createElement("button");
  runButton.className = "primary";
  runButton.textContent = "算直方图";
  runButton.addEventListener("click", draw);
  parts.controls.appendChild(runButton);

  const addButton = document.createElement("button");
  addButton.textContent = "追加一行";
  addButton.addEventListener("click", function () {
    spec.lines = (spec.lines || []).concat(["abcde"]);
    draw();
  });
  parts.controls.appendChild(addButton);

  const dropButton = document.createElement("button");
  dropButton.textContent = "去掉最后一行";
  dropButton.addEventListener("click", function () {
    spec.lines = (spec.lines || []).slice(0, -1);
    draw();
  });
  parts.controls.appendChild(dropButton);

  const label = document.createElement("label");
  label.textContent = "试一行";
  parts.controls.appendChild(label);

  const box = document.createElement("input");
  box.type = "text";
  box.value = "abcd";
  box.addEventListener("input", function () {
    try {
      const view = render(Object.assign({}, spec, { lines: (spec.lines || []).concat([box.value]) }));
      parts.out.textContent = "加入后长度 " + box.value.length + " 的行有 " + view.histogram[box.value.length] + " 行";
    } catch (error) {
      parts.out.textContent = String(error && error.code ? error.code : error);
    }
  });
  parts.controls.appendChild(box);

  const readButton = document.createElement("button");
  readButton.textContent = "只看最宽行";
  readButton.addEventListener("click", function () {
    const view = render(spec);
    parts.out.textContent = "最宽 " + view.widest + "，行数 " + view.count;
  });
  parts.controls.appendChild(readButton);

  draw();
}
