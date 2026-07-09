from django.db import models
from django.conf import settings
# Create your models here.
class Project(models.Model):
    name = models.CharField(max_length=100)
    desc = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)


    def __str__(self):
        return self.name

STATUS_CHOICES = (
    ('OPEN', 'Open'),
    ('IN_PROGRESS', 'In Progress'),
    ('CLOSED', 'Closed'),
)

PRIORITY_CHOICES = (
    ('LOW', 'Low'),
    ('MEDIUM', 'Medium'),
    ('HIGH', 'High'),
)


class Issue(models.Model):
    title = models.CharField(max_length=200)
    desc = models.TextField(blank=True, null=True)
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='issues')
    reporter = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='OPEN')
    created_at = models.DateTimeField(auto_now_add=True)
    priority = models.CharField(max_length=20, choices=PRIORITY_CHOICES, default='MEDIUM')
    

    def __str__(self):
        return self.title

class Comment(models.Model):
    issue = models.ForeignKey(Issue, on_delete=models.CASCADE, related_name='comments')
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Comment by {self.author} on {self.issue}"
