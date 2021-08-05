from rest_framework import serializers
from EmployeeCrud.models import Users, Departments, Employees

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ('id',
                  'user_name',
                  'create_date',
                  'is_admin')


class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Departments
        fields = ('id',
                  'department_name',
                  'description')

class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employees
        fields = ('id',
                  'employee_name',
                  'department',
                  'date_of_birth',
                  'joining_date',
                  'address',
                  'phone')