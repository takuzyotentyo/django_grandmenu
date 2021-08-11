from django.urls import path

from . import consumers, store_information

websocket_urlpatterns = [
    path( 'ws/chat/', consumers.ChatConsumer.as_asgi() ),
    path( 'ws/store_information/', store_information.store_information.as_asgi() ),
    # path( 'store_information_create/', store_information.StoreInformation_create.as_asgi() ),
    # path( 'store_information_read/', store_information.StoreInformation_read.as_asgi() ),
    # path( 'store_information_update/', store_information.StoreInformation_update.as_asgi() ),
    # path( 'store_information_delete', store_information.StoreInformation_delete.as_asgi() ),
]
