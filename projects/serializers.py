from rest_framework import serializers
from .models import Project, Issue, Comment

class IssueSerializer(serializers.ModelSerializer):
    project_name = serializers.CharField(source='project.name', read_only=True)
    reporter_name = serializers.CharField(source='reporter.username', read_only=True)
    class Meta:
        model = Issue
        fields = '__all__'
        read_only_fields = ['reporter']
class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'
        read_only_fields = ['owner']


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model=Comment
        fields='__all__'