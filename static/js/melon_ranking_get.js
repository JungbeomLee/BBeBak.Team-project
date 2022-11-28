function getUserData() {
    fetch('/melonranking/get', {
        method : 'GET'
    })
    .then(res => res.json())
    .then(data => {
        console.log(data)
    })
}

window.onload = getUserData();