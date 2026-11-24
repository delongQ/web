/* Portfolio v1.0.0 — 内容渲染 */
(function () {
  "use strict";

  const $ = (s) => document.querySelector(s);
  const esc = (s = "") =>
    String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const pad = (n) => String(n).padStart(2, "0");
  const tagList = (arr) => (arr || []).map((t) => `<span class="tag">${esc(t)}</span>`).join("");

  // 有图用图，没图显示灰阶占位
  function cover(src, label, note) {
    if (src) return `<img src="${esc(src)}" alt="${esc(label)}" loading="lazy" />`;
    return `<div class="ph"><span>${esc(note || "IMAGE")} · 待补充</span><b>${esc(label)}</b></div>`;
  }

  // 暴露给 interact.js 使用
  window.UI = { $, esc, pad, cover, tagList };

  /* ---------- 基本信息 ---------- */
  document.title = `${SITE.name} — ${SITE.role}`;
  $("#logo").textContent = SITE.name;
  $("#footerLogo").textContent = SITE.name;
  $("#footerTag").textContent = SITE.tagline;
  $("#heroRole").textContent = `${SITE.name} · ${SITE.role}`;
  $("#heroTitle").innerHTML = SITE.headline.map((l) => `<span class="line"><span>${esc(l)}</span></span>`).join("");
  $("#heroIntro").textContent = SITE.intro;
  $("#copyright").textContent = `© ${new Date().getFullYear()} ${SITE.name}`;
  $("#version").textContent = `v${SITE.version} · DESIGNED & BUILT BY ${SITE.name}`;

  $("#stats").innerHTML = SITE.stats
    .map((s) => `<div class="stat reveal"><b data-to="${+s.value}" data-suffix="${esc(s.suffix)}">0${esc(s.suffix)}</b><span>${esc(s.label)}</span></div>`)
    .join("");

  const words = [SITE.role, "PROJECTS", "FILMS", "PRODUCT", "ENGINEERING", "STORYTELLING"];
  const run = words.map((w) => `<span>${esc(w)}</span>`).join("");
  $("#marquee").innerHTML = run + run;

  /* ---------- 项目 ---------- */
  $("#projectList").innerHTML = PROJECTS.map(
    (p, i) => `
    <li class="project reveal" data-id="${esc(p.id)}" data-tags="${esc(p.tags.join("|"))}" data-cursor="VIEW">
      <span class="project__no">${pad(i + 1)}</span>
      <div>
        <h3 class="project__title">${esc(p.title)}</h3>
        <div class="tags">${tagList(p.tags)}</div>
      </div>
      <p class="project__summary">${esc(p.summary)}</p>
      <span class="project__year">${esc(p.year)}</span>
      <span class="project__go">↗</span>
    </li>`
  ).join("");

  const tags = ["全部", ...new Set(PROJECTS.flatMap((p) => p.tags))];
  $("#filters").innerHTML = tags
    .map((t, i) => `<button class="filter${i ? "" : " active"}" data-tag="${esc(t)}">${esc(t)}</button>`)
    .join("");

  /* ---------- 影像 ---------- */
  $("#videoList").innerHTML = VIDEOS.map(
    (v, i) => `
    <article class="video reveal" data-index="${i}" data-cursor="PLAY" style="transition-delay:${(i % 3) * 0.08}s">
      <div class="cover">
        ${cover(v.cover, v.title, "FILM")}
        <div class="play"><i>▶</i>${esc(v.duration || "")}</div>
      </div>
      <div class="video__meta mono"><span>${pad(i + 1)} / ${pad(VIDEOS.length)}</span><span>${esc(v.year)}</span></div>
      <h3 class="video__title">${esc(v.title)}</h3>
      <p class="video__desc">${esc(v.desc)}</p>
    </article>`
  ).join("");

  /* ---------- 经历 ---------- */
  $("#journey").innerHTML = JOURNEY.map(
    (j) => `
    <li class="reveal">
      <span class="journey__year">${esc(j.year)}</span>
      <div><h3>${esc(j.title)}</h3><div class="tags">${tagList(j.tags)}</div></div>
      <p>${esc(j.desc)}</p>
    </li>`
  ).join("");

  /* ---------- 小事 ---------- */
  $("#facts").innerHTML = FACTS.map(
    (f, i) => `
    <button class="fact reveal" aria-expanded="false">
      <span class="fact__row">
        <span class="fact__no">${pad(i + 1)}</span>
        <span class="fact__title">${esc(f.title)}</span>
        <span class="fact__label">${esc(f.label)}</span>
        <span class="fact__icon"></span>
      </span>
      <span class="fact__detail"><p>${esc(f.detail)}</p></span>
    </button>`
  ).join("");

  /* ---------- 联系 ---------- */
  const copyBtn = (v) => `<button class="copy" data-copy="${esc(v)}">COPY</button>`;
  const socials = SITE.socials.map((s) => `<a class="ul" href="${esc(s.href)}" target="_blank" rel="noopener">${esc(s.label)} ↗</a>`).join("");
  const rows = [
    ["目前生活在", esc(SITE.location)],
    ["可以聊聊", esc(SITE.topics)],
    ["邮箱", `<a class="ul" href="mailto:${esc(SITE.email)}">${esc(SITE.email)}</a>${copyBtn(SITE.email)}`],
    ["微信", `<span>${esc(SITE.wechat)}</span>${copyBtn(SITE.wechat)}`],
    ["社交", socials],
  ];
  $("#contactList").innerHTML = rows.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join("");
  $("#footerContact").innerHTML =
    `<a href="mailto:${esc(SITE.email)}">${esc(SITE.email)}</a><p>微信 ${esc(SITE.wechat)}</p>` +
    SITE.socials.map((s) => `<a href="${esc(s.href)}" target="_blank" rel="noopener">${esc(s.label)} ↗</a>`).join("");
})();
