const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    host: '0.0.0.0',
    port: 8080, // 你可以根据需要更改端口
    allowedHosts: 'all', // 允许所有主机名
    client: {
      webSocketURL: 'ws://0.0.0.0:8080/ws'
    }
  }
});