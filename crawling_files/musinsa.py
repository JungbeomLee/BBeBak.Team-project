import requests
from bs4 import BeautifulSoup
import json

response = requests.get(
    'https://www.musinsa.com/ranking/best',
    params={
        'u_cat_cd': '002'
    },
    headers={
        'referer': 'https://www.musinsa.com/',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.5060.114 Safari/537.36'
    }
)

with open('musinsa.html', 'w', encoding='utf-8') as f:
    f.write(response.text)


soup = BeautifulSoup(response.text, 'html.parser')
rank = soup.select('ul#goodsRankList > li')
datas = []
for tr in rank:
    data= {
        '순위': tr.select_one('p:nth-child(1)').get_text().strip().rstrip('위'),
        '가격': tr.select_one('.li_inner > .article_info > .price').get_text().strip(),
        '브랜드': tr.select_one('.li_inner > .article_info > .item_title > a').get_text().strip(),
        '옷이름': tr.select_one('.li_inner > .article_info > .list_info > a').get_text().strip(),
        '제품링크': tr.select_one('.li_inner > .list_img > a').attrs['href'],
        '옷사진': tr.select_one('.li_inner > .list_img > a > img').attrs['data-original']
        },
    datas.append(data)
with open('./code_1.json', 'w', encoding='utf-8') as f:
    f.write(json.dumps(datas, ensure_ascii=False))