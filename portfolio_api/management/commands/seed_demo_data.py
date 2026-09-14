from django.core.management.base import BaseCommand
from portfolio_api.models import Project, ResumeProfile

PROJECTS = [
    {
        "title": "AI Billing Automation System",
        "description": "A full-featured billing and inventory management system with AI-powered invoice generation, automated GST calculations, and real-time stock tracking. Built for small businesses to replace manual Excel workflows.",
        "tech_stack": "Django, Django REST Framework, React.js, Redux Toolkit, MySQL, Python, Tailwind CSS",
        "github_link": "https://github.com/sufillxman/ai-billing-system",
        "live_link": "",
    },
    {
        "title": "Portfolio REST API Backend",
        "description": "Headless Django REST Framework API powering this very portfolio. Features rate-limited contact endpoints, JWT-secured admin, project CRUD, resume profile API, and scoped throttling for production security.",
        "tech_stack": "Python, Django, Django REST Framework, SQLite, JWT Auth, WhiteNoise",
        "github_link": "https://github.com/sufillxman/portfolio-api",
        "live_link": "https://sufillxman.up.railway.app/api/",
    },
    {
        "title": "E-Commerce Platform ShopMax",
        "description": "A multi-vendor e-commerce platform with product catalog, cart management, order tracking, and Razorpay payment integration. Admin panel for vendor onboarding and analytics dashboard.",
        "tech_stack": "Django, React.js, Razorpay API, MySQL, Bootstrap 5, Redis, Celery",
        "github_link": "https://github.com/sufillxman/shopmax-ecommerce",
        "live_link": "",
    },
    {
        "title": "Student Management System",
        "description": "Comprehensive SMS for colleges with attendance tracking, result management, fee collection, parent notification via email/SMS, and automated report card generation as PDF.",
        "tech_stack": "Django, Bootstrap 5, MySQL, Celery, Python-docx, Chart.js",
        "github_link": "https://github.com/sufillxman/student-management",
        "live_link": "",
    },
    {
        "title": "Real-Time Chat App",
        "description": "WebSocket-powered real-time group and private chat application with Django Channels, message history, online presence indicators, read receipts, and mobile-responsive React UI.",
        "tech_stack": "Django Channels, WebSockets, React.js, Redux, Redis, Tailwind CSS",
        "github_link": "https://github.com/sufillxman/realtime-chat",
        "live_link": "",
    },
    {
        "title": "Crypto Price Tracker and Alert Bot",
        "description": "A live cryptocurrency dashboard that fetches real-time prices from CoinGecko API, plots historical charts, and sends Telegram alerts when a coin crosses a user-defined price threshold.",
        "tech_stack": "Python, FastAPI, React.js, Chart.js, CoinGecko API, Telegram Bot API, Celery",
        "github_link": "https://github.com/sufillxman/crypto-tracker",
        "live_link": "",
    },
]

RESUME_DATA = {
    "name": "Sufill X Man (Manknojiya Sufiyan)",
    "role": "AI + Web + API Fullstack Developer",
    "phone": "7405721856",
    "email": "sufillxman@gmail.com",
    "linkedin": "https://linkedin.com/in/sufill-x-man/",
    "github": "https://github.com/sufillxman",
    "instagram": "https://instagram.com/sufilldigital/",
    "summary": "Passionate fullstack developer with BCA background, specializing in Django REST Framework backends and React frontends. I build automation-first products that solve real business problems from billing systems to AI-powered dashboards. Currently open to freelance projects and full-time roles.",
    "skills": [
        "Python", "Django", "Django REST Framework",
        "React.js", "Redux Toolkit", "Tailwind CSS",
        "MySQL", "REST API Design", "Git and GitHub",
        "Celery", "WebSockets", "Postman",
    ],
    "education": [
        "Bachelor of Computer Applications (BCA) - In Progress (2022-2025)",
        "Higher Secondary (Science) - Gujarat Board, 2022",
        "Secondary - Gujarat Board, 2020",
    ],
    "highlights": [
        "Built and deployed 6+ fullstack projects using Django + React",
        "Implemented secure JWT-auth REST APIs consumed by React SPAs",
        "Designed AI-powered billing automation for local businesses",
        "Created real-time WebSocket chat with Django Channels + Redis",
        "Open source contributor - portfolio backend available on GitHub",
        "Self-taught Python, Django, React in under 18 months",
    ],
}


class Command(BaseCommand):
    help = "Seed the database with demo portfolio projects and resume data"

    def handle(self, *args, **kwargs):
        existing_titles = set(Project.objects.values_list("title", flat=True))
        created_count = 0
        for p in PROJECTS:
            if p["title"] not in existing_titles:
                Project.objects.create(**p)
                created_count += 1
                self.stdout.write(self.style.SUCCESS("  Created: " + p["title"]))
            else:
                self.stdout.write("  Skipped (exists): " + p["title"])

        self.stdout.write(self.style.SUCCESS("\n" + str(created_count) + " project(s) created."))

        profile, created = ResumeProfile.objects.get_or_create(
            email=RESUME_DATA["email"],
            defaults=RESUME_DATA,
        )
        if not created:
            for key, val in RESUME_DATA.items():
                setattr(profile, key, val)
            profile.save()
            self.stdout.write("  Resume profile updated.")
        else:
            self.stdout.write(self.style.SUCCESS("  Resume profile created."))

        self.stdout.write(self.style.SUCCESS("\nSeed complete!\n"))
