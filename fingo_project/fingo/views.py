from django.shortcuts import render, redirect
from django.contrib.auth import login, authenticate, logout, update_session_auth_hash
from django.contrib import messages
from .models import RegisterForm, LoginForm, Article, Comment

def calculator_view(request):
    return render(request, 'calculator.html')

def index_view(request):
    return render(request, 'index.html')

def article_list_view(request):
    articles = Article.objects.all().order_by('-created_at')
    return render(request, 'article.html', {'articles': articles})

def article_create_view(request):
    if not request.user.is_authenticated:
        return redirect('login')
    
    if request.method == 'POST':
        title = request.POST.get('title')
        content = request.POST.get('content')
        if title and content:
            Article.objects.create(title=title, content=content, author=request.user)
            messages.success(request, 'Статья успешно создана!')
            return redirect('article')
        else:
            messages.error(request, 'Заполните все поля.')
    return render(request, 'article_create.html')

def article_detail_view(request, article_id):
    article = Article.objects.get(id=article_id)
    comments = article.comments.all().order_by('-created_at')
    if request.method == 'POST':
        if not request.user.is_authenticated:
            messages.error(request, 'Войдите, чтобы оставить комментарий.')
            return redirect('login')
        content = request.POST.get('content')
        if content:
            Comment.objects.create(article=article, author=request.user, content=content)
            messages.success(request, 'Комментарий добавлен!')
            return redirect('article_detail', article_id=article_id)
        else:
            messages.error(request, 'Комментарий не может быть пустым.')
    return render(request, 'article_detail.html', {'article': article, 'comments': comments})

def about_view(request):
    return render(request, 'about.html')

def profile_view(request):
    if not request.user.is_authenticated:
        return redirect('login')
    
    if request.method == 'POST':
        user = request.user
        user.first_name = request.POST.get('first_name', '')
        user.last_name = request.POST.get('last_name', '')
        user.email = request.POST.get('email', '')

        new_password = request.POST.get('password', '')
        if new_password:
            user.set_password(new_password)
            user.save()
            update_session_auth_hash(request, user)
            messages.success(request, 'Пароль успешно обновлён.')
        else:
            user.save()
            messages.success(request, 'Данные профиля успешно обновлены!')

        return redirect('profile')

    return render(request, 'profile.html')

def register_view(request):
    if request.method == 'POST':
        form = RegisterForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            messages.success(request, 'Регистрация прошла успешно!')
            return redirect('profile')
        else:
            messages.error(request, 'Ошибка при регистрации. Проверьте данные.')
    else:
        form = RegisterForm()
    return render(request, 'register.html', {'form': form})

def login_view(request):
    if request.method == 'POST':
        form = LoginForm(data=request.POST)
        if form.is_valid():
            user = form.get_user()
            login(request, user)
            messages.success(request, 'Вы успешно вошли в аккаунт!')
            return redirect('profile')
        else:
            messages.error(request, 'Неверное имя пользователя или пароль.')
    else:
        form = LoginForm()
    return render(request, 'login.html', {'form': form})

def logout_view(request):
    logout(request)
    messages.success(request, 'Вы вышли из аккаунта.')
    return redirect('index')