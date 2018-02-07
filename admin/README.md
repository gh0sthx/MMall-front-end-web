
项目初始化步骤

1.安装nodejs环境,推荐使用v4.4.7
    下载地址 : https://nodejs.org/download/release/v4.4.7/

2.全局安装webpack v^1.15.0
    命令: (sudo) npm install -g webpack@^1.15.0

3.全局安装webpack-dev-server v^1.16.5
    命令: (sudo) npm install -g webpack-dev-server@^1.16.5

4.在慕课网上下载源码，解压缩

5.在项目根目录执行npm初始化
    命令: npm install (--registry=https://registry.npm.taobao.org)

6.启动项目
    开发模式: npm run dev (windows系统上为npm run dev_win)
    生产模式: npm run dist (windows系统上为npm run dist_win)

7.开发模式下预览项目
    访问：http://localhost:8086/dist/view/index.html