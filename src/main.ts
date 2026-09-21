import type { weatherType } from "./weather";

const API_URL = "https://petrik-idojaras-default-rtdb.europe-west1.firebasedatabase.app/.json"
const weatherList: weatherType[] = []

async function loadData() {
    const response = await fetch(API_URL)
    if (!response.ok) {
        throw new Error("Fetching data was unsuccessful!")
    }
    const data: weatherType[] = await response.json()
    data.forEach(element => {
        weatherList.push(element)
        /*console.log(element)*/
    });
}


await loadData()
createTable()


function createTable() {
    const thead = document.getElementById("thead") as HTMLElement;
    const tbody = document.getElementById("tbody") as HTMLElement;
    const tr_head = document.createElement("tr")
    let tr_body = document.createElement("tr")

    const daysUsed: string[] = []

    weatherList.forEach((element, index) => {
        if (!daysUsed.includes(element.day)) {
            const th = document.createElement("th") as HTMLElement
            th.textContent = element.day
            tr_head.appendChild(th)
            daysUsed.push(element.day)
        }

        if (index % 7 == 0 || index == 0) {
            tr_body = document.createElement("tr")
        }


        let td: HTMLElement 

        do {
            td = document.createElement("td") as HTMLElement
            tr_body.appendChild(td)
        } while (element.day == daysUsed[index])

        td.textContent = (element.temperature).toString()
        td.classList.add(element.temperature < 10 ? "cold" : element.temperature > 30 ? "warm" : "-")


        console.log(index)

        if (index % 7 == 0) {
            tbody.appendChild(tr_body)
        }
    })

    thead.appendChild(tr_head)
}