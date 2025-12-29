from django.db import models

class Found(models.Model):
    title = models.CharField(max_length=50)
    description = models.CharField(max_length=500)
    date_found = models.DateField()
    location_found = models.CharField(max_length=120)
    additional_identifiers = models.TextField(blank=True)
    image = models.FileField(blank=True)
    contact_type = models.CharField()
    created_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
