const { defineConfig } = require('@vue/cli-service')

module.export = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,

  devServer: {

    port: 8081,
    // proxy: { //配置自动启动浏览器
    //         "/apis": {
    //             target: "localhost:8081",
    //             changeOrigin: true,
    //             // ws: true,//websocket支持
    //             //secure: false,
    //             pathRewrite: {
    //                 '^apis': '/'    //代理的路径
    //             },
    //           //   onProxyRes(proxyRes, req, res) {
    //           //       if(proxyRes.headers['set-cookie']) {
    //           //           proxyRes.headers['set-cookie'] = proxyRes.headers['set-cookie'].map(v => {
    //           //              // /coss/app是后端服务设置的上下文跟， 由于是本地所以需要添加一个代理/api（于proxy端口的代理是一样的）
    //           //               return v.replace('/coss/app', '/api/coss/app')
    //           //           })
    //           //       }
    //           //   }
    //         },
    //     },

proxyTable: {
'/api': {
  target: 'localhost:8081',  //代理的地址
  changeOrigin: true,           //是否跨域
  secure:false,
  pathRewrite: {
    '^/api': ''             //重定向
  }
}
},
  }
})