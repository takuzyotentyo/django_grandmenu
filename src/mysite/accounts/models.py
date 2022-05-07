from django.db import models
from django.core.mail import send_mail
from django.contrib.auth.models import PermissionsMixin, BaseUserManager, AbstractBaseUser
from django.db.models.fields import BLANK_CHOICE_DASH, BooleanField
from django.utils import timezone
from django.utils.timezone import localtime


class StoreUserManager(BaseUserManager):
    '''createuser/createsuperuser時に作成するモデル設定クラス'''

    def create_user(self, email, password=None):
        '''createuser'''
        if not email:
            raise ValueError("Enter Email!! (Eメールを入力してください)")
        storeuser = self.model(
            email=email
        )
        storeuser.set_password(password)
        storeuser.is_active = True   # コンソールから作成した場合は本登録まで完了
        storeuser.save(using=self._db)

    def create_superuser(self, email, password=None):
        '''createsuperuser'''
        storeuser = self.model(
            email=email
        )
        storeuser.set_password(password)
        storeuser.is_staff = True
        storeuser.is_active = True
        storeuser.is_superuser = True
        storeuser.save(using=self._db)

        return storeuser





class Store(AbstractBaseUser, PermissionsMixin):
    '''店舗情報管理クラス'''
    email = models.EmailField(max_length=255, unique=True)
    is_active = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    date_joined = models.DateTimeField(default=timezone.now)
    # 以下カスタム追加レコード
    store_name = models.CharField(max_length=100)
    store_url = models.CharField(max_length=255)
    store_telnum = models.IntegerField(null=True, verbose_name='電話番号')
    store_postal_code = models.CharField(max_length=8, null=True)
    store_address1 = models.CharField(max_length=100)
    store_address2 = models.CharField(max_length=100)
    store_address3 = models.CharField(max_length=100)
    store_address4 = models.CharField(max_length=100)
    store_address5 = models.CharField(null=True, max_length=100)
    store_kind = models.CharField(max_length=50)
    seating_capacity = models.IntegerField(default=1)
    takeout_support = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'        # このテーブルのレコードを一意に識別
    # REQUIRED_FIELDS = ['username']  # スーパーユーザー作成時に必要 (emailとパスワードは必須なのでそれ以外を指定)

    objects = StoreUserManager()

    def email_user(self, subject, message, from_email=None, **kwargs):
        """仮登録ユーザーへのEメール 送信"""
        send_mail(subject, message, from_email, [self.email], **kwargs)

    class Meta:
        verbose_name = '店舗情報'
        verbose_name_plural = '店舗情報'

    def __str__(self):
        return self.email
