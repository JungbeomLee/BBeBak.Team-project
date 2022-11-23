from crawling_file.melon_crawling import MELON_CRAWLING
import schedule
import time

schedule.every(1).minutes.do(MELON_CRAWLING.melon_crawling)

while True :
    schedule.run_pending()