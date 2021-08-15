from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth import get_user_model
from .forms import UserChangeForm, UserCreationForm

Store = get_user_model()

class CustomizeStoreAdmin(UserAdmin):
    '''Storeモデルの管理画面クラス'''
    form = UserChangeForm # ユーザー編集画面で使うform
    add_form = UserCreationForm # ユーザー作成画面で使うform
    ordering = ('email',)   # 本来はusernameが必須だがemail優先にするため

    # 一覧画面で表示する要素
    list_display = ('email', 'store_name', 'takeout_support', 'seating_capacity', 'store_telnum', 'store_postal_code', 'store_address1', 'store_address2', 'store_address3', 'store_address4', 'store_kind', 'store_url', 'date_joined', 'last_login')

    # ユーザー編集画面で表示する要素
    fieldsets = (
        ('ユーザー情報', {'fields': ('email', 'store_name', 'takeout_support', 'seating_capacity', 'store_telnum', 'store_postal_code', 'store_address1', 'store_address2', 'store_address3', 'store_address4', 'store_kind', 'store_url')}),
        ('パーミッション', {'fields': ('is_active', 'is_staff', 'is_superuser')}),
    )
    # ユーザー作成画面で入力する要素
    add_fieldsets = (
        ('ユーザー情報', {
            'fields': ('email', 'store_name', 'password', 'confirm_password')
        }),
    )

admin.site.register(Store, CustomizeStoreAdmin)
