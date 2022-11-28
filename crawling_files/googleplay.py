import requests
from bs4 import BeautifulSoup
import json

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
        '순위': ranking,
        '앱로고': tr.select_one('div > div .TjRVLb img').attrs['src'],
        '앱이름': tr.select_one('div > div div:nth-child(2) > div:nth-child(1) > div').get_text(),
        '제품링크': tr.select_one('div > div div:nth-child(2) > div:nth-child(2) > div').get_text().rstrip('star'),
        '다운로드수': download_count
    },
    datas.append(data)
    ranking += 1

with open('./code_1.json', 'w', encoding='utf-8') as f:
    f.write(json.dumps(datas, ensure_ascii=False))
