import requests
from bs4 import BeautifulSoup
import os
import json
from datetime import datetime

class MUSINSA_CRAWLING :
    def musinsa_crawling() :
        json_count = len(os.listdir('views/utils/json/musinsa/'))
        
        if json_count == 3 :
            os.remove('views/utils/json/musinsa/musinsa0.json')
            for j in range(0, 2) :
                os.rename('views/utils/json/musinsa/musinsa{}.json'.format(j+1), 'views/utils/json/musinsa/musinsa{}.json'.format(j))
                json_count = len(os.listdir('views/utils/json/musinsa/'))
                
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

        soup = BeautifulSoup(response.text, 'html.parser')
        rank = soup.select('ul#goodsRankList > li')
        
        datas = []
        for tr in rank:
            price = tr.select_one('.li_inner > .article_info > .price').get_text().strip().replace(" " , "")
            try :
                price = price.split('\n')[1]
            except : 
                pass
            
            data= {
                '날짜' : datetime.now().strftime("%Y%m%d%H"),
                '순위': tr.select_one('p:nth-child(1)').get_text().strip().rstrip('위'),
                '가격': price,
                '브랜드': tr.select_one('.li_inner > .article_info > .item_title > a').get_text().strip(),
                '옷이름': tr.select_one('.li_inner > .article_info > .list_info > a').get_text().strip(),
                '제품링크': tr.select_one('.li_inner > .list_img > a').attrs['href'],
                '옷사진': tr.select_one('.li_inner > .list_img > a > img').attrs['data-original']
                },
            datas.append(data)
        with open('views/utils/json/musinsa/musinsa{}.json'.format(json_count), 'w', encoding='utf-8') as f:
            f.write(json.dumps(datas, ensure_ascii=False))

        print('musinsa crawled')