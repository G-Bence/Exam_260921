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

function createTable() {
    const thead = document.getElementById("thead") as HTMLElement;
    const tbody = document.getElementById("tbody") as HTMLElement;

    thead.innerHTML = ""
    tbody.innerHTML = ""

    const tr_head = document.createElement("tr")
   /* let tr_body = document.createElement("tr")*/

    const daysUsed: string[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

    daysUsed.forEach(day => {
        const th = document.createElement("th") as HTMLElement
        th.textContent = day
        tr_head.appendChild(th)
    })

    thead.appendChild(tr_head)

    let index = 0
    do {
        const tr_body = document.createElement("tr")
        daysUsed.forEach((days) => {
            if(index >= weatherList.length){
                return;
            }
            
            let td = document.createElement("td") as HTMLElement

            const weatherListElement: weatherType = weatherList[index]
            
            console.log(weatherList.length)

            if (weatherListElement.day.toLowerCase() == days.toLowerCase()) {
                td.textContent = (weatherListElement.temperature).toString()
                td.classList.add(weatherListElement.temperature < 10 ? "cold" : weatherListElement.temperature > 30 ? "warm" : "-")
                index++
            }
            tr_body.appendChild(td)
        })
        tbody.appendChild(tr_body)

    } while (index < weatherList.length)
}


function readData(e: Event){
    e.preventDefault()
    const tempInput = document.getElementById("dailyTemp") as HTMLInputElement
    const currentDay: string = new Date().toLocaleDateString("en-EN" , { weekday: 'long' }).toString()

    const newData: weatherType = {day: currentDay, temperature: Number(tempInput.value)};

    weatherList.push(newData)

    createTable()
}


function exportData(e: Event){
    e.preventDefault()
    let json = JSON.stringify(weatherList);
    console.log(json)
    json = json.replaceAll('},{', "},\n{")

    const textarea = document.getElementById("exportArea") as HTMLTextAreaElement;
    textarea.value = json.toString();

}


await loadData()
createTable()
const dateInput = document.getElementById("dailyDate") as HTMLInputElement
dateInput.value = new Date().toISOString().split('T')[0]

const formControl = document.getElementById("mainForm") as HTMLFormElement

formControl.addEventListener("submit", (e) => {
    readData(e)
    formControl.reset()
    dateInput.value = new Date().toISOString().split('T')[0]
})

const exportBtn = document.getElementById("exportButton") as HTMLButtonElement

exportBtn.addEventListener("click", (e)=>{
    exportData(e)
})