window.addEventListener('resize', function() {
    if (window.innerWidth <= 768) {
        document.querySelector('.menu-items').style.display = 'none';
        document.querySelector('#menu-select').style.display = 'block';
    } else {
        document.querySelector('.menu-items').style.display = 'flex';
        document.querySelector('#menu-select').style.display = 'none';
    }
});