/* ==========================================================
   COMPORTAMENTOS — demos interativas
   ========================================================== */

/* ---- Colapso de margins ---- */
(function () {
  const box1 = document.getElementById('collapse-box-1');
  const box2 = document.getElementById('collapse-box-2');
  const range1 = document.getElementById('collapse-range-1');
  const range2 = document.getElementById('collapse-range-2');
  const val1 = document.getElementById('collapse-val-1');
  const val2 = document.getElementById('collapse-val-2');
  const gapOut = document.getElementById('collapse-gap');
  const noteOut = document.getElementById('collapse-note');

  if (!box1) return;

  function render() {
    const m1 = Number(range1.value);
    const m2 = Number(range2.value);

    box1.style.marginBottom = m1 + 'px';
    box2.style.marginTop = m2 + 'px';
    val1.textContent = m1 + 'px';
    val2.textContent = m2 + 'px';

    // mede o espaço real entre as caixas (o navegador já aplicou o colapso)
    const rect1 = box1.getBoundingClientRect();
    const rect2 = box2.getBoundingClientRect();
    const gap = Math.round(rect2.top - rect1.bottom);
    gapOut.textContent = gap + 'px';

    const soma = m1 + m2;
    noteOut.textContent = soma !== gap
      ? `(a soma seria ${soma}px — o navegador ficou só com a maior margin)`
      : '';
  }

  range1.addEventListener('input', render);
  range2.addEventListener('input', render);
  render();
})();

/* ---- Centraliza blocos ---- */
(function () {
  const box = document.getElementById('center-box');
  const range = document.getElementById('center-range');
  const val = document.getElementById('center-val');
  const code = document.getElementById('center-code');

  if (!box) return;

  function render() {
    const w = Number(range.value);
    box.style.width = w + 'px';
    val.textContent = w + 'px';
    code.textContent = `width: ${w}px; margin: 0 auto;`;
  }

  range.addEventListener('input', render);
  render();
})();

/* ---- Valores negativos ---- */
(function () {
  const box1 = document.getElementById('negative-box-1');
  const range = document.getElementById('negative-range');
  const val = document.getElementById('negative-val');

  if (!box1) return;

  function render() {
    const m = Number(range.value);
    box1.style.marginTop = m + 'px';
    val.textContent = m + 'px';
  }

  range.addEventListener('input', render);
  render();
})();

/* ---- Porcentagem relativa ---- */
(function () {
  const container = document.getElementById('percent-container');
  const range = document.getElementById('percent-container-range');
  const containerVal = document.getElementById('percent-container-val');
  const topVal = document.getElementById('percent-top-val');
  const leftVal = document.getElementById('percent-left-val');

  if (!container) return;

  function render() {
    const w = Number(range.value);
    container.style.width = w + 'px';
    containerVal.textContent = w + 'px';

    // margin-top e margin-left já estão definidos como 10% no CSS.
    // ambos são relativos à LARGURA do container — por isso os dois valores batem.
    const computed = Math.round(w * 0.10);
    topVal.textContent = computed + 'px';
    leftVal.textContent = computed + 'px';
  }

  range.addEventListener('input', render);
  render();
})();

/* ==========================================================
   PLAYGROUND — "Defina a margin dos elementos você mesmo"
   ========================================================== */
(function () {
  const preview = document.getElementById('pg-preview');
  if (!preview) return;

  const cards = {
    a: document.getElementById('pg-card-a'),
    b: document.getElementById('pg-card-b'),
    c: document.getElementById('pg-card-c'),
  };

  const state = {
    a: { top: 0, right: 0, bottom: 0, left: 0 },
    b: { top: 0, right: 0, bottom: 0, left: 0 },
    c: { top: 0, right: 0, bottom: 0, left: 0 },
  };

  let current = 'a';

  const tabs = document.querySelectorAll('.playground__tab');
  const sliders = {
    top: document.getElementById('pg-top'),
    right: document.getElementById('pg-right'),
    bottom: document.getElementById('pg-bottom'),
    left: document.getElementById('pg-left'),
  };
  const values = {
    top: document.getElementById('pg-top-val'),
    right: document.getElementById('pg-right-val'),
    bottom: document.getElementById('pg-bottom-val'),
    left: document.getElementById('pg-left-val'),
  };
  const resetBtn = document.getElementById('pg-reset');
  const outputLabel = document.getElementById('pg-output-label');
  const outputCode = document.getElementById('pg-output-code');

  function applyMarginToCard(key) {
    const m = state[key];
    cards[key].style.margin = `${m.top}px ${m.right}px ${m.bottom}px ${m.left}px`;
  }

  function render() {
    const m = state[current];

    sliders.top.value = m.top;
    sliders.right.value = m.right;
    sliders.bottom.value = m.bottom;
    sliders.left.value = m.left;

    values.top.textContent = m.top;
    values.right.textContent = m.right;
    values.bottom.textContent = m.bottom;
    values.left.textContent = m.left;

    applyMarginToCard(current);

    outputLabel.textContent = `CSS gerado — .cartao-${current}`;
    outputCode.textContent =
      `.cartao-${current} {\n` +
      `  margin: ${m.top}px ${m.right}px ${m.bottom}px ${m.left}px;\n` +
      `}`;
  }

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      current = tab.dataset.card;
      tabs.forEach((t) => t.classList.toggle('playground__tab--active', t === tab));
      render();
    });
  });

  Object.keys(sliders).forEach((side) => {
    sliders[side].addEventListener('input', () => {
      state[current][side] = Number(sliders[side].value);
      render();
    });
  });

  resetBtn.addEventListener('click', () => {
    state[current] = { top: 0, right: 0, bottom: 0, left: 0 };
    render();
  });

  // aplica os valores iniciais (todos 0) nos 3 cartões
  Object.keys(cards).forEach(applyMarginToCard);
  render();
})();