FROM node
#声明作者
MAINTAINER codeniu

# Create app directory
WORKDIR /usr/src/app

# 只是拷贝了 package.json 文件而非整个工作目录。这允许我们利用缓存 Docker 层的优势
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install --registry=https://registry.npm.taobao.org

# Bundle app source
COPY . .

#对外暴露的端口
EXPOSE 3000

#程序启动脚本
CMD ["npm", "start"]