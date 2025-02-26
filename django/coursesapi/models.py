from django.contrib import admin
from django.db import models

# Create your models here.


class Tag(models.Model):
  tag_name = models.CharField(max_length=30)

  def __str__(self):
    return self.tag_name


class Course(models.Model):
  course_name = models.CharField(max_length=200)
  tags = models.ManyToManyField(Tag)
  short_description = models.CharField(max_length=200)
  description = models.TextField()
  application_page = models.URLField()
  application_deadline = models.DateTimeField()
  course_location = models.CharField(max_length=200)
  cost = models.FloatField()
  max_students = models.IntegerField()
  curr_students = models.IntegerField(default=0)
  active = models.BooleanField(default=True)

  def __str__(self):
    return self.course_name


class CourseDateTime(models.Model):
  event = models.ForeignKey(
      Course, related_name='course_times', on_delete=models.CASCADE)
  start_time = models.DateTimeField()
  end_time = models.DateTimeField()


class CourseDateTimeInline(admin.TabularInline):
  model = CourseDateTime
  extra = 1


class Picture(models.Model):
  course = models.ForeignKey(
      Course, related_name='pictures', on_delete=models.CASCADE)
  picture = models.ImageField(
      upload_to='course_pictures/', null=True, blank=True)


class PictureInline(admin.TabularInline):
  model = Picture
  extra = 1


class CourseAdmin(admin.ModelAdmin):
  inlines = [CourseDateTimeInline, PictureInline]
