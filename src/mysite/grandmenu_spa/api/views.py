from email.header import Header
from grandmenu_spa.store_information import ScopeHeaderParse
from rest_framework import generics
from accounts.models import Store
from grandmenu_spa.api.serializers import StoreSerealizer



# class StoreInformation(generics.RetrieveAPIView):

#     queryset = Store.objects.all()
#     serializer_class = StoreSerealizer


# RetrieveAPIViewにすることで、ログインユーザー以外のpkを返さない 404となる
class StoreInformation(generics.ListAPIView):
# class StoreInformation(generics.RetrieveAPIView):

    # queryset = Store.objects.all()
    serializer_class = StoreSerealizer

    def get_queryset(self):
        """
        This view should return a list of all the purchases
        for the currently authenticated user.
        """

        # どんな情報が入っているか確認
        # print(self.request.META)
        # print(self.request.headers)

        header = self.request.headers
        if 'Origin' in header and ( header['Origin'] == 'http://127.0.0.1:8080' or header['Origin'] == 'http://localhost:8080'
                                    or header['Origin'] == 'http://127.0.0.1:9080' or header['Origin'] == 'http://localhost:9080' ):
            # vueでデバッグ時はこっちを通る
            # データの取り出しを有効にするにはDBにこのユーザーのデータを作成しておく必要がある。
            user = "test@test.jp"
        else:
            # 通常はこちらを通る
            # E-mailが格納される
            user = self.request.user

        return Store.objects.filter(email=user)

class UpdateStoreInformation(generics.RetrieveUpdateAPIView):
    serializer_class = StoreSerealizer
    # queryset = Store.objects.all()

    def get_queryset(self):
        """
        This view should return a list of all the purchases
        for the currently authenticated user.
        """

        header = self.request.headers
        if 'Origin' in header and ( header['Origin'] == 'http://127.0.0.1:8080' or header['Origin'] == 'http://localhost:8080'
                                    or header['Origin'] == 'http://127.0.0.1:9080' or header['Origin'] == 'http://localhost:9080' ):
            # vueでデバッグ時はこっちを通る
            # データの取り出しを有効にするにはDBにこのユーザーのデータを作成しておく必要がある。
            user = "test@test.jp"
        else:
            # 通常はこちらを通る
            # E-mailが格納される
            user = self.request.user

        return Store.objects.filter(email=user)