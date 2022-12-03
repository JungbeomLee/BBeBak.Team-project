import requests
from bs4 import BeautifulSoup
import json

APIKEY = "여기 없음 ㅅㄱ"
#search = str(input())
search = "사건의 지평선"

response = requests.get(
    "https://www.googleapis.com/youtube/v3/search",
    params = {
        "part": "snippet",
        "q": f"{search} mv",
        "regionCode": "KR",
        "type": "video",
        "maxResults": 1,
        "key": APIKEY
    },
)

youtube_json = json.loads(response.text)["items"][0]

print(youtube_json)

videoId = youtube_json["id"]["videoId"]

print(f"https://www.youtube.com/embed/{ videoId }")
print(youtube_json["snippet"]["title"])
print(youtube_json["snippet"]["thumbnails"]["default"]["url"])