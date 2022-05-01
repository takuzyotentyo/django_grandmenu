# セットアップメモ
DBの再構築等を行う場合は以下を実行

```cd src/mysite```

```sh db_setting.sh ```


# Dockerメモ

## Docker環境構築 (ビルド)
```docker-compose build```

## Dockerコンテナ起動
```docker-compose up -d```

## Dockerコンテナへbashでログイン
django環境へログイン
```docker exec -it django-container /bin/bash```

vue環境へログイン
```docker exec -it vue-container /bin/bash```


## Dockerコンテナログ確認
```docker logs -f django-container```

```docker logs -f vue-container```


ログはバッファリングされていそうなので反映が少し遅れる。

ソース編集（Vscode等)でcommand + s 連打してソース反映を行い続けるとバッファリングから随時吐き出される。