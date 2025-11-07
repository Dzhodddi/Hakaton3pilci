from fastapi import APIRouter, Body, Depends, status
from starlette.responses import HTMLResponse

from src.prompts.schemas import PromptResponse, LongPromptSchema
from src.prompts.service import PromptService
from src.service_provider import ServiceProvider

router = APIRouter(
    prefix='/prompts',
    tags=['prompts']
)


@router.post(
    '/short',
    response_model=PromptResponse,
    status_code=status.HTTP_200_OK
)
async def short_cv_prompt(
        prompt: str = Body(min_length=12),
        prompt_service: PromptService = Depends(ServiceProvider.get_prompt_service),
):
    response, err = prompt_service.generate_short_prompt(prompt)
    if err:
        raise err
    return response


@router.post(
    '/long',
    status_code=status.HTTP_200_OK
)
async def long_cv_prompt(
    payload: LongPromptSchema,
    prompt_service: PromptService = Depends(ServiceProvider.get_prompt_service),
):
    response, err = prompt_service.generate_long_prompt(payload)
    if err:
        raise err
    return response
