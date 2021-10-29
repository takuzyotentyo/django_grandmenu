import json
#from channels.generic.websocket import WebsocketConsumer
from channels.generic.websocket import AsyncWebsocketConsumer
#from asgiref.sync import async_to_sync  # async_to_sync() : 非同期関数を同期的に実行する際に使用する。
from channels.db import database_sync_to_async
from django.core.serializers import serialize
from accounts.models import Store

USERNAME_SYSTEM = '*system*'
DEBUG_USER = 'TEST@USER.jp'

# ChatConsumerクラス: WebSocketからの受け取ったものを処理するクラス
class store_information( AsyncWebsocketConsumer ):

    # WebSocket接続時の処理
    async def connect(self):
        # ユーザー情報の取得 (Emailが取得できる) * どこでこの情報をセットしているのか不思議。Djangoのどの部分？時間があるときに調べたい
        self.UserEmail = self.scope["user"]
        print("【DEBUG LOG】　WebSocket Connct")
        header = ScopeHeaderParse(self.scope)
        if header.as_dict['origin'] == 'http://127.0.0.1:8080':
            # vueの開発環境時はTestUserを設定
            print("【DEBUG LOG】　(Vue Env) UserEmail is {}".format(DEBUG_USER))
            self.UserEmail = DEBUG_USER
        await self.accept()

    # WebSocket切断時の処理
    async def disconnect( self, close_code ):
        print("【DEBUG LOG】　WecSocket DisConnct!!")
        return

    async def receive( self, text_data ):
        json_data = json.loads( text_data )
        #? json_dataのjsonvalueにstore_idは要らない??
        print("【DEBUG LOG】json_data　{}".format(json_data))
        #TODO ここは文字列比較ではなくdefine値比較にしたいところ
        if(json_data["action"] == 'create'):
            print('create')
        elif(json_data["action"] == 'read'):
            store_information = await self.store_read(json_data)
        elif(json_data["action"] == 'update'):
            print("【DEBUG LOG】store_information update")
            store_information = await self.store_update(json_data)
        elif(json_data["action"] == 'delete'):
            print('delete')
        else:
            return
        store_information = json.dumps(store_information)
        await self.send( store_information )

    @database_sync_to_async
    def store_update(self, json_data):
        store_id = json_data.get('store_id')
        store_name = json_data.get('store_name')
        seating_capacity = json_data.get('seating_capacity')
        takeout_support = json_data.get('takeout_support')
        raw_store_data = Store.objects.filter(store_id = store_id)
        raw_store_data.update(store_name = store_name, seating_capacity = seating_capacity, takeout_support = takeout_support)
        raw_store_data = serialize('json', (raw_store_data))
        raw_store_data = json.loads(raw_store_data)
        store_information = self.store_information_query_to_json(raw_store_data)
        return store_information

    @database_sync_to_async
    def store_read(self, json_data):
        if self.UserEmail == DEBUG_USER:
            # vueの開発環境時はダミーデータのセット
            #! とりあえず店舗名DB保存処理を入れるまでは店名をEmailで表示する
            store_data_json = {
                'store_id': 1234,
                'store_name': DEBUG_USER,
                'seating_capacity': 1,
                'takeout_support': False,
            }
        else:
            store_data = Store.objects.filter(email=self.UserEmail).first()

            #! とりあえず店舗名DB保存処理を入れるまでは店名をEmailで表示する
            store_data_json = {
                'store_id': store_data.id,
                'store_name': store_data.email,
                'seating_capacity': 1,
                'takeout_support': False,
            }
        print("【DEBUG LOG】store_data_json = {}".format(store_data_json))
        return store_data_json


# Scopeパースクラス: httpのHeader情報解析用
class ScopeHeaderParse:
    def __init__(self, scope):
        self._scope = scope

    # キーのみを取得 あまり使用しないと思うが一応
    @property
    def only_keys(self):
        return [header[0].decode() for header in self._scope["headers"]]

    # 辞書として取得
    @property
    def as_dict(self):
        return {header[0].decode(): header[1].decode() for header in self._scope["headers"]}

