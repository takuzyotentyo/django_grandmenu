# from _typeshed import IdentityFunction
from django.db import models
# from sqlalchemy.sql.operators import is_distinct_from

# Create your models here.

class Store(models.Model):
    store_id = models.AutoField(primary_key=True)
    store_name = models.CharField(max_length=255)
    seating_capacity = models.IntegerField(default=1)
    takeout_support = models.BooleanField(default=False)

    def __str__(self) -> str:
        return self.store_name

class Staff(models.Model):
    store = models.ForeignKey(Store, on_delete=models.CASCADE)
    staff_primary_id = models.AutoField(primary_key=True)
    staff_secondary_id = models.IntegerField()
    staff_name = models.CharField(max_length=255)
    e_mail = models.EmailField(unique=True)
    password = models.CharField(max_length=255)
    staff_class_id = models.IntegerField(default=1)
    staff_class = models.CharField(max_length=32, default='staff')

# メニューに関するデータベース設計
# primary_idはそのメニューを一意に定めるid
# secondary_idはそのメニューの表示順番を変更するために使用するid

class Class_1_Menu(models.Model):
    class_1_primary_id = models.AutoField(primary_key=True)
    class_1_secondary_id = models.IntegerField()
    class_1_name = models.CharField(max_length=16)

class Class_2_Menu(models.Model):
    store = models.ForeignKey(Store, on_delete=models.CASCADE)
    class_1_menu = models.ForeignKey(Class_1_Menu, on_delete=models.CASCADE)
    class_2_primary_id = models.AutoField(primary_key=True)
    class_2_secondary_id = models.IntegerField()
    class_2_name = models.CharField(max_length=16)

class Class_3_Menu(models.Model):
    class_2_menu = models.ForeignKey(Class_2_Menu, on_delete=models.CASCADE)
    class_3_primary_id = models.AutoField(primary_key=True)
    class_3_secondary_id = models.IntegerField()
    class_3_neme = models.CharField(max_length=16)
    class_3_price = models.CharField(max_length=8)
    class_4_has = models.BooleanField() #セットメニューがあるかどうか
    class_3_takeout = models.BooleanField() #メニューごとのテイクアウト対応

    def __str__(self) -> str:
        return self.class_3_neme

class Class_4_Menu(models.Model): #ドリンクセットなどのID
    class_4_primary_id = models.AutoField(primary_key=True)
    class_4_secondary_id = models.IntegerField()
    class_4_name = models.CharField(max_length=16)

class Class_5_Menu(models.Model): #コーラ・スプライトなどのセットメニューの中身
    class_4_menu = models.ForeignKey(Class_4_Menu, on_delete=models.CASCADE)
    class_5_primary_id = models.AutoField(primary_key=True)
    class_5_secondary_id = models.IntegerField()
    class_5_name = models.CharField(max_length=16)
    class_5_price = models.IntegerField(default=0)

class Class_3_to_Class4(models.Model):
    class_3_menu = models.ForeignKey(Class_3_Menu, on_delete=models.CASCADE)
    class_4_menu = models.ForeignKey(Class_4_Menu, on_delete=models.CASCADE)
    class_3_class_4_id_primary_id = models.AutoField(primary_key=True)
    class_3_class_4_id_secondary_id = models.IntegerField()



#     CLASS_2_ID = db.Column(Integer)    #中分類を示すクラス
#     CLASS_2 = db.Column(String(64))
#     CLASS_3_ID = db.Column(Integer)    #小分類を示すクラス
#     CLASS_3 = db.Column(String(64))
#     PRICE = db.Column(Integer)





# -----定義済み-----

# このファイルでで必要なモジュール
# from sqlalchemy import Column, Integer, String, DateTime

# from flask_login import LoginManager, UserMixin

#テーブル定義
# class Store(db.Model):
#     __tablename__ = 'stores'

#     STORE_ID = db.Column(Integer, primary_key=True) # ≒代表者のSTAFF_ID
#     STORE_NAME = db.Column(String(255))
#     TABLES = db.Column(Integer)

#     def __repr__(self):
#         return "(STORE_ID='%s', STORE_NAME='%s', TABLES='%s')" % (self.STORE_ID, self.STORE_NAME, self.TABLES)

# class Staff(UserMixin, db.Model):
#     __tablename__ = 'staffs'

