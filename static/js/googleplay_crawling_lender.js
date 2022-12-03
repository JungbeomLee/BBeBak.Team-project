window.onload = getgoogleplayUserData();

let googleplayPage = 2
let googleplayData

function getgoogleplayUserData() {
    fetch('/googleplayranking/get', {
        method: 'GET'
    })
        .then(res => res.json())
        .then(data => {
            googleplayData = data
            googleplayRankingArrangement(data)
        })
}

function googleplayRankingArrangement(data) {
    document.getElementById('googleplay_date').innerText = data[(googleplayPage).toString() + 'st'][0][0].날짜
    for (i = 0; i < data[(0).toString() + 'st'].length; i++) {
        const list = document.getElementById('googleplayList');
        list.insertAdjacentHTML('beforeend', `
                    <li class='googleplaypopup' id='googleplay${data[(googleplayPage).toString() + 'st'][i][0].순위}'>
                        <div>
                            <h3>${data[(googleplayPage).toString() + 'st'][i][0].순위}</h3>
                            <img src="${data[(googleplayPage).toString() + 'st'][i][0].앱로고}">
                            <div class="info">
                                <h3 title='${data[(googleplayPage).toString() + 'st'][i][0].앱이름}'>${data[(googleplayPage).toString() + 'st'][i][0].앱이름}</h3>
                                <hr>
                                <h4>평점 : ${data[(googleplayPage).toString() + 'st'][i][0].평점}</h4>
                                <div class="down">
                                    <img src="/static/img/down.png" alt="Down Logo">
                                    <p>${data[(googleplayPage).toString() + 'st'][i][0].다운로드수}</p>
                                </div>
                            </div>
                        </div>
                        <hr>
                    </li>
                `)
    };
}

const googleplayPrevbutton = document.getElementById('googleplayPrev')
const googleplayNextbutton = document.getElementById('googleplayNext')
googleplayNextbutton.style.display = 'none'

googleplayPrevbutton.addEventListener('click', (e) => {
    googleplayPage--
    if (googleplayPage == 0) {
        googleplayPrevbutton.style.display = 'none'
    }

    if (googleplayPage != 2) {
        googleplayNextbutton.style.display = 'block'
    }

    document.getElementById('googleplayList').remove()

    const googleplayList = document.createElement('ul')
    googleplayList.id = 'googleplayList'

    document.getElementById('googleplayDiv').appendChild(googleplayList)
    googleplayRankingArrangement(googleplayData);
    console.log(googleplayPage)
})

googleplayNextbutton.addEventListener('click', (e) => {
    googleplayPage++
    if (googleplayPage == 2) {
        googleplayNextbutton.style.display = 'none'
    }

    if (googleplayPage != 0) {
        googleplayPrevbutton.style.display = 'block'
    }

    document.getElementById('googleplayList').remove()

    const googleplayList = document.createElement('ul')
    googleplayList.id = 'googleplayList'

    document.getElementById('googleplayDiv').appendChild(googleplayList)
    googleplayRankingArrangement(googleplayData);
    console.log(googleplayPage)
})


// Call the below function
waitForElementToDisplay("#googleplay1",googleplayPopupClick,1000,9000);

function waitForElementToDisplay(selector, callback, checkFrequencyInMs, timeoutInMs) {
  var startTimeInMs = Date.now();
  (function loopSearch() {
    if (document.querySelector(selector) != null) {
      callback();
      return;
    }
    else {
      setTimeout(function () {
        if (timeoutInMs && Date.now() - startTimeInMs > timeoutInMs)
          return;
        loopSearch();
      }, checkFrequencyInMs);
    }
  })();
}

function googleplayPopupClick() {
    const googleplayFrontPopupOpenButton = document.getElementsByClassName('googleplaypopup')
    console.log('hi')

    for(const googleplaylist of googleplayFrontPopupOpenButton){
        googleplaylist.addEventListener('click', (e) => {
            document.getElementById('frontInfoId').style.display = 'flex'
            
            const frontData = document.getElementById('popupData')
            const frontDataListNum = googleplaylist.innerText.split('\n')[0]-1

            frontData.insertAdjacentHTML('beforeend', `
            <div id='frontPopupInRankData'>
                <h3>${googleplayData[(googleplayPage).toString() + 'st'][frontDataListNum][0].앱이름}</h3>
                <div class="info">
                    <h3>순위 : ${googleplayData[(googleplayPage).toString() + 'st'][frontDataListNum][0].순위}</h3>
                    <img src="${googleplayData[(googleplayPage).toString() + 'st'][frontDataListNum][0].앱로고}" alt="googleplay Ranking">
                    <h4>평점 : ${googleplayData[(googleplayPage).toString() + 'st'][frontDataListNum][0].평점}</h4>
                    <button id='linkbutton' onclick="window.open('${googleplayData[(googleplayPage).toString() + 'st'][frontDataListNum][0].앱링크}')">노래들으러가기</button>
                    <div class="coin">
                        <img src="/static/img/down.png" alt="Down Logo">
                        <p>${googleplayData[(googleplayPage).toString() + 'st'][frontDataListNum][0].다운로드수}</p>
                    </div>
                </div>
            </div>
            `)
        })
    }
    
    const googleplayFrontPopupCloseButton = document.getElementById('closeFrontInfo')
    googleplayFrontPopupCloseButton.addEventListener('click', (e) => {
        document.getElementById('frontInfoId').style.display = 'none'
        document.getElementById('frontPopupInRankData').remove()
    })
}
