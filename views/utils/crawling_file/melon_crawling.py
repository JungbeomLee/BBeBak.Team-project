import requests
from bs4 import BeautifulSoup
import os
import json
from datetime import datetime

class MELON_CRAWLING :
    def melon_crawling() :
        json_count = len(os.listdir('views/utils/json/melon/'))
        
        if json_count == 3 :
            os.remove('views/utils/json/melon/melon0.json')
            for j in range(0, 2) :
                os.rename('views/utils/json/melon/melon{}.json'.format(j+1), 'views/utils/json/melon/melon{}.json'.format(j))
                json_count = len(os.listdir('views/utils/json/melon/'))

        crawling_time = datetime.now().strftime("%Y%m%d%H")

        response = requests.get(
            "https://www.melon.com/chart/index.htm",
            params = {
                "dayTime": crawling_time
            },
            headers = {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36"
            }
        )

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

            count = 0
            while(1):
                if len(rank) <= count:
                    break

                data = {
                    "date" : crawling_time,
                    "rank": rank[count].contents[0],
                    "img": img[count]['src'],
                    "music_link": f"https://www.melon.com/song/detail.htm?songId={song_no[0]['data-song-no']}",
                    "title": title[count].contents[0],
                    "prod": prod[count].contents[0],
                    "album": album[count].contents[0],
                    "like": getLike.json()['contsLike'][count]['SUMMCNT']
                }

                count += 1

                datas.append(data)

        with open('views/utils/json/melon/melon{}.json'.format(json_count), 'w', encoding = 'utf-8') as f:
            f.write(json.dumps(datas, ensure_ascii = False))

        print('melon crawled')