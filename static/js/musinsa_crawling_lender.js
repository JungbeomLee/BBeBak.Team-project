window.onload = getMusinsaUserData();
    let musinsaPage = 2
    let musinsaData

    function getMusinsaUserData() {
        fetch('/musinsaranking/get', {
            method: 'GET'
        })
            .then(res => res.json())
            .then(data => {
                musinsaData = data
                musinsaRankingArrangement(data)
            })
    }

    function musinsaRankingArrangement(data) {
        document.getElementById('musinsa_date').innerText = data[(musinsaPage).toString() + 'st'][0][0].날짜
        for (i = 0; i < data[(0).toString() + 'st'].length; i++) {
            const list = document.getElementById('musinsaList');
            list.insertAdjacentHTML('beforeend', `
                        <li class='musinsapopup' id='musinsa${data[(musinsaPage).toString() + 'st'][i][0].순위}'>
                            <div>
                                <h3 title="${data[(musinsaPage).toString() + 'st'][i][0].순위}">${data[(musinsaPage).toString() + 'st'][i][0].순위}</h3>
                                <div class="rankingImg"><img title="${data[(musinsaPage).toString() + 'st'][i][0].옷이름}" src="${data[(musinsaPage).toString() + 'st'][i][0].옷사진}"></div>
                                <div class="info">
                                    <h3 title="${data[(musinsaPage).toString() + 'st'][i][0].옷이름}">${data[(musinsaPage).toString() + 'st'][i][0].옷이름}</h3>
                                    <hr>
                                    <h4 title="${data[(musinsaPage).toString() + 'st'][i][0].브랜드}">${data[(musinsaPage).toString() + 'st'][i][0].브랜드}</h4>
                                    <div class="coin">
                                        <img title="가격" src="/static/img/won.png"Coin Logo">
                                        <p title="${data[(musinsaPage).toString() + 'st'][i][0].가격}">${data[(musinsaPage).toString() + 'st'][i][0].가격}</p>
                                    </div>
                                </div>
                            </div>
                            <hr>
                        </li>
                    `)
        };
    }

    const musinsaPrevbutton = document.getElementById('musinsaPrev')
    const musinsaNextbutton = document.getElementById('musinsaNext')
    musinsaNextbutton.style.display = 'none'

    musinsaPrevbutton.addEventListener('click', (e) => {
        musinsaPage--
        if (musinsaPage == 0) {
            musinsaPrevbutton.style.display = 'none'
        }

        if (musinsaPage != 2) {
            musinsaNextbutton.style.display = 'block'
        }

        document.getElementById('musinsaList').remove()

        const musinsaList = document.createElement('ul')
        musinsaList.id = 'musinsaList'

        document.getElementById('musinsaDiv').appendChild(musinsaList)
        musinsaRankingArrangement(musinsaData);
        console.log(musinsaPage)
    })

    musinsaNextbutton.addEventListener('click', (e) => {
        musinsaPage++
        if (musinsaPage == 2) {
            musinsaNextbutton.style.display = 'none'
        }

        if (musinsaPage != 0) {
            musinsaPrevbutton.style.display = 'block'
        }

        document.getElementById('musinsaList').remove()

        const musinsaList = document.createElement('ul')
        musinsaList.id = 'musinsaList'

        document.getElementById('musinsaDiv').appendChild(musinsaList)
        musinsaRankingArrangement(musinsaData);
        console.log(musinsaPage)
    })


// Call the below function
waitForElementToDisplay("#musinsa1",musinsaPopupClick,1000,9000);

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

function musinsaPopupClick() {
    const musinsaFrontPopupOpenButton = document.getElementsByClassName('musinsapopup')
    
    for(const musinsalist of musinsaFrontPopupOpenButton){
        musinsalist.addEventListener('click', (e) => {
            document.getElementById('frontInfoId').style.display = 'flex'

            const frontData = document.getElementById('popupData')
            const frontDataListNum = musinsalist.innerText.split('\n')[0]-1

            frontData.insertAdjacentHTML('beforeend', `
                <div id='frontPopupInRankData'>
                    <h3 title="${musinsaData[(musinsaPage).toString() + 'st'][frontDataListNum][0].옷이름}">${musinsaData[(musinsaPage).toString() + 'st'][frontDataListNum][0].옷이름}</h3>
                    <h4 title="${musinsaData[(musinsaPage).toString() + 'st'][frontDataListNum][0].순위}">순위 : ${musinsaData[(musinsaPage).toString() + 'st'][frontDataListNum][0].순위}</h4>
                    <div class="info">
                        <div class="ImgTitle">
                        <img title="${musinsaData[(musinsaPage).toString() + 'st'][frontDataListNum][0].옷이름}" src="${musinsaData[(musinsaPage).toString() + 'st'][frontDataListNum][0].옷사진}" alt="musinsa Ranking">
                        <div class="subInfo">
                        <h3 title="${musinsaData[(musinsaPage).toString() + 'st'][frontDataListNum][0].브랜드}">${musinsaData[(musinsaPage).toString() + 'st'][frontDataListNum][0].브랜드}</h3>
                        </div>
                        </div>
                        <button title="옷 구매" id='linkbutton' onclick="window.open('${musinsaData[(musinsaPage).toString() + 'st'][frontDataListNum][0].제품링크}')">옷 구매</button>
                        <div class="coin">
                            <img title="가격" src="/static/img/won.png"Coin Logo">
                            <p title="${musinsaData[(musinsaPage).toString() + 'st'][frontDataListNum][0].가격}">${musinsaData[(musinsaPage).toString() + 'st'][frontDataListNum][0].가격}</p>
                        </div>
                    </div>
                </div>
            `)
        })
    }
    
    const musinsaFrontPopupCloseButton = document.getElementById('closeFrontInfo')
    musinsaFrontPopupCloseButton.addEventListener('click', (e) => {
        document.getElementById('frontInfoId').style.display = 'none'
        document.getElementById('frontPopupInRankData').remove()
    })
}
