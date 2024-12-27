from django.db import models

# Create your models here.

class AlgCategory1(models.Model):
    catID = models.CharField(max_length=50, primary_key=True)
    name = models.CharField(max_length=100)
    path = models.CharField(max_length=1000)

class Algorithms1(models.Model):
    slno = models.AutoField(primary_key=True)
    catID = models.ForeignKey(AlgCategory1, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    path = models.CharField(max_length=1000)