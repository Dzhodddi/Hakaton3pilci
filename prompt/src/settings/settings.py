import os

from dotenv import load_dotenv
from pydantic_settings import BaseSettings


load_dotenv()


class AppSettings(BaseSettings):
    API_KEY: str = os.getenv("API_KEY")
    ALLOWED_HOSTS: str = os.getenv("ORIGIN")


def get_settings() -> AppSettings:
    return AppSettings()
