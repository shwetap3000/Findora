from django.db import models
from django.conf import settings

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
    



class Claim(models.Model):

    item = models.ForeignKey(
        "Found",
        on_delete=models.CASCADE,
        related_name="claims" 
    )

    claimant = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="claims"   
    )

    additional_details = models.TextField()

    status = models.CharField(
        max_length=20,
        choices=[
            ("pending", "Pending"),
            ("approved", "Approved"),
            ("rejected", "Rejected"), 
        ],
        default="pending"
    )

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Claim by {self.claimant.username} for Item {self.item.id}"