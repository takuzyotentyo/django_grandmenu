import json
#from channels.generic.websocket import WebsocketConsumer
from channels.generic.websocket import AsyncWebsocketConsumer
#from asgiref.sync import async_to_sync  # async_to_sync() : 非同期関数を同期的に実行する際に使用する。
from channels.db import database_sync_to_async
from .models import Store
from django.core.serializers import serialize

USERNAME_SYSTEM = '*system*'

# ChatConsumerクラス: WebSocketからの受け取ったものを処理するクラス
class store_information( AsyncWebsocketConsumer ):

    # WebSocket接続時の処理
    async def connect( self ):
        await self.accept()

    # WebSocket切断時の処理
    async def disconnect( self, close_code ):
        return

    async def receive( self, text_data ):
        json_data = json.loads( text_data )
        action = json_data.get( 'action' )
        if( 'create' == action ):
            print('create')
        elif( 'read' == action ):
            store_information = await self.store_read(json_data)
        elif( 'update' == action ):
            store_information = await self.store_update(json_data)
        elif( 'delete' == action ):
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
        store_id = json_data.get('store_id')
        raw_store_data = Store.objects.filter(store_id = store_id)
        raw_store_data = serialize('json', (raw_store_data))
        raw_store_data = json.loads(raw_store_data)
        store_information = self.store_information_query_to_json(raw_store_data)
        return store_information

    def store_information_query_to_json(self, raw_store_data):
        str_store_data = raw_store_data[0]['fields']
        store_id = raw_store_data[0]['pk']
        store_name = str_store_data['store_name']
        seating_capacity = str_store_data['seating_capacity']
        takeout_support = str_store_data['takeout_support']
        json_data = {
            'store_id': store_id,
            'store_name': store_name,
            'seating_capacity': seating_capacity,
            'takeout_support': takeout_support,
        }

        return json_data
         
        