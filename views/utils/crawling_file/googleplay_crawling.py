from bs4 import BeautifulSoup
from datetime import datetime
import requests
import json
import os

class GOOGLEPLAY_CRAWLING :
    def googleplay_crawling() :
        json_count = len(os.listdir('views/utils/json/googleplay/'))
        
        if json_count == 3 :
            os.remove('views/utils/json/googleplay/googleplay0.json')
            for j in range(0, 2) :
                os.rename('views/utils/json/googleplay/googleplay{}.json'.format(j+1), 'views/utils/json/googleplay/googleplay{}.json'.format(j))
                json_count = len(os.listdir('views/utils/json/googleplay/'))

        crawling_time = datetime.now().strftime("%Y%m%d%H")

        response = requests.get(
            'https://play.google.com/store/apps/collection/topselling_free',
            params={
                'clp': 'ChcKFQoPdG9wc2VsbGluZ19mcmVlEAcYAw==:S:ANO1ljLwMrI',
                'gsr': 'ChkKFwoVCg90b3BzZWxsaW5nX2ZyZWUQBxgD:S:ANO1ljIxP20'
            },
            headers={
                'user-agent': 'Mozilla/5.0 (Windows NT  10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36'
            }
        )
        
        
        soup = BeautifulSoup(response.text, 'html.parser')
        rank = soup.select('.zuJxTd > .ftgkle > .fUEl2e > .ULeU3b')
        datas = []
        ranking = 1

        for tr in rank:
            app_link = 'https://play.google.com' + \
                (tr.select_one('div:nth-child(1) > div > a').attrs['href'])

            response2 = requests.get(
                app_link,
                headers={
                    'accept-language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
                    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36'
                }
            )
            soup2 = BeautifulSoup(response2.text, 'html.parser')
            download_count = soup2.select_one(
                '.hnnXjf > .JU1wdd > .l8YSdd .w7Iutd .wVqUob:nth-child(2) .ClM7O').get_text()

            data = {
                '날짜' : crawling_time,
                '순위': ranking,
                '앱로고': tr.select_one('div > div .TjRVLb img').attrs['src'],
                '앱이름': tr.select_one('div > div div:nth-child(2) > div:nth-child(1) > div').get_text(),
                '앱링크' : app_link,
                '평점': tr.select_one('div > div div:nth-child(2) > div:nth-child(2) > div').get_text().rstrip('star'),
                '다운로드수': download_count
            },
            datas.append(data)
            ranking += 1

        with open('views/utils/json/googleplay/googleplay{}.json'.format(json_count), 'w', encoding='utf-8') as f:
            f.write(json.dumps(datas, ensure_ascii=False))
        
        print('googleplay crawled')