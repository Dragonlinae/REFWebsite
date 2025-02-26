from rest_framework import serializers
from .models import Course, CourseDateTime, Picture, Tag
from django.utils.timezone import localtime


class CoursePictureSerializer(serializers.ModelSerializer):
  class Meta:
    model = Picture
    fields = '__all__'


class CourseDateTimeSerializer(serializers.ModelSerializer):
  class Meta:
    model = CourseDateTime
    fields = '__all__'


class CourseSerializer(serializers.ModelSerializer):
  pictures = CoursePictureSerializer(many=True, read_only=True)
  course_times = CourseDateTimeSerializer(many=True, read_only=True)
  tags = serializers.StringRelatedField(many=True, read_only=True)

  class Meta:
    model = Course
    # fields = '__all__'
    exclude = ['course_location']


class TagSerializer(serializers.ModelSerializer):
  class Meta:
    model = Tag
    fields = '__all__'
