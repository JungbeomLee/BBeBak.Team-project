from fastapi import FastAPI
import uvicorn
from fastapi.staticfiles import StaticFiles

app = FastAPI()

app.mount("/static", StaticFiles(directory='static'), name="static")

import views.fast_main as fast_main
import views.ranking.fast_googlplay_ranking as fast_googlplay_ranking
import views.ranking.fast_melonranking as fast_melon_ranking
import views.ranking.fast_musinsaranking as fast_musinsa_ranking


app.include_router(fast_main.api)
app.include_router(fast_googlplay_ranking.api)
app.include_router(fast_melon_ranking.api)
app.include_router(fast_musinsa_ranking.api)


if __name__ == "__main__" :
    uvicorn.run('app:app', 
        host="127.0.0.0", 
        reload=True)
