# Generated by Django 3.2.6 on 2021-08-06 16:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('EmployeeCrud', '0003_alter_users_create_date'),
    ]

    operations = [
        migrations.AlterField(
            model_name='users',
            name='create_date',
            field=models.DateField(),
        ),
    ]
