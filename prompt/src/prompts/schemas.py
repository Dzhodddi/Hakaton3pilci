from pydantic import BaseModel, Field, EmailStr


class LongPromptSchema(BaseModel):
    first_name: str = Field(min_length=2, max_length=100)
    last_name: str = Field(min_length=2, max_length=100)
    email: EmailStr = Field(min_length=2, max_length=100)
    github: str | None = Field(min_length=5)
    linkedin: str | None = Field(min_length=5)
    experience: str
    skills: str
    education: str
    additional_info: str

    key_words: list[str] = Field(min_length=1)


class PromptData(BaseModel):
    summary: str
    experience: list[str] = []
    skills: list[str] = []


class PromptResponse(BaseModel):
    response: PromptData
