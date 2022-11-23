from fastapi import APIRouter, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

api = APIRouter(prefix='/gameranking')

api.mount("/static", StaticFiles(directory='static'), name="static")
templates = Jinja2Templates(directory="templates")

@api.get('/', response_class=HTMLResponse)
async def fast_game_ranking_route(request: Request) :
    return templates.TemplateResponse("game_ranking.html", {"request" : request})
