from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db.models.signals import post_save
from django.utils import timezone

# utils provides small helper utilities ad give ready made tools for common tasks


# identity + auth
class UserModel(AbstractUser):
    email = models.EmailField(unique=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.email 
    

# personal info
class Profile(models.Model):
    user = models.OneToOneField(
        UserModel,
        on_delete=models.CASCADE,
        related_name='profile', 
    )

    full_name = models.CharField(max_length=100)
    bio = models.CharField(max_length=300)
    verified = models.BooleanField(default=False)

    def __str__(self):
        return self.user.email 
    

# signal function
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)  

def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()

post_save.connect(create_user_profile, sender=UserModel)
post_save.connect(save_user_profile, sender=UserModel)



# Reset Password Model

class PasswordResetToken(models.Model):

    user = models.ForeignKey(
        UserModel,
        on_delete=models.CASCADE,
        related_name='password_reset_token' 
    )

    token = models.CharField(max_length=255, unique=True)

    created_at = models.DateTimeField(auto_now_add=True)

    expires_at = models.DateTimeField()

    is_used = models.BooleanField(default=False)

    def __str__(self):
        # here user is instance of the UserModel which we have with this model 
        return f"Token for {self.user.name}"
    
    # token validation function (to check if a token is valid or expired)
    def is_expired(self):
        return timezone.now() > self.expires_at


















# from django.db import models
# from django.contrib.auth.models import AbstractUser
# from django.db.models.signals import post_save

# # identity + authentication
# class UserModel(AbstractUser):
#     username = models.CharField(max_length=100)
#     email = models.EmailField(unique=True)

#     USERNAME_FIELD = 'email'
#     REQUIRED_FIELDS = ['username']  # should be a list or tuple

#     def __str__(self):
#         return self.username
    

# # personal data (variable type)
# class Profile(models.Model):
#     user = models.OneToOneField(UserModel, on_delete=models.CASCADE)
#     full_name = models.CharField(max_length=200)
#     bio = models.CharField(max_length=300)
#     # image = models.ImageField(default='default.jpg', upload_to='user_images')
#     verified = models.BooleanField(default=False)

#     def __str__(self):
#         return self.full_name
    

# # this will run when a user is created
# def create_user_profile(sender, instance, created, **kwargs):

#     if created:
#         Profile.objects.create(user=instance)

# # this will run every time a user is saved (both create and update) - to sync user profile
# def save_user_profile(sender, instance, **kwargs):
#     instance.profile.save()

# post_save.connect(create_user_profile, sender=UserModel)
# post_save.connect(save_user_profile, sender=UserModel)



# # NOTE : We created two models because the User model is meant only for authentication and identity, while the Profile model is meant for personal and UI-related information. Keeping them separate makes the system cleaner, safer, faster, and easier to scale. The User model answers “who is logged in,” and the Profile model answers “who is this person.” Together, they form a complete user system, but their responsibilities are intentionally separated.

# # A signal is Django is way of saying: “Tell me when something happens.”

# # sender → the model that triggered the signal (User)
# # instance → the actual User object that was saved
# # created → True if this User was just created, False if it was updated
# # **kwargs → extra internal data Django sends

# # # checks if the user just created for the first time - this is imp bcoz we want to create profile only once (not every time when user is updated)
# #     if created:
# #         Profile.objects.create(user=instance)   # link it with the user that was just created (instance)