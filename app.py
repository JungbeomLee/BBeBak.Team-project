from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
import uvicorn

app = FastAPI()

app.mount("/static", StaticFiles(directory='static'), name="static")
templates = Jinja2Templates(directory="templates")

@app.get('/', response_class=HTMLResponse)
async def main_page(request: Request) :
    return templates.TemplateResponse("index.html", {"request" : request})


import views.main as main

app.include_router(main.api)

if __name__ == "__main__" :
    uvicorn.run('app:app', reload=True)
