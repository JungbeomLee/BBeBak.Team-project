import requests
from bs4 import BeautifulSoup
import json

response = requests.get(
    "https://www.melon.com/chart/index.htm",
    params = {
        "dayTime": "2022112300"
    },
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36"
    }
)

#print(response.text)

#with open("html/melon.html", 'w', encoding = 'utf-8') as f:
#    f.write(response.text)

soup = BeautifulSoup(response.text, 'html.parser')

datas = []
for i in {50, 100}:
    song_no = soup.select(selector = f'#lst{i}')

    rank = soup.select(selector = f'#lst{i} > td:nth-child(2) > div > span.rank')
    img = soup.select(selector = f'#lst{i} > td:nth-child(4) > div > a > img')
    title = soup.select(selector = f'#lst{i} > td:nth-child(6) > div > div > div.ellipsis.rank01 > span > a')
    prod = soup.select(selector = f'#lst{i} > td:nth-child(6) > div > div > div.ellipsis.rank02 > a')
    album = soup.select(selector = f'#lst{i} > td:nth-child(7) > div > div > div > a')
    like = soup.select(selector = f'#lst{i} > td:nth-child(8) > div > button > span.cnt')

    
    likeLink = "https://www.melon.com/commonlike/getSongLike.json?contsIds="

    for j in range(50):
        likeLink = f"{likeLink}{song_no[j]['data-song-no']}%2C"

    getLike = requests.get(
        likeLink,
        headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36"
        }
    )

    #print(getLike.json()['contsLike'])

    count = 0
    while(1):
        if len(rank) <= count:
            break

        data = {
            "rank": rank[count].contents[0],
            "img": img[count]['src'],
            "music_link": f"https://www.melon.com/song/detail.htm?songId={song_no[0]['data-song-no']}",
            "title": title[count].contents[0],
            "prod": prod[count].contents[0],
            "album": album[count].contents[0],
            "like": getLike.json()['contsLike'][count]['SUMMCNT']
        }

        #print(getLike.json()['contsLike'][count]['SUMMCNT'])
        #print(rank[count].contents[0])
        #print(img[count]['src'])
        #print(title[count].contents[0])
        #print(prod[count].contents[0])
        #print(album[count].contents[0])

        #print(like[count].contents)
        
        count += 1

        datas.append(data)

with open('json/melon.json', 'w', encoding = 'utf-8') as f:
            f.write(json.dumps(datas, ensure_ascii = False))
