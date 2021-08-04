from rest_framework import serializers
from EmployeeCrud.models import Departments, Employees


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