const request = async(e) => {
    document.getElementById("cards").innerHTML = "";
    const response = await fetch("data.json");
    const json = await response.json();
    populateCards(json, e)
}


function populateCards(data, e) {
    const cards = data.forEach((element) => {
        cardFrame(element, e)
    })
}

function cardFrame(data, e) {

    //Generate image
    const img = document.createElement("img")
        //Generate background color
    const bg = bgColor(data.title)
    img.src = bg.img

    const selectedTimeFrame = e.target.id
    const selectedTimeFrameSentence = sentence(e)


    const newCard = document.createElement("div")
    newCard.style.backgroundColor = bg.color;
    newCard.classList.add("activities-card")

    const divReportLeft = document.createElement("div")
    divReportLeft.classList.add("divReportLeft")
    const divReportRight = document.createElement("div")
    divReportRight.classList.add("divReportRight")

    const bodyCard = document.createElement("div")
    bodyCard.classList.add("report-body")

    const activity = document.createElement("h3")
    activity.classList.add("activity")
    activity.textContent = data.title

    const current = document.createElement("h2")
    current.classList.add("current")
    current.textContent = `${data.timeframes[selectedTimeFrame].current}hrs`

    divReportLeft.appendChild(activity)
    divReportLeft.appendChild(current)

    const reportMenu = document.createElement("h3")
    reportMenu.classList.add("reportMenu")
    reportMenu.textContent = "..."

    const previous = document.createElement("h2")
    previous.classList.add("previous")
    previous.textContent = `${selectedTimeFrameSentence}${data.timeframes[selectedTimeFrame].previous}hrs`


    divReportRight.appendChild(reportMenu)
    divReportRight.appendChild(previous)

    bodyCard.appendChild(divReportLeft)
    bodyCard.appendChild(divReportRight)


    const element = document.getElementById("cards")

    //Generate card
    newCard.appendChild(bodyCard)
    newCard.appendChild(img)
    element.appendChild(newCard)
}

function sentence(e) {
    switch (e.target.id) {

        case "daily":
            return "Last Day - "
            break;
        case "weekly":
            return "Last Week - "
            break;
        case "monthly":
            return "Last Month - "
            break;

        default:
            return "Empty"
    }
}

function bgColor(data) {
    switch (data) {

        case "Work":
            return { color: "orange", img: "./images/icon-work.svg" }
            break;
        case "Play":
            return { color: "aqua", img: "./images/icon-play.svg" }
            break;
        case "Study":
            return { color: "magenta", img: "./images/icon-study.svg" }
            break;
        case "Exercise":
            return { color: "green", img: "./images/icon-exercise.svg" }
            break;
        case "Social":
            return { color: "blue", img: "./images/icon-social.svg" }
            break;
        case "Self Care":
            return { color: "yellow", img: "./images/icon-self-care.svg" }
            break;
        default:
            return { color: "white" }
    }
}

request({ target: { id: "daily" } })
document.getElementById("daily").addEventListener("click", request);
document.getElementById("weekly").addEventListener("click", request);
document.getElementById("monthly").addEventListener("click", request);