from django.urls import re_path
from django.conf import settings

from . import views

urlpatterns = [
    re_path(r'^(?:.*)/?$', views.index, {
        "document_root": settings.REACT_PAGES_ROOT}),
]
