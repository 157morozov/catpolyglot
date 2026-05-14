// Slider

const containerSlides = document.getElementById("slides")
const slidesArray = document.querySelectorAll(".slide")
const buttonChangeSlideArray = document.querySelectorAll(".slider-change-slide")

containerSlides.style.width = `${100 * slidesArray.length}%`
let activeSlideIndex = 1

buttonChangeSlideArray.forEach(button => {
    button.addEventListener("click", () => {
        let nextSlideIndex = button.getAttribute("data-slide-id")
        containerSlides.style.transform = `translateX(-${100 / slidesArray.length * (nextSlideIndex - 1)}%)`
        buttonChangeSlideArray.forEach(deactiveButton => {
            deactiveButton.classList.remove("active")
        })
        button.classList.add("active")
        activeSlideIndex = nextSlideIndex
    })
})

setInterval(() => {
    openNextSlide()
}, 5000)

function openNextSlide() {
    if (activeSlideIndex < slidesArray.length) activeSlideIndex++
    else activeSlideIndex = 1

    buttonChangeSlideArray.forEach(button => {
        if (button.getAttribute("data-slide-id") == activeSlideIndex) button.classList.add("active")
        else button.classList.remove("active")
    })

    containerSlides.style.transform = `translateX(-${100 / slidesArray.length * (activeSlideIndex - 1)}%)`
}

function openPreviousSlide() {
    if (activeSlideIndex === 1) activeSlideIndex = slidesArray.length
    else activeSlideIndex--

    buttonChangeSlideArray.forEach(button => {
        if (button.getAttribute("data-slide-id") == activeSlideIndex) button.classList.add("active")
        else button.classList.remove("active")
    })

    containerSlides.style.transform = `translateX(-${100 / slidesArray.length * (activeSlideIndex - 1)}%)`
}

let touchStartX = 0
let touchEndX = 0

containerSlides.addEventListener("touchstart", event => {
    touchStartX = event.changedTouches[0].screenX
})

containerSlides.addEventListener("touchend", event => {
    touchEndX = event.changedTouches[0].screenX

    if (touchEndX < touchStartX - 100) openNextSlide()
    if (touchEndX > touchStartX + 100) openPreviousSlide()
})