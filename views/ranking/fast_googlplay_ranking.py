from fastapi import APIRouter, Request
from fastapi.responses import HTMLResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
import json

api = APIRouter(prefix='/googleplayranking')

api.mount("/static", StaticFiles(directory='static'), name="static")
templates = Jinja2Templates(directory="templates")

@api.get('/', response_class=HTMLResponse)
async def fast_game_ranking_route(request: Request) :
    return templates.TemplateResponse("googleplay_ranking.html", {"request" : request})

@api.get('/get', response_class=HTMLResponse)
async def fast_melon_ranking_route() :
    googleplay_data = {}
    
    for i in range(0, 3) : 
        with open ("views/utils/json/googleplay/googleplay{}.json".format(i), "r", encoding='utf-8') as f:
            googleplay_data['{}st'.format(i)] = json.loads(f.read())

    return JSONResponse(content=googleplay_data)