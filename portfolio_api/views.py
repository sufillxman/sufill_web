from rest_framework import viewsets, mixins, status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from .models import Project, ContactMessage, Certificate, ResumeProfile
from .serializers import (
    ProjectSerializer,
    ContactMessageSerializer,
    CertificateSerializer,
    ResumeSerializer,
)


class ProjectViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Read-only endpoint returning all portfolio projects.
    GET /api/projects/  — list
    GET /api/projects/{id}/  — detail
    """
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [AllowAny]


class CertificateViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Read-only endpoint returning all certificates.
    GET /api/certificates/  — list
    GET /api/certificates/{id}/  — detail
    """
    queryset = Certificate.objects.all()
    serializer_class = CertificateSerializer
    permission_classes = [AllowAny]


class ContactMessageViewSet(
    mixins.CreateModelMixin,
    viewsets.GenericViewSet
):
    """
    Write-only endpoint accepting contact form submissions.
    POST /api/contact/
    """
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer
    permission_classes = [AllowAny]
    throttle_scope = 'contact'

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class ResumeViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Read-only endpoint returning the resume profile.
    GET /api/resume/  — list (returns single-item array for frontend compatibility)
    """
    queryset = ResumeProfile.objects.all()
    serializer_class = ResumeSerializer
    permission_classes = [AllowAny]
