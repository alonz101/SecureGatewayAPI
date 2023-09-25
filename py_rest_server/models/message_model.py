from typing import Optional
from pydantic import BaseModel
from datetime import datetime


class message(BaseModel):
    messageId: str
    content: str
    senderId: Optional[str] = None
    chatRoomId: Optional[str] = None
    timestamp: datetime