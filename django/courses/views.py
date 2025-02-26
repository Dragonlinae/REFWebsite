from django.utils._os import safe_join
from django.views.static import serve

# Create your views here.


def index(request, document_root=None):
  return serve(request, "courses/search/index.html", document_root=document_root)
