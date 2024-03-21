from datetime import datetime, timezone
import uuid
from fastapi import APIRouter, Body, HTTPException
from utils.pusher_client import pusher_client
from models.message_model import message
from services.chat_service import create_message, list_messages

router = APIRouter()


@router.get("/messages")
async def get_messages():
    return list_messages()


@router.post("/messages")
async def post_message(msg: message = Body(...)):
    if not msg.messageId:
        msg.messageId = str(uuid.uuid4())
    if not msg.timestamp:
        msg.timestamp = datetime.now(timezone.utc)
    item = create_message(msg)
    if item:
        # Trigger the event on Pusher
        pusher_client.trigger('chat-channel', 'new-message', {
            'messageId': msg.messageId,
            'content': msg.content,
            'timestamp': msg.timestamp.isoformat(),
            'senderId': msg.senderId
        })
        return [item]
    raise HTTPException(status_code=404, detail="couldn't create message")