#     STAFF_ID = db.Column(Integer, primary_key=True)
#     STORE_ID = db.Column(Integer)
#     STAFF_NUMBER = db.Column(Integer)   #スタッフ順の並べ替えの際に必要
#     STAFF_NAME = db.Column(String(255))
#     E_MAIL = db.Column(String(255), unique=True)
#     PASSWORD = db.Column(String(255))
#     STAFF_CLASS_ID = db.Column(Integer)
#     STAFF_CLASS = db.Column(String(32))

#     def get_id(self):
#         return self.STAFF_ID

#     def __repr__(self):
#         return "(STAFF_ID='%s', STORE_ID='%s', STAFF_NUMBER='%s', STAFF_NAME='%s', , E_MAIL='%s', PASSWORD='%s', STAFF_CLASS_ID='%s',STAFF_CLASS='%s')" % (self.STAFF_ID, self.STORE_ID, self.STAFF_NUMBER, self.STAFF_NAME, self.E_MAIL, self.PASSWORD, self.STAFF_CLASS_ID, self.STAFF_CLASS)

# Class_Middleテーブル定義
# class Menu(db.Model):
#     __tablename__ = 'menus'

#     MENU_ID = db.Column(Integer, primary_key=True)
#     STORE_ID = db.Column(Integer)
#     STAFF_ID = db.Column(Integer)   #登録・更新者を把握するのに必要
#     CLASS_1_ID = db.Column(Integer) #大分類を示すクラス
#     CLASS_1 = db.Column(String(5))
#     CLASS_2_ID = db.Column(Integer)    #中分類を示すクラス
#     CLASS_2 = db.Column(String(64))
#     CLASS_3_ID = db.Column(Integer)    #小分類を示すクラス
#     CLASS_3 = db.Column(String(64))
#     PRICE = db.Column(Integer)

#     def __repr__(self):
#         return "(MENU_ID='%s', STORE_ID='%s', STAFF_ID='%s', CLASS_1_ID='%s', CLASS_1='%s', CLASS_2_ID='%s', CLASS_2='%s', CLASS_3_ID='%s', CLASS_3='%s', PRICE='%s')" % (self.MENU_ID, self.STORE_ID, self.STAFF_ID, self.CLASS_1_ID, self.CLASS_1, self.CLASS_2_ID, self.CLASS_2, self.CLASS_3_ID, self.CLASS_3, self.PRICE)






# -----未定義-----


# class Table(db.Model):
#     __tablename__ = 'tables'

#     TABLE_ID = db.Column(Integer, primary_key=True)
#     STORE_ID = db.Column(Integer)
#     TABLE_NUMBER = db.Column(Integer)
#     TABLE_ACTIVATE = db.Column(Integer)
#     ONE_TIME_PASSWORD = db.Column(String(16))
#     TOTAL_FEE = db.Column(Integer)

#     def __repr__(self):
#         return "(TABLE_ID='%s', STORE_ID='%s', TABLE_NUMBER='%s', TABLE_ACTIVATE='%s', ONE_TIME_PASSWORD='%s', TOTAL_FEE='%s')" % (self.TABLE_ID, self.STORE_ID, self.TABLE_NUMBER, self.TABLE_ACTIVATE, self.ONE_TIME_PASSWORD, self.TOTAL_FEE)

# class Order(db.Model):
#     __tablename__ = 'orders'

#     ORDER_ID = db.Column(Integer, primary_key=True)
#     ORDER_TIMESTAMP = Column(DateTime)
#     ORDER_STATUS = db.Column(Integer)   #0はかごに入ってる,1はかごから削除された,2はオーダーされた,3は調理完了.4は料理キャンセル,5は会計依頼,6は会計完了
#     STORE_ID = db.Column(Integer)
#     TABLE_NUMBER = db.Column(Integer)
#     GROUP_ID = db.Column(Integer)   #オーダーをしたグループを特定
#     MENU_ID = db.Column(Integer)
#     ORDER_QUANTITY = db.Column(Integer)

#     def __repr__(self):
#         return "(ORDER_ID='%s', ORDER_STATUS='%s', STORE_ID='%s', TABLE_NUMBER='%s', GROUP_ID='%s', MENU_ID='%s', ORDER_QUANTITY='%s')" % (self.ORDER_ID, self.ORDER_STATUS, self.STORE_ID, self.TABLE_NUMBER, self.GROUP_ID, self.MENU_ID, self.ORDER_QUANTITY)

# #DBの作成をここで行う。
# db.create_all()
# login_manager = LoginManager()
# login_manager.init_app(app)
# @login_manager.user_loader
# def load_user(user_id):
#     return Staff.query.get(int(user_id))
