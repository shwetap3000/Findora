from django.db import models
from django.conf import settings
from found.models import Found

class Claim(models.Model):

    STATUS_CHOICES = [
        ('rejected', 'Rejected'),
        ('pending', 'Pending'),
        ('approved', 'Approved'),
    ]

    claimant = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='claims' 
    )

    found_item = models.ForeignKey(
        Found,
        on_delete=models.CASCADE,
        related_name='claims'
    )

    claim_message = models.TextField(
        help_text='Details that prove ownership.'
    )

    status = models.CharField(
        max_length=10,
        choices=STATUS_CHOICES,
        default='pending' 
    )

    created_at = models.DateField(auto_now_add=True)

    class Meta:
        unique_together = ('claimant', 'found_item')

    def __str__(self):
        return (f"{self.claimant.username} -> {self.found_item.title}")
    
    