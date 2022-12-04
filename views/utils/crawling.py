from crawling_file.melon_crawling import MELON_CRAWLING
from crawling_file.musinsa_crawling import MUSINSA_CRAWLING
from crawling_file.googleplay_crawling import GOOGLEPLAY_CRAWLING
import schedule

schedule.every(1).seconds.do(MELON_CRAWLING.melon_crawling)
schedule.every(1).seconds.do(MUSINSA_CRAWLING.musinsa_crawling)
schedule.every(1).seconds.do(GOOGLEPLAY_CRAWLING.googleplay_crawling)

while True :
    schedule.run_pending()