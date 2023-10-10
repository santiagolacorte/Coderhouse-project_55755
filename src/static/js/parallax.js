let stars = document.getElementById('stars');
let moon = document.getElementById('moon');
let house = document.getElementById('house');
let main_text = document.getElementById('main-text');
let secondary_bg = document.getElementById('secondary-background');
let main_button = document.getElementById('main-button');
let left_ghost = document.getElementById('left-ghost');
let right_ghost = document.getElementById('right-ghost');

window.addEventListener('scroll', function() {
    let value = window.scrollY;
    stars.style.left = value * 0.5 + 'px';
    moon.style.left = value * 0.15 + 'px';
    moon.style.top = value * 0.3 + 'px';
    house.style.top = value * 0.15 + 'px';
    secondary_bg.style.top = value * 0.15 + 'px';
    main_button.style.marginTop = value + 'px';
    left_ghost.style.left = value * 0.3 + 'px';
    right_ghost.style.top = value * -0.5 + 'px';
})