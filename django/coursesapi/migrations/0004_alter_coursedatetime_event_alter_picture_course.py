# Generated by Django 5.1.5 on 2025-01-20 00:12

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

  dependencies = [
      ('coursesapi', '0003_alter_course_course_location'),
  ]

  operations = [
      migrations.AlterField(
          model_name='coursedatetime',
          name='event',
          field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE,
                                  related_name='course_times', to='coursesapi.course'),
      ),
      migrations.AlterField(
          model_name='picture',
          name='course',
          field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE,
                                  related_name='pictures', to='coursesapi.course'),
      ),
  ]
