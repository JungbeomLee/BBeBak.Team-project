from crawling_file.melon_crawling import MELON_CRAWLING
from crawling_file.musinsa_crawling import MUSINSA_CRAWLING
import schedule
import time

schedule.every(1).minutes.do(MELON_CRAWLING.melon_crawling)
schedule.every(1).minutes.do(MUSINSA_CRAWLING.musinsa_crawling)

while True :
    schedule.run_pending()