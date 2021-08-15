from django import forms
from django.contrib.auth.forms import ReadOnlyPasswordHashField
from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError



Store = get_user_model()

class UserCreationForm(forms.ModelForm):
    '''Storeを作成する際のform情報'''
    password = forms.CharField(label='password', widget=forms.PasswordInput)
    confirm_password = forms.CharField(label='password (確認用)', widget=forms.PasswordInput)

    class Meta:
        model = Store
        fields = ('store_name', 'email', 'password')

    def clean(self):
        cleaned_data = super().clean()
        password = cleaned_data.get('password')
        confirm_password = cleaned_data.get('confirm_password')

        if password != confirm_password:
            raise ValidationError('パスワードが一致しません')

    def save(self, commit=False):
        storeuser = super().save(commit=False)
        storeuser.set_password(self.cleaned_data.get('password'))
        storeuser.save()
        return storeuser

class UserChangeForm(forms.ModelForm):
    '''Storeを編集する際のform情報'''
    password = ReadOnlyPasswordHashField()
    store_url = forms.CharField(required=False, label='ストアコード(ここはまだ形式未定)')
    store_telnum = forms.IntegerField(required=False, label='電話番号')
    store_postal_code = forms.IntegerField(required=False, label='郵便番号')
    store_address1 = forms.CharField(required=False, label='住所１')
    store_address2 = forms.CharField(required=False, label='住所２')
    store_address3 = forms.CharField(required=False, label='住所３')
    store_address4 = forms.CharField(required=False, label='住所４')
    store_name = forms.CharField(required=False, label='店名')
    store_kind = forms.CharField(required=False, label='店種別')
    seating_capacity = forms.IntegerField(required=False, label='席数')
    takeout_support = forms.BooleanField(required=False, label='テイクアウト有無')


    class Meta:
        model = Store
        fields = '__all__'
        # fields = ('email', 'store_url', 'store_postal_code', 'is_staff', 'is_active', 'is_superuser', 'store_address1', 'store_address2', 'store_address3', 'store_address4', 'store_kind', 'seating_capacity', 'takeout_support')

    '''admin画面に非表示にしているためとりあえず必要なし'''
    # def clean_password(self):
    #     # すでに登録されているパスワードを返す(変更できないように)
    #     return self.initial['password']
