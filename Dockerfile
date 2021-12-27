# python:3.7.10の公式 image をベースの image として設定
FROM python:3.7.10

# 作業ディレクトリの設定
WORKDIR /code

# 必要ファイルの配置
ADD ./src/requirements.txt /code

# 環境アップデート
RUN apt-get update && \
    apt-get -y install locales vim less && \
    pip3 install -r requirements.txt

ENV PYTHONUNBUFFERED    1

