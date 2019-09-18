const box1 = document.getElementById('rules');
const box2 = document.getElementById('mission');
const box3 = document.getElementById('join');

box1.addEventListener('mouseenter', () => {
    box2.classList.add('hide');
    box3.classList.add('hide');
    box1.style.position = 'fixed';
})