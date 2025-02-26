from django.contrib import admin

from .models import Course, CourseAdmin, Tag

admin.site.register(Course, CourseAdmin)
admin.site.register(Tag)