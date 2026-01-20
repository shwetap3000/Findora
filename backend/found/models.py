from django.db import models

class Found(models.Model):
    title = models.CharField(max_length=50)
    description = models.CharField(max_length=500)
    date = models.DateField()
    location = models.CharField(max_length=120)
    status = models.CharField(editable=False, default="found", max_length=10)
    image = models.FileField(blank=True)
    contact_type = models.CharField()
    created_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
