# node:16.14.2の公式 image をベースの image として設定
FROM node:16.14.2

# 作業ディレクトリの設定
WORKDIR /code/vue3

ADD ./src/vue3/package.json /code/vue3

RUN npm install -g @vue/cli && \
    npm install

ENV LANG C.UTF-8
ENV LANGUAGE en_US
