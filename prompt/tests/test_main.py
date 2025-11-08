import pytest
from fastapi import status


@pytest.mark.asyncio
async def test_read_main(async_client, configured_app):
    response = await async_client.get("/api/v1/health")
    assert response.status_code == status.HTTP_200_OK
    assert response.json() == {"status": "ok"}
