# 山水洲城 · 长沙漫游志

一本以个人摄影为主体的 11 页静态电子杂志，包含封面、目录、橘子洲头、国金中心、杜甫江阁、湖南博物院及跋。

## 查看

直接用浏览器打开根目录 `index.html`。无需安装依赖或构建；正式页面完全使用系统字体，不请求外部字体。翻页采用约 1.15 秒的上下方向揭页：旧页缩退，新页展开，图片缓慢推近后归位，文字错开入场。整次切换约 1.5 秒内不接受重复翻页，停稳后标题再轻微缓动一次。发布到静态网站时，保留以下目录关系并上传展示图片和音乐。

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

每次仅显示完整一页。一次有效滚轮或触控板手势直接切换到相邻一页，惯性事件不重复翻页；手机一次上下滑动也直接切换一页，不需要先滚到页面边界。按 ↑ / ↓、PageUp / PageDown 每次翻一页，按住按键不会连续跳页。目录按钮可直接跳转章节，音乐按钮控制播放（点击前不预加载音频）。

桌面右侧导航可用 Tab 聚焦，Enter / 空格跳转，方向键切换页面，Home / End 到首尾页。页面使用紧凑的响应式排版，空间不足时适度缩放整页，以完整展示内容。

鼠标覆盖汉字时，字形轻微抬升、倾斜和缩放；按钮随鼠标位置轻微倾斜，照片随鼠标小幅移动。移开后恢复。系统开启“减少动态效果”时关闭翻页、文字与鼠标变形动画。

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
