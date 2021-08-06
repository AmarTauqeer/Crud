import unittest
import requests
from rest_framework import status
from .serializers import *
from .models import *


class CrudTest(unittest.TestCase):
    # base url
    CRUD_URL = "http://127.0.0.1:8000/"
    DATA = {
        "user_name": "tauqeer",
        "user_password": "updated1",
        "create_date": "2021-01-01",
        "is_admin": "True"
    }

    # get all users
    def test_get_all_users(self):
        r = requests.get(CrudTest.CRUD_URL + "all_user/")
        self.assertEqual(r.status_code, status.HTTP_200_OK)

    # new user
    def test_new_user(self):
        r = requests.post(CrudTest.CRUD_URL + "add_user/", json=CrudTest.DATA)
        self.assertEqual(r.status_code, status.HTTP_201_CREATED)

    # update user
    def test_update_user(self):
        id = 1
        user = Users.objects.get(pk=id)
        user_serializer = UserSerializer(user, data=CrudTest.DATA)
        if user_serializer.is_valid():
            user_serializer.save()
            r = requests.put(CrudTest.CRUD_URL + "update_user/{}".format(id), json=user_serializer.data)
            self.assertEqual(r.status_code, status.HTTP_200_OK)

    # get user by id
    def test_get_userbyid(self):
        id = 1
        r = requests.get(CrudTest.CRUD_URL + "get_user_by_id/{}".format(id), json=CrudTest.DATA)
        self.assertEqual(r.status_code, status.HTTP_200_OK)
