from django.shortcuts import render
from rest_framework import viewsets
# Create your views here.

from .models import Project, Issue, Comment
from .serializers import ProjectSerializer, IssueSerializer, CommentSerializer

class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    def perform_create(self, serializer):
        serializer.save(owner = self.request.user)

class IssueViewSet(viewsets.ModelViewSet):
    queryset = Issue.objects.all()
    serializer_class = IssueSerializer
    def perform_create(self, serializer):
        serializer.save(reporter=self.request.user)       

class CommentViewSet(viewsets.ModelViewSet):
    queryset=Comment.objects.all()
    serializer_class = CommentSerializer
    
    