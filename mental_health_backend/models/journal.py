from pydantic import BaseModel

class Journal(BaseModel):
    title: str
    feeling: int
    journal_entry: str