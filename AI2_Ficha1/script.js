const slides = document.querySelectorAll('.slides img');
let currentSlide = 0;

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    slides[index].classList.add('active');
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}

setInterval(nextSlide, 5000);

function showGrid(gridId) {
    const grids = document.querySelectorAll('.filmes-grid');
    grids.forEach(grid => {
        grid.classList.remove('active');
    });
    document.getElementById(gridId).classList.add('active');
}