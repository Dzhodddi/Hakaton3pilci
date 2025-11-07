import json

from fastapi import HTTPException

import google.generativeai as genai
from google.generativeai.types import HarmCategory, HarmBlockThreshold
from starlette import status
from starlette.responses import HTMLResponse

from src.core.templates import PROMPT_TEMPLATE, PROMPT_LONG_TEMPLATE
from src.prompts.schemas import PromptResponse, LongPromptSchema
from src.settings.settings import get_settings


class PromptService():

    def __init__(self):
        genai.configure(api_key=get_settings().API_KEY)
        self._model = genai.GenerativeModel(
            "models/gemma-3-27b-it",
            safety_settings={
                HarmCategory.HARM_CATEGORY_HARASSMENT: HarmBlockThreshold.BLOCK_ONLY_HIGH,
                HarmCategory.HARM_CATEGORY_HATE_SPEECH: HarmBlockThreshold.BLOCK_ONLY_HIGH,
                HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT: HarmBlockThreshold.BLOCK_ONLY_HIGH,
                HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT: HarmBlockThreshold.BLOCK_ONLY_HIGH,
            },
        )

    def generate_short_prompt(self, prompt: str) -> [PromptResponse | None, HTTPException, None]:
        prompt = PROMPT_TEMPLATE.format(user_text=prompt)
        try:
            response = self._model.generate_content(prompt)
            data = json.loads(response.text.replace("`", '').replace("json", '').removeprefix("\n"))
            valid_model = PromptResponse.model_validate(data)
            return valid_model, None
        except Exception:
            return None, HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Could not generate prompt.",
            )

    def generate_long_prompt(self, payload: LongPromptSchema) -> [HTMLResponse | None, HTTPException, None]:
        prompt = PROMPT_LONG_TEMPLATE.format(
            user_json=payload.model_dump_json(indent=2)
        )
        response = self._model.generate_content(prompt)
        html_output = response.text.replace("`", '').replace("html", '').removeprefix("\n")
        return html_output, None
