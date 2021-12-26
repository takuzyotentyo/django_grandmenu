# Dockerメモ

## Docker環境構築 (ビルド)
```docker-compose build```

## Dockerコンテナ起動
```docker-compose up -d```

## Dockerコンテナへbashでログイン
```docker exec -it django-cont /bin/bash```

## Dockerコンテナログ確認
```docker logs -f django-cont```

ログはバッファリングされていそうなので反映が少し遅れる。

ソース編集（Vscode等)でcommand + s 連打してソース反映を行い続けるとバッファリングから随時吐き出される。