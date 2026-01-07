```python
from django.db import models


# We import AbstractUser so we can create a custom user model and make email the primary login identifier instead of username, while keeping all Django authentication functionality intact.
from django.contrib.auth.models import AbstractUser


# We import post_save to let us run some code automatically right after a model (like a User) is saved.
from django.db.models.signals import post_save


# we created UserModel and Profile as separate models, linked them with a one-to-one relationship to ensure each user has exactly one profile, and separated authentication-related fields from personal information for better security, scalability, and clean design.


# =========================
# USER MODEL (identity + auth)
# =========================
class UserModel(AbstractUser):

    # this makes email mandatory at db level
    email = models.EmailField(unique=True)


    # this means email becomes the primary identifier for authentication across the entire system (tells django to use it for authentication)
    USERNAME_FIELD = 'email'


    # this means when running createsuperuser command, django will ask for email, username and password fields.. so username is not used for login but it is must exist in the database (we can later use it on profile page to display username and all)
    REQUIRED_FIELDS = ['username']


    # this controls django admin list
    def __str__(self):
        return self.email


# =========================
# PROFILE MODEL (personal data)
# =========================
class Profile(models.Model):

    # related_name decides the name used to access the realted object from the other side
    # When we want to access profile data from the UserModel, we use : user.profile.<field_name>  -- hence we have used related_name here

    user = models.OneToOneField(
        UserModel,
        on_delete=models.CASCADE,
        related_name='profile'
    )
    full_name = models.CharField(max_length=200)
    bio = models.CharField(max_length=300)
    verified = models.BooleanField(default=False)

    def __str__(self):
        return self.full_name


# =========================
# SIGNALS
# =========================

# this automatically create a profile for every new user that is created.. we don't have to manually create a profile every time a new user signs up

# Function parameters:
# sender → the model that sent the signal (in our case UserModel)
# instance → the actual object that was saved (the new user)
# created → True if this is a new object, False if it’s an update
# **kwargs → extra info Django sends automatically (we don’t need it here)


# this is a signal function
# the sequence of arguments must stay the same; only the variable names can change.
def create_user_profile(sender, instance, created, **kwargs):

    # we only create a profile once, not every time the user is saved (hence this will run only after the user is created)
    if created:

        # this line creates a profile record in the databse
        # instance is teh parameter of the signal function
        # 'user' sets the user field of this Profile and 'instance'is the actual UserModel object that was just saved (the new user)
        # django passes the user object that was just saved into the instance automatically
        Profile.objects.create(user=instance)


# To automatically save (update) the profile whenever the related user is updated. So, unlike create_user_profile which creates a profile, this one updates it.

# instance → the user object that was just saved/updated
# instance.profile → the profile linked to that user
# .save() → saves any changes in that profile to the database

def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()


# When a new user registers (using the email field in UserModel), UserModel “sends a signal” to create_user_profile, which automatically creates a Profile for that user.
# “Hey, whenever a UserModel object is saved, run this function (create_user_profile) automatically.”
post_save.connect(create_user_profile, sender=UserModel)
post_save.connect(save_user_profile, sender=UserModel)

```

