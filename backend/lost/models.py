from django.db import models

class Lost(models.Model):
    title = models.CharField(max_length=50)
    description = models.CharField(max_length=500)
    date_lost = models.DateField()
    location_lost = models.CharField(max_length=120)
    additional_identifiers = models.TextField(blank=True)
    reward = models.CharField(blank=True)
    image = models.FileField(blank=True)
    contact_type = models.CharField()
    created_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
    


# we can use fileField to upload image (instead of imageField - it requires an additonal library call pillow)

# The difference between the textField and the charField is that charField is for limited number of characters having max_length criteria while textField can be used for unlimited number of characters

# By default all the fields have 'blank=False'