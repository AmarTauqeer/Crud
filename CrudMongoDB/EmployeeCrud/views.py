from django.shortcuts import render

from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework import status

from EmployeeCrud.models import Departments, Employees
from EmployeeCrud.serializers import DepartmentSerializer, EmployeeSerializer
from rest_framework.decorators import api_view

"""
    department crud operations
"""


@api_view(['POST'])
def add_department(request):
    if request.method == 'POST':
        department_data = JSONParser().parse(request)
        department_serializer = DepartmentSerializer(data=department_data)
        if department_serializer.is_valid():
            department_serializer.save()
            return JsonResponse(department_serializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse(department_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
def update_department(request, id):
    if request.method == 'PUT':
        department_data = JSONParser().parse(request)
        department = Departments.objects.get(pk=id)
        department_serializer = DepartmentSerializer(department, data=department_data)
        if department_serializer.is_valid():
            department_serializer.save()
            return JsonResponse(department_serializer.data)
        return JsonResponse(department_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
def delete_department(request, id):
    if request.method == 'DELETE':
        department = Departments.objects.get(pk=id)
        department.delete()
        return JsonResponse({'message': 'Department was deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)

@api_view(['GET'])
def get_department_by_id(request, id):
    if request.method == 'GET':
        department = Departments.objects.get(pk=id)
        department_serializer = DepartmentSerializer(department)
        print(department_serializer.data)

        return JsonResponse(department_serializer.data, safe=False)


@api_view(['GET'])
def all_department(request):
    if request.method == 'GET':
        departments = Departments.objects.all()

        department_name = request.GET.get('department_name', None)
        if department_name is not None:
            departments = departments.filter(department_name__icontains=department_name)

        departments_serializer = DepartmentSerializer(departments, many=True)
        return JsonResponse(departments_serializer.data, safe=False)


"""
    employee crud operations
"""

@api_view(['GET'])
def get_employee_by_id(request, id):
    if request.method == 'GET':
        employee = Employees.objects.get(pk=id)
        employee_serializer = EmployeeSerializer(employee)
        return JsonResponse(employee_serializer.data, safe=False)


@api_view(['POST'])
def add_employee(request):
    if request.method == 'POST':
        employee_data = JSONParser().parse(request)
        employee_serializer = EmployeeSerializer(data=employee_data)
        if employee_serializer.is_valid():
            employee_serializer.save()
            return JsonResponse(employee_serializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse(employee_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
def update_employee(request, id):
    if request.method == 'PUT':
        employee_data = JSONParser().parse(request)
        employee = Employees.objects.get(pk=id)
        employee_serializer = EmployeeSerializer(employee, data=employee_data)
        if employee_serializer.is_valid():
            employee_serializer.save()
            return JsonResponse(employee_serializer.data)
        return JsonResponse(employee_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
def delete_employee(request, id):
    if request.method == 'DELETE':
        employee = Employees.objects.get(pk=id)
        employee.delete()
        return JsonResponse({'message': 'Employee was deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)


@api_view(['GET'])
def all_employee(request):
    if request.method == 'GET':
        employees = Employees.objects.all()

        employee_name = request.GET.get('employee_name', None)
        if employee_name is not None:
            employees = employees.filter(employee_name__icontains=employee_name)

        employees_serializer = EmployeeSerializer(employees, many=True)
        return JsonResponse(employees_serializer.data, safe=False)
