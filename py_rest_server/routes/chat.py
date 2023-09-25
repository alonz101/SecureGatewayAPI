from fastapi import APIRouter, HTTPException
from models.message_model import message
from services.chat_service import list_messages

router = APIRouter()

@router.get("/messages")
async def get_messages():
    return list_messages()