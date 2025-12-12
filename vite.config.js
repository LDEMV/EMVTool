import { defineConfig } from 'vite'

// 从环境变量获取仓库名，如果没有则默认为 '/'
const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1] || ''

export default defineConfig({
  // 如果在 GitHub Actions 中构建，则使用仓库名作为 base
  base: process.env.GITHUB_ACTIONS ? `/${repoName}/` : './',
  server: {
    port: 3000
  },
  build: {
    outDir: 'dist'
  }
})