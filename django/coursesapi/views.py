from rest_framework import viewsets
from .serializers import CourseSerializer, TagSerializer
from .models import Course, Tag
from django.db.models import Count, Q


class ReactView(viewsets.ModelViewSet):
  serializer_class = CourseSerializer

  def get_queryset(self):
    name = self.request.query_params.get('name', None)
    price_from = self.request.query_params.get('price_from', None)
    price_to = self.request.query_params.get('price_to', None)
    tags = self.request.query_params.get('tags', None)
    id = self.request.query_params.get('id', None)
    active = self.request.query_params.get('active', True)

    if isinstance(active, str):
      active = active.lower() == 'true'

    queryset = Course.objects.filter(active=active)

    if name:
      queryset = queryset.annotate(
          relevance=(
              Count('course_name', filter=Q(course_name__icontains=name)) * 3 +
              Count('short_description', filter=Q(short_description__icontains=name)) * 2 +
              Count('description', filter=Q(
                  description__icontains=name))
          )
      ).filter(
          relevance__gt=0
      ).order_by('-relevance')

    if price_from:
      queryset = queryset.filter(cost__gte=price_from)

    if price_to:
      queryset = queryset.filter(cost__lte=price_to)

    if tags:
      tags = tags.split(',')
      queryset = queryset.filter(tags__tag_name__in=tags)

    if id:
      queryset = queryset.filter(id=id)

    return queryset


class TagView(viewsets.ModelViewSet):
  serializer_class = TagSerializer

  def get_queryset(self):
    queryset = Tag.objects.all()
    return queryset
