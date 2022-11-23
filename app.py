from fastapi import FastAPI
import uvicorn

app = FastAPI()


import views.fast_main as fast_main
import views.ranking.fast_game_ranking as fast_game_ranking
import views.ranking.fast_melonranking as fast_melon_ranking


app.include_router(fast_main.api)
app.include_router(fast_game_ranking.api)
app.include_router(fast_melon_ranking.api)



if __name__ == "__main__" :
    uvicorn.run('app:app', reload=True)
