from django.contrib import admin
from .models import UserModel, Profile, PasswordResetToken

admin.site.register(UserModel)
admin.site.register(Profile)
admin.site.register(PasswordResetToken)
