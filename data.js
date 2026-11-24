/**
 * 网站内容配置 v1.0.0 —— 改这个文件即可更新内容
 * 图片/视频放 assets/ 下，cover 留空会显示灰阶占位。
 * 视频 type："file" 本地 mp4 | "bilibili" BV 号 | "youtube" 视频 ID
 */
const SITE = {
  version: "1.0.0",
  name: "DELONG",
  role: "PRODUCT MANAGER & ENGINEER",
  headline: ["把想法做成东西，", "再把过程记录下来。"],
  intro: "我在产品与工程之间来回切换。这里收集了我做过的项目、拍下的影像，以及一路走来的几个节点。",
  tagline: "想清楚再动手，动手了就做完。",
  location: "中国",
  topics: "产品、工程、影像与好玩的东西",
  email: "hello@example.com",
  wechat: "your-wechat-id",
  socials: [
    { label: "GitHub", href: "https://github.com/yourname" },
    { label: "Bilibili", href: "https://space.bilibili.com/" },
  ],
  stats: [
    { value: 6, suffix: "年+", label: "产品 / 工程经验" },
    { value: 20, suffix: "+", label: "做过的项目" },
    { value: 1000, suffix: "+", label: "小时的拍摄素材" },
  ],
};

const JOURNEY = [
  { year: "2020", title: "从工程走向产品", desc: "写了几年代码后开始做产品，关心的不只是功能能不能实现，还有它为什么值得被做出来。", tags: ["工程", "产品"] },
  { year: "2023", title: "开始独立做小项目", desc: "周末做小工具、小程序，想到什么就先动手试试，慢慢积累了自己的一套方法。", tags: ["独立开发"] },
  { year: "2025", title: "拿起相机", desc: "开始用影像记录旅行与日常，也开始给自己的项目拍介绍视频。", tags: ["摄影", "剪辑"] },
  { year: "2026", title: "做这个网站", desc: "把这些年做过的东西整理到一个地方，也算给自己一个交代。", tags: ["v1.0.0"] },
];

const FACTS = [
  { title: "INTJ / 建筑师", label: "性格类型", detail: "喜欢先想清楚结构，再动手填细节。" },
  { title: "塞尔达 / 星露谷", label: "喜欢的游戏", detail: "开放世界与种田，两种极端的放松方式。" },
  { title: "后摇 / 爵士 / 民谣", label: "音乐偏好", detail: "写代码听后摇，剪片子听爵士。" },
  { title: "富士 X100 / 大疆", label: "常用器材", detail: "一台相机一支定焦，够用就好。" },
];

const PROJECTS = [
  {
    id: "task-flow",
    title: "TaskFlow 任务协作工具",
    year: "2026",
    tags: ["产品设计", "Web"],
    summary: "一个为小团队设计的轻量任务看板，强调「少即是多」。",
    cover: "",
    link: "https://example.com",
    content: [
      { type: "text", value: "## 背景\n小团队常用的项目管理工具功能过重，学习成本高。TaskFlow 只保留看板、截止日期与评论三项核心能力。" },
      { type: "image", src: "", caption: "看板主界面" },
      { type: "text", value: "## 我的工作\n负责需求调研、交互设计与前端实现。上线三个月内获得 2000+ 团队使用。" },
    ],
  },
  {
    id: "data-board",
    title: "运营数据看板",
    year: "2025",
    tags: ["数据", "可视化"],
    summary: "把分散在多个系统的指标整合到一屏，决策时间缩短 60%。",
    cover: "",
    content: [
      { type: "text", value: "## 问题\n运营同学每天需要打开 5 个后台拼凑数据。\n\n## 方案\n统一数据口径，设计分层看板：总览 → 渠道 → 单品。" },
      { type: "image", src: "", caption: "总览页" },
    ],
  },
  {
    id: "mini-app",
    title: "城市散步小程序",
    year: "2025",
    tags: ["小程序", "独立开发"],
    summary: "根据时间与心情推荐一条城市散步路线。",
    cover: "",
    content: [
      { type: "text", value: "一个周末做出来的小玩具，后来意外收获了不少用户。\n\n核心交互只有一步：选择你有多少时间。" },
      { type: "image", src: "", caption: "路线推荐页" },
    ],
  },
];

const VIDEOS = [
  { title: "京都 · 秋", year: "2026", duration: "03:24", desc: "用一台相机和一支定焦，记录京都的十一月。", type: "file", src: "", cover: "" },
  { title: "一个产品的诞生", year: "2025", duration: "08:10", desc: "从一张草图到上线，记录 TaskFlow 的 90 天。", type: "bilibili", src: "BV1GJ411x7h7", cover: "" },
  { title: "海边的清晨", year: "2025", duration: "01:45", desc: "早上五点的海，只有风和浪的声音。", type: "youtube", src: "", cover: "" },
];
