# 山水洲城 · 长沙漫游志

一本以个人摄影为主体的 11 页静态电子杂志，包含封面、目录、橘子洲头、国金中心、杜甫江阁、湖南博物院及跋。

## 查看

直接用浏览器打开根目录 `index.html`。无需安装依赖或构建；正式页面完全使用系统字体，不请求外部字体。文字立即显示，无入场等待。发布到静态网站时，保留以下目录关系并上传展示图片和音乐。

## 文件结构

```text
index.html                       正式展示入口（含样式与交互）
assets/images/                   展示用 WebP 图片（640 / 1600 最大边长两档）
杜甫江阁/                        封面及江阁照片
橘子洲头/                        橘子洲照片
国金大厦/                        IFS 照片
马王堆/                          湖南博物院照片
changsha-emagazine/
  壁上观-一棵小葱_张曦匀.mp3     背景音乐
  SOURCES.md                     图片对应关系
  render-mag.cjs                 杂志预览截图工具
  package.json                   截图工具依赖
  package-lock.json              依赖锁定文件
social-card-style-showcase/      保留的两套版式参考与截图工具
```

每次仅显示一页。一次滚轮或触控板手势（含惯性）最多翻一页；长内容先在本页滚动，到达边界后需再次滚动才能翻页。手机在页面边界上下滑动翻页。按 ↑ / ↓、PageUp / PageDown 翻页或分段阅读；按住按键不会连续跳页。目录按钮可直接跳转章节，音乐按钮控制播放（点击前不预加载音频）。

桌面右侧导航可用 Tab 聚焦，Enter / 空格跳转，方向键切换页面，Home / End 到首尾页。系统开启“减少动态效果”时关闭背景动画。小屏和浏览器缩放时，长内容在本页内滚动，不裁切。

正式页面使用 `assets/images/` 的压缩图片，根据屏幕选择尺寸；首屏优先加载封面，其余按页加载，并在当前图片解码完成后预取下一页首图。原始 JPG 保留在四个景点目录中，正式展示不依赖原图目录。

## 重新生成预览截图

以下命令在项目根目录运行。截图工具需要 Node.js 和本机 Edge 或 Chrome；依赖仅用于制作截图，正式展示不需要。

```powershell
npm ci --prefix changsha-emagazine
node changsha-emagazine/render-mag.cjs
```

截图生成到 `changsha-emagazine/shots/`，已通过 `.gitignore` 排除。截图工具会覆盖同名预览文件。

版式参考位于 `social-card-style-showcase/editorial-showcase.html` 和 `swiss-showcase.html`，可直接打开。其截图脚本可在安装上述依赖后运行：

```powershell
$env:NODE_PATH = (Resolve-Path changsha-emagazine/node_modules).Path
node social-card-style-showcase/render.cjs
```
