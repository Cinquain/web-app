// const box1 = document.getElementById('box1');

// box1.addEventListener('click', () => {

//     location.href = 'https://www.google.com/'
// });

$(document).ready(function() {

    $('#box1').on('click', () => {
        $(location).attr('href', '../blog/find_abandoned_places.html')
    });
});