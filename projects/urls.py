from django.urls import path, include
from .views import ProjectViewSet, IssueViewSet, CommentViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()

router.register(r'projects', ProjectViewSet) # here what the hell these r's are
router.register(r'issues', IssueViewSet)
router.register(r'comments', CommentViewSet)

urlpatterns = [
    path('', include(router.urls)),
]


