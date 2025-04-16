from django.urls import path
from . import views

urlpatterns = [
    path('', views.index_view, name='index'),
    path('calculator/', views.calculator_view, name='calculator'),
    path('article/', views.article_list_view, name='article'),
    path('article/create/', views.article_create_view, name='article_create'),
    path('article/<int:article_id>/', views.article_detail_view, name='article_detail'),
    path('about/', views.about_view, name='about'),
    path('profile/', views.profile_view, name='profile'),
    path('register/', views.register_view, name='register'),
    path('login/', views.login_view, name='login'),
    path('logout/', views.logout_view, name='logout'),
]