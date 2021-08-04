from django.contrib import admin
from django.urls import path
from EmployeeCrud import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('add_department/', views.add_department),
    path('update_department/<int:id>', views.update_department),
    path('delete_department/<int:id>', views.delete_department),
    path('get_department_by_id/<int:id>', views.get_department_by_id),
    path('get_employee_by_id/<int:id>', views.get_employee_by_id),
    path('all_department/', views.all_department),
    path('add_employee/', views.add_employee),
    path('update_employee/<int:id>', views.update_employee),
    path('delete_employee/<int:id>', views.delete_employee),
    path('all_employee/', views.all_employee),
]
