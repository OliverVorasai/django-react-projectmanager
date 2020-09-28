from django.shortcuts import render
from rest_framework import viewsets
from .serializers import ProjectSerializer
from .models import Project
from django.views.generic import TemplateView
from django.views.decorators.cache import never_cache



class ProjectView(viewsets.ModelViewSet):
    serializer_class = ProjectSerializer
    queryset = Project.objects.all()

# Serve Single Page Application
index = never_cache(TemplateView.as_view(template_name='index.html'))