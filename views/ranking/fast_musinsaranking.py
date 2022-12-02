from fastapi import APIRouter, Request
from fastapi.responses import HTMLResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from pprint import pprint
import json


api = APIRouter(prefix='/musinsaranking')

api.mount("/static", StaticFiles(directory='static'), name="static")
templates = Jinja2Templates(directory="templates")

@api.get('/', response_class=HTMLResponse)
async def fast_musinsa_ranking_route(request: Request) :
    return templates.TemplateResponse("musinsa_ranking.html", {"request" : request})

@api.get('/get', response_class=HTMLResponse)
async def fast_melon_ranking_route() :
    musinsa_data = {}
    
    for i in range(0, 3) : 
        with open ("views/utils/json/musinsa/musinsa{}.json".format(i), "r", encoding='utf-8') as f:
            musinsa_data['{}st'.format(i)] = json.loads(f.read())

    return JSONResponse(content=musinsa_data)