from fastapi import status
from fastapi.responses import JSONResponse

AUTH_ERROR = JSONResponse(
    status_code=status.HTTP_401_UNAUTHORIZED,
    content={"detail": "Authentication credentials were not provided."},
)
