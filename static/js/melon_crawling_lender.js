window.onload = getMelonUserData();

let melonPage = 2;
let melonData;
let melonFrontPopupOpenButton;


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
                            <h3 title="${data[(melonPage).toString() + 'st'][i].rank}" id='melonH3${data[(melonPage).toString() + 'st'][i].rank}'>${data[(melonPage).toString() + 'st'][i].rank}</h3>
                            <div class="rankingImg"><img title="${data[(melonPage).toString() + 'st'][i].title}" src="${data[(melonPage).toString() + 'st'][i].img}" alt="Melon Ranking"></div>
                            <div class="info">
                                <h3 title="${data[(melonPage).toString() + 'st'][i].title}">${data[(melonPage).toString() + 'st'][i].title}</h3>
                                <hr>
                                <h4 title="${data[(melonPage).toString() + 'st'][i].prod}">${data[(melonPage).toString() + 'st'][i].prod}</h4>
                                <div class="like">
                                    <img title="좋아요" src="/static/img/like.png" alt="Like Logo">
                                    <p title="${data[(melonPage).toString() + 'st'][i].like}">${data[(melonPage).toString() + 'st'][i].like}</p>
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
    melonFrontPopupOpenButton = document.getElementsByClassName('melonpopup')
    // Call the below function
    waitForElementToDisplay("#melon1",melonPopupClickCheck,1000,9000);
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
    melonFrontPopupOpenButton = document.getElementsByClassName('melonpopup')
    // Call the below function
    waitForElementToDisplay("#melon1",melonPopupClickCheck,1000,9000);
})


// Call the below function
waitForElementToDisplay("#melon1",melonPopupClickCheck,1000,9000);

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

function melonPopupClickCheck() {
    melonFrontPopupOpenButton = document.getElementsByClassName('melonpopup')
    melonPopupClick()

}

function  melonPopupClick() {
    for(const melonlist of melonFrontPopupOpenButton){
        melonlist.addEventListener('click', (e) => {
            document.getElementById('frontInfoId').style.display = 'flex'

            const frontData = document.getElementById('popupData')
            const frontDataListNum = melonlist.innerText.split('\n')[0]-1

            frontData.insertAdjacentHTML('beforeend', `
                <div id='frontPopupInRankData'>
                    <h3 title="${melonData[(melonPage).toString() + 'st'][frontDataListNum].title}">${melonData[(melonPage).toString() + 'st'][frontDataListNum].title}</h3>
                    <h4 title="${melonData[(melonPage).toString() + 'st'][frontDataListNum].rank}">순위 : ${melonData[(melonPage).toString() + 'st'][frontDataListNum].rank}</h4>
                    <div class="info"> 
                        <div class="ImgTitle">
                        <img title="${melonData[(melonPage).toString() + 'st'][frontDataListNum].title}" src="${melonData[(melonPage).toString() + 'st'][frontDataListNum].img}" alt="Melon Ranking">
                        <div class="subInfo">
                        <h3 title="${melonData[(melonPage).toString() + 'st'][frontDataListNum].prod}">${melonData[(melonPage).toString() + 'st'][frontDataListNum].prod}</h3>
                        <h4 title="${melonData[(melonPage).toString() + 'st'][frontDataListNum].album}">앨범 : ${melonData[(melonPage).toString() + 'st'][frontDataListNum].album}</h4>
                        </div>
                        </div>
                        <button title="노래 들기" id='linkbutton' onclick="window.open('${melonData[(melonPage).toString() + 'st'][frontDataListNum].music_link}')">노래 들기</button>
                        <div class="like">
                            <img title="좋아요" src="/static/img/like.png" alt="Like Logo">
                            <p title="${melonData[(melonPage).toString() + 'st'][frontDataListNum].like}">${melonData[(melonPage).toString() + 'st'][frontDataListNum].like}</p>
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