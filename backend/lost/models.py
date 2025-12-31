from django.db import models

class Lost(models.Model):
    title = models.CharField(max_length=50)
    description = models.CharField(max_length=500)
    # not using name as date_lost or date_found bcoz it will create confusion while mapping in frontend
    date = models.DateField()
    location = models.CharField(max_length=120)
    additional_identifiers = models.TextField(blank=True)
    reward = models.CharField(blank=True)
    image = models.FileField(upload_to='lost_images', blank=True, null=True)
    status = models.CharField(editable=False, default="lost", max_length=10)
    contact_type = models.CharField(max_length=10)
    created_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
    


# we can use fileField to upload image (instead of imageField - it requires an additonal library call pillow)

# The difference between the textField and the charField is that charField is for limited number of characters having max_length criteria while textField can be used for unlimited number of characters

# By default all the fields have 'blank=False'