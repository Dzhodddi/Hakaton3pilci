from contextlib import asynccontextmanager

import requests
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.base import BaseHTTPMiddleware

from src.errors import AUTH_ERROR
from src.service_provider import ServiceProvider
from src.api_router import api_router
from src.settings.settings import get_settings


def get_application() -> FastAPI:
    settings = get_settings()

    @asynccontextmanager
    async def lifespan(app: FastAPI):
        try:
            app.state.service_provider = ServiceProvider()
            yield
        finally:
            app.state.service_provider.shutdown()

    application = FastAPI(lifespan=lifespan)

    application.add_middleware(
        CORSMiddleware,
        allow_origins=settings.ALLOWED_HOSTS,
        allow_credentials=True,
        allow_methods=['*'],
        allow_headers=['*'],
    )

    application.include_router(api_router, prefix='/api/v1')

    class AuthMiddleware(BaseHTTPMiddleware):
        async def dispatch(self, request: Request, call_next):
            open_paths = [
                "/", "/health", "/docs", "/redoc", "/openapi.json",
                "/api/v1/prompts/short",
            ]

            if request.url.path in open_paths:
                return await call_next(request)

            if request.url.path.startswith("/api/v1/prompts/long"):
                auth_header = request.headers.get("Authorization")
                if not auth_header or not auth_header.startswith("Bearer "):
                    return AUTH_ERROR

                token = auth_header.split(" ")[1]
                try:
                    response = requests.get(
                        "https://www.googleapis.com/oauth2/v1/tokeninfo",
                        params={"access_token": token},
                        timeout=1,
                    )
                    if response.status_code != 200:
                        return AUTH_ERROR

                    request.state.token_info = response.json()
                except requests.exceptions.RequestException:
                    return AUTH_ERROR

            return await call_next(request)

    application.add_middleware(AuthMiddleware)

    return application


app = get_application()
