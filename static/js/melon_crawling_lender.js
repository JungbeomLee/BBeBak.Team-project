window.onload = getMelonUserData();

let melonPage = 2
let melonData


function getMelonUserData() {
    fetch('/melonranking/get', {
        method: 'GET'
    })
        .then(res => res.json())
        .then(data => {
            melonData = data
            melonRankingArrangement(data)
        })
}

function melonRankingArrangement(data) {
    document.getElementById('melon_date').innerText = data[(melonPage).toString() + 'st'][0].date
    for (i = 0; i < data[(0).toString() + 'st'].length; i++) {
        const list = document.getElementById('melonList');
        list.insertAdjacentHTML('beforeend', `
                    <li class='melonpopup' id='melon${data[(melonPage).toString() + 'st'][i].rank}' >
                        <div>
                            <h3 id='melonH3${data[(melonPage).toString() + 'st'][i].rank}'>${data[(melonPage).toString() + 'st'][i].rank}</h3>
                            <img src="${data[(melonPage).toString() + 'st'][i].img}" alt="Melon Ranking">
                            <div class="info">
                                <h3 title='${data[(melonPage).toString() + 'st'][i].title}'>${data[(melonPage).toString() + 'st'][i].title}</h3>
                                <hr>
                                <h4>${data[(melonPage).toString() + 'st'][i].prod}</h4>
                                <div class="like">
                                    <img src="/static/img/like.png" alt="Like Logo">
                                    <p>${data[(melonPage).toString() + 'st'][i].like}</p>
                                </div>
                            </div>
                        </div>
                        <hr>
                    </li>
                `)
    };
}

const melonPrevbutton = document.getElementById('melonPrev')
const melonNextbutton = document.getElementById('melonNext')
melonNextbutton.style.display = 'none'

melonPrevbutton.addEventListener('click', (e) => {
    melonPage--
    if (melonPage == 0) {
        melonPrevbutton.style.display = 'none'
    }

    if (melonPage != 2) {
        melonNextbutton.style.display = 'block'
    }

    document.getElementById('melonList').remove()

    const melonList = document.createElement('ul')
    melonList.id = 'melonList'

    document.getElementById('melonDiv').appendChild(melonList)
    melonRankingArrangement(melonData);
    console.log(melonPage)
})

melonNextbutton.addEventListener('click', (e) => {
    melonPage++
    if (melonPage == 2) {
        melonNextbutton.style.display = 'none'
    }

    if (melonPage != 0) {
        melonPrevbutton.style.display = 'block'
    }

    document.getElementById('melonList').remove()

    const melonList = document.createElement('ul')
    melonList.id = 'melonList'

    document.getElementById('melonDiv').appendChild(melonList)
    melonRankingArrangement(melonData);
    console.log(melonPage)
})


// Call the below function
waitForElementToDisplay("#melon1",melonPopupClick,1000,9000);

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

function melonPopupClick() {
    const melonFrontPopupOpenButton = document.getElementsByClassName('melonpopup')

    for(const melonlist of melonFrontPopupOpenButton){
        melonlist.addEventListener('click', (e) => {
            document.getElementById('frontInfoId').style.display = 'flex'

            const frontData = document.getElementById('popupData')
            const frontDataListNum = melonlist.innerText.split('\n')[0]-1

            frontData.insertAdjacentHTML('beforeend', `
                <div id='frontPopupInRankData'>
                    <h3>${melonData[(melonPage).toString() + 'st'][frontDataListNum].title}</h3>
                    <div class="info">
                        <h3>순위 : ${melonData[(melonPage).toString() + 'st'][frontDataListNum].rank}</h3>
                        <img src="${melonData[(melonPage).toString() + 'st'][frontDataListNum].img}" alt="Melon Ranking">
                        <h4>아티스트<br>${melonData[(melonPage).toString() + 'st'][frontDataListNum].prod}</h4>
                        <h4>앨범 : ${melonData[(melonPage).toString() + 'st'][frontDataListNum].album}</h4>
                        <button id='linkbutton' onclick="window.open('${melonData[(melonPage).toString() + 'st'][frontDataListNum].music_link}')">노래들으러가기</button>
                        <div class="like">
                            <img src="/static/img/like.png" alt="Like Logo">
                            <p>${melonData[(melonPage).toString() + 'st'][frontDataListNum].like}</p>
                        </div>
                    </div>
                </div>
            `)
        })
    }
    
    const melonFrontPopupCloseButton = document.getElementById('closeFrontInfo')
    melonFrontPopupCloseButton.addEventListener('click', (e) => {
        document.getElementById('frontInfoId').style.display = 'none'
        document.getElementById('frontPopupInRankData').remove()
    })
}