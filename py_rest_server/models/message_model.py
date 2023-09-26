from typing import Optional
from pydantic import BaseModel
from datetime import datetime


class message(BaseModel):
    messageId: Optional[str] = None
    content: str
    senderId: Optional[str] = None
    chatRoomId: Optional[str] = None
    timestamp: Optional[datetime] = None

    def to_dict(self):
        return {
            "messageId": self.messageId,
            "content": self.content,
            "senderId": self.senderId,
            "chatRoomId": self.chatRoomId,
            "timestamp": self.timestamp.isoformat()
        }
