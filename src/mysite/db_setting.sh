#!/bin/sh
# https://qiita.com/acecrc/items/5e1368af4277daccaf63
[ -e db.sqlite3 ] && rm db.sqlite3
[ -e ./grandmenu_spa/migrations ] && rm -r ./grandmenu_spa/migrations

python3 manage.py makemigrations grandmenu_spa
python3 manage.py migrate
python3 manage.py loaddata grandmenu_spa/fixture/prefecture.json