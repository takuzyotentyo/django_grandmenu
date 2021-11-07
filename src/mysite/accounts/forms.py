from django import forms
from django.contrib.auth.forms import ReadOnlyPasswordHashField
from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError
from django.contrib.auth.forms import AuthenticationForm


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
    store_address5 = forms.CharField(required=False, label='住所5')
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

class LoginForm(AuthenticationForm):
    """ログインフォーム"""

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['username'].widget.attrs['class'] ='text_box'
        self.fields['username'].widget.attrs['placeholder'] ='登録メールアドレス'
        self.fields['password'].widget.attrs['class'] ='text_box'
        self.fields['password'].widget.attrs['placeholder'] ='パスワード'

class UserRegistrationForm(UserCreationForm):
    """ユーザー登録用フォーム"""

    class Meta:
        model = Store
        fields = ('email',)

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['email'].widget.attrs['class'] ='text_box'
        self.fields['email'].widget.attrs['placeholder'] ='登録メールアドレス'
        self.fields['password'].widget.attrs['class'] ='text_box'
        self.fields['password'].widget.attrs['placeholder'] ='パスワード'
        self.fields['confirm_password'].widget.attrs['class'] ='text_box'
        self.fields['confirm_password'].widget.attrs['placeholder'] ='パスワード(確認用)'

        # for field in self.fields.values():
        #     field.widget.attrs['class'] = 'form-control'

    def clean_email(self):
        email = self.cleaned_data['email']
        Store.objects.filter(email=email, is_active=False).delete()
        return email