from django.shortcuts import render

# Create your views here.


def index(request):
  return render(request, 'refhome/index.html')


def about(request):
  return render(request, 'refhome/about.html')


def camps(request):
  return render(request, 'refhome/camps.html')


def support(request):
  return render(request, 'refhome/support.html')


def volunteer(request):
  return render(request, 'refhome/volunteer.html')


def workshops(request):
  return render(request, 'refhome/workshops.html')
