from fastapi import APIRouter, Body, HTTPException
from models.message_model import message
from services.chat_service import create_message, list_messages

router = APIRouter()


@router.get("/messages")
async def get_messages():
    return list_messages()


@router.post("/messages")
async def post_message(msg: message = Body(...)):
    item = create_message(msg)
    if item:
        return [item]
    raise HTTPException(status_code=404, detail="couldn't create message")
