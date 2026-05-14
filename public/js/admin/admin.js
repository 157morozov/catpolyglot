const timeOfDay = {
    "morning": "Доброе утро! ☀️",
    "afternoon": "Добрый день! ✨",
    "evening": "Добрый вечер! 🌅",
    "night": "Спокойной ночи! 🌃",
    "default": "Добро пожаловать!",
}

const titleHeading = document.getElementById("title")
const currentDate = new Date()
const currentHour = currentDate.getHours()
let currentTimeOfDay

if (currentHour >= 5 && currentHour < 12) currentTimeOfDay = "morning"
else if (currentHour >= 12 && currentHour < 17) currentTimeOfDay = "afternoon"
else if (currentHour >= 17 && currentHour < 22) currentTimeOfDay = "evening"
else if (currentHour >= 22 || currentHour < 5) currentTimeOfDay = "night"
else currentTimeOfDay = "default"

titleHeading.textContent = timeOfDay[currentTimeOfDay]