from src.prompts.service import PromptService


class ServiceProvider():

    prompt_service: PromptService

    def __init__(self):
        cls = self.__class__

        cls.prompt_service = cls.get_prompt_service()

    @classmethod
    def get_prompt_service(cls) -> PromptService:
        return PromptService()

    def shutdown(self):
        pass
