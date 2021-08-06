from django.db import models


# Create your models here.
class Users(models.Model):
    user_name = models.CharField(max_length=100, blank=False, default='')
    user_password = models.CharField(max_length=200, blank=False, default='')
    create_date = models.DateField()
    is_admin = models.BooleanField(default=False)


class Departments(models.Model):
    department_name = models.CharField(max_length=100, blank=False, default='')
    description = models.CharField(max_length=200, blank=False, default='')


class Employees(models.Model):
    employee_name = models.CharField(max_length=100, blank=False, default='')
    department = models.ForeignKey(Departments, on_delete=models.CASCADE, default=None)
    date_of_birth = models.DateField()
    joining_date = models.DateField()
    address = models.CharField(max_length=500, blank=False, default='')
    phone = models.CharField(max_length=20, blank=False, default='')
