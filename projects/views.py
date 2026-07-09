from django.shortcuts import render
from rest_framework import viewsets
# Create your views here.

from .models import Project, Issue, Comment
from .serializers import ProjectSerializer, IssueSerializer, CommentSerializer

class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

class IssueViewSet(viewsets.ModelViewSet):
    queryset = Issue.objects.all()
    serializer_class = IssueSerializer

class CommentViewSet(viewsets.ModelViewSet):
    queryset=Comment.objects.all()
    serializer_class = CommentSerializer
    
    