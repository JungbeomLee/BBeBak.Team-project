$(document).ready(function() {
    removetagtime('#load', 900);
    var animation = bodymovin.loadAnimation({
        container: document.getElementById('load'),
        rederer: 'svg',
        loop: false,
        autoplay: true,
        path: '/static/intro.json'
    });
});

function removetagtime(tag, time) {
    let element = document.querySelector(tag);
    setTimeout(function() {
        element.parentNode.removeChild(element);
    }, time);
}