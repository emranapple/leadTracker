
let myLeads = []
const inputEl = document.getElementById('input-el')
const btnEl = document.getElementById('btn-el')
const ulEl = document.getElementById('ul-el')
const clearEl = document.getElementById('clear-el')
const tabBtn = document.getElementById('tab-btn')

let leadsFromLocalStorage = JSON.parse(localStorage.getItem('myLeads'))

tabBtn.addEventListener('click', function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        myLeads.push(tabs[0].url)
        localStorage.setItem('myLeads', JSON.stringify(myLeads))
        render(myLeads)

    })
})

btnEl.addEventListener('click', function () {
    myLeads.push(inputEl.value)
    localStorage.setItem('myLeads', JSON.stringify(myLeads))
    render(myLeads)
    clearInputField()
})

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads)
}

function render(leads) {
    let listItems = ''
    for (let i = 0; i < leads.length; i++) {
        listItems += `<li><a target='_blank' href="${leads[i]}">${leads[i]}</a></li>`
    }
    ulEl.innerHTML = listItems

}

function clearInputField() {
    inputEl.value = ''

}

clearEl.addEventListener("dblclick", function () {
    localStorage.clear(myLeads)
    myLeads = []
    render(myLeads)
})
