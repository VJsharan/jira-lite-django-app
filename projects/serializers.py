from rest_framework import serializers
from .models import Project, Issue, Comment

class IssueSerializer(serializers.ModelSerializer):
    class Meta:
        model = Issue
        fields = '__all__'

class ProjectSerializer(serializers.ModelSerializer):
    issues = IssueSerializer(many=True, read_only=True)
    class Meta:
        model = Project
        fields = '__all__'


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model=Comment
        fields='__all__'