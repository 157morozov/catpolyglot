// Menu controller

const buttonMenu = document.getElementById("menu")
const containerNav = document.getElementsByTagName("nav")[0]
let isMenuOpen = false

buttonMenu.addEventListener("click", () => {
    // Change menu state
    isMenuOpen = !isMenuOpen
    // Nav open/close
    if (isMenuOpen) {
        containerNav.classList.add("active")
        buttonMenu.style.transform = "rotate(90deg)"
    } else {
        containerNav.classList.remove("active")
        buttonMenu.style.transform = "rotate(0deg)"
    }
})