from django.shortcuts import render
from rest_framework import viewsets
from .serializers import ProjectSerializer
from .models import Project


class ProjectView(viewsets.ModelViewSet):
    serializer_class = ProjectSerializer
    queryset = Project.objects.all()
