# vue3-koa

一个集成了前后端的项目。用于学习 vue3 & koa 。

</br>

前端：

vue3 + vite2 + [ant-design-vue 2.0](https://2x.antdv.com/docs/vue/introduce-cn/) + vue-router 4.0 + vuex

</br>

服务端：

koa2+mongodb

</br>

项目执行步骤：

1. 安装依赖
yarn
2. 打包
yarn build
3. 执行
node app.js
4. 访问正式环境：<http://localhost:3000/#/>
5. 再执行 yarn dev，进入开发环境

服务端所用到的包：

- koa
- koa-router
- koa-jwt
- koa-router
- koa-static
- koa-bodyparser
- mongoose
- koa-json

## TODO

### 管理页面

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1fae762bbdb245a88ce9cd7b74f03e11~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp?)

- [ ] 条件查询
- [x] 数据导入
- [x] 封面图上传（转换为Base64）

### 前台页面

![](https://codeniu-picbed.oss-cn-hangzhou.aliyuncs.com/picbed/20230530113509.png)

- [ ] 数据懒加载
- [ ] 评分功能
- [x] 分类查询

### Feature

- [ ] TS 重构

### 密码

123

md5加密后

202cb962ac59075b964b07152d234b70

## 部署

### Linux

```shell
node app.js
```

访问

hostname:3308/niu-box

### docker

进入到项目目录执行：

```shell
docker build . -t codeniu/niu-box

docker run -p 3308:3000 -d codeniu/niu-box
```

访问

hostname:3308/niu-box
