import pymysql
pymysql.install_as_MySQLdb()

from pathlib import Path
from decouple import config  # pyrefly: ignore [missing-import]
import os
# pyrefly: ignore [missing-import]
import dj_database_url

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = config("SECRET_KEY", default="django-insecure-default-key")
DEBUG = config("DEBUG", default=False, cast=bool)

ALLOWED_HOSTS = config(
    'ALLOWED_HOSTS',
    default='localhost,127.0.0.1,.up.railway.app,.onrender.com,.vercel.app'
).split(',')

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "cloudinary_storage",
    "django.contrib.staticfiles",
    "cloudinary",
    "rest_framework",
    "corsheaders",
    "portfolio_api",
]

REST_FRAMEWORK = {
    'DEFAULT_THROTTLE_CLASSES': [
        'rest_framework.throttling.ScopedRateThrottle',
    ],
    'DEFAULT_THROTTLE_RATES': {
        'contact': '5/day',
    }
}

MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.security.SecurityMiddleware",
    "whitenoise.middleware.WhiteNoiseMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "portfolio_backend.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "portfolio_backend.wsgi.application"

# Database Configuration
# Uses DATABASE_URL for Postgres, fallback to SQLite if not provided.
DATABASES = {
    "default": dj_database_url.parse(
        config("DATABASE_URL", default=f"sqlite:///{BASE_DIR / 'db.sqlite3'}"),
        conn_max_age=600,
    )
}

# Cloudinary Configuration
CLOUDINARY_STORAGE = {
    'CLOUD_NAME': config('CLOUDINARY_CLOUD_NAME', default=''),
    'API_KEY': config('CLOUDINARY_API_KEY', default=''),
    'API_SECRET': config('CLOUDINARY_API_SECRET', default=''),
}

AUTH_PASSWORD_VALIDATORS = [
    {"NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator"},
    {"NAME": "django.contrib.auth.password_validation.MinimumLengthValidator"},
    {"NAME": "django.contrib.auth.password_validation.CommonPasswordValidator"},
    {"NAME": "django.contrib.auth.password_validation.NumericPasswordValidator"},
]

LANGUAGE_CODE = "en-us"
TIME_ZONE = "Asia/Kolkata"
USE_I18N = True
USE_TZ = True

STATIC_URL = "static/"
STATIC_ROOT = BASE_DIR / "staticfiles"
STATICFILES_STORAGE = "whitenoise.storage.CompressedManifestStaticFilesStorage"

MEDIA_URL = "/media/"
MEDIA_ROOT = BASE_DIR / "media"

if config('CLOUDINARY_CLOUD_NAME', default=''):
    DEFAULT_FILE_STORAGE = 'cloudinary_storage.storage.MediaCloudinaryStorage'

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

FRONTEND_URL = config("FRONTEND_URL", default="http://localhost:5173").rstrip('/')

CORS_ALLOWED_ORIGINS = list({FRONTEND_URL, "http://localhost:5173", "http://127.0.0.1:5173"})
CSRF_TRUSTED_ORIGINS = [FRONTEND_URL, "https://*.up.railway.app", "https://*.onrender.com", "https://*.vercel.app"]
CORS_ALLOW_CREDENTIALS = True