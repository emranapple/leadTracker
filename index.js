let myLeads = []
const inputEL = document.getElementById('input-el')
const inputBtn = document.getElementById('input-btn')
const ulEL = document.getElementById('ul-el')
const leadsFromLocalStorage = JSON.parse(localStorage.getItem('myLeads'))
const deleteBtnEl = document.getElementById('delete-btn')
const tabBtn = document.getElementById('tab-btn')
console.log(leadsFromLocalStorage)




tabBtn.addEventListener('click', function () {

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        myLeads.push(tabs[0].url)
        localStorage.setItem('myLeads', JSON.stringify(myLeads))
        render(myLeads)

    })
    
})





if(leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads)
}

inputBtn.addEventListener('click', function() {
    myLeads.push(inputEL.value)
    inputEL.value = ""
    localStorage.setItem('myLeads', JSON.stringify(myLeads))
    render(myLeads)
})

function render(leads) {
    let listItems = ''
    for (let i = 0; i < leads.length; i++) {
        listItems += 
        `
            <a target = '_blank' href= '${leads[i]}'>
                <li>${leads[i]}</li>
            </a>
        `
        
    }

    ulEL.innerHTML = listItems
}

deleteBtnEl.addEventListener('dblclick', function() {
    localStorage.clear()
    myLeads = []
    render(myLeads)
})

