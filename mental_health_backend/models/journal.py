from pydantic import BaseModel

class Journal(BaseModel):
    feeling: int
    journal_entry: str
    emotion: str