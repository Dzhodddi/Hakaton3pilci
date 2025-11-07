from fastapi import APIRouter, status
from starlette.responses import JSONResponse

router = APIRouter(
    prefix="/health",
    tags=["health"],
)


@router.get(
    '',
    status_code=status.HTTP_200_OK
)
async def health_check():
    return {"status": "ok"}
