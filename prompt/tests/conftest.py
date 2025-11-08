import pytest_asyncio
from fastapi import FastAPI
from httpx import AsyncClient, ASGITransport

from src.main import app


@pytest_asyncio.fixture(scope='session')
async def configured_app() -> FastAPI:
    return app


@pytest_asyncio.fixture(scope='function')
async def async_client(configured_app: FastAPI) -> AsyncClient:
    async with AsyncClient(
        transport=ASGITransport(app=configured_app),
        base_url="http://test"
    ) as client:
        yield client
