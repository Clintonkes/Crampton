import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "Crampton LLC"
    API_V1_STR: str = "/api/v1"
    
    SECRET_KEY: str = os.getenv("SECRET_KEY", "your-secret-key-change-in-production")
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 8
    JWT_ALGORITHM: str = "HS256"
    
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./crampton_cleaning.db")

    RESEND_API_KEY: str = os.getenv("RESEND_API_KEY", "")
    RESEND_FROM_EMAIL: str = os.getenv("RESEND_FROM_EMAIL", "Crampton <no-reply@cramptonllc.com>")
    RESEND_FROM_NAME: str = os.getenv("RESEND_FROM_NAME", "Crampton LLC")
    PUBLIC_SITE_URL: str = os.getenv("PUBLIC_SITE_URL", "http://localhost:8000")

    ADMIN_EMAIL: str = os.getenv("ADMIN_EMAIL", "harkllc@proton.me")
    ADMIN_PASSWORD: str = os.getenv("ADMIN_PASSWORD", "change-this-password")

settings = Settings()
