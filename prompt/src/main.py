from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

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

    return application


app = get_application()
