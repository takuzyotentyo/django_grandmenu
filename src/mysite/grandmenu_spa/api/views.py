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
        # E-mailが格納される
        user = self.request.user

        return Store.objects.filter(email=user)