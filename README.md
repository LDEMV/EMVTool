# EMV Tool

一个纯前端的EMV工具。

## 简介

这是一个基于Web的纯前端EMV工具，用于处理和分析EMV相关的数据。

## 功能特点

- 纯前端实现，无需后端服务
- 可直接在浏览器中使用
- 支持部署到GitHub Pages

## 部署到GitHub Pages

有两种方式可以部署到 GitHub Pages：

### 手动部署

1. 将代码推送到GitHub仓库
2. 在仓库设置中启用GitHub Pages
3. 选择适当的分支（通常是main或gh-pages）

### 自动部署

项目已配置 GitHub Actions 实现自动部署，每当有代码推送到 develop 分支时会自动构建并部署到 gh-pages 分支。

1. Fork 或推送此项目到你的 GitHub 仓库
2. 在仓库设置中启用GitHub Pages，源选择 gh-pages 分支
3. （可选）如果你想要使用自定义域名，在 `.github/workflows/deploy.yml` 文件中设置 `cname` 参数

## 本地预览

由于项目是纯前端应用，可以直接通过浏览器打开 `index.html` 文件进行预览。

如果你想使用开发服务器，需要先安装 [Node.js](https://nodejs.org/)：

1. 安装依赖: `npm install`
2. 启动开发服务器: `npm run dev`
3. 构建生产版本: `npm run build`

## 使用说明

目前项目处于初始阶段，仅包含基础的Hello World界面。