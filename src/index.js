document.addEventListener('DOMContentLoaded', () => {


let dogData 
fetch("http://localhost:3000/dogs")
.then(response => response.json())
.then(data => {
    dogData = data
    
    updateTable(data)
})

const updateTable = (data) => {
    console.log(data)
    data.forEach(item => {
        const tbody = document.getElementById("table-body")
        const trow = document.createElement("tr")
        const td1 = document.createElement("td")
        td1.innerText = item.name
        const td2 = document.createElement("td")
        td2.innerText = item.breed
        const td3 = document.createElement("td")
        td3.innerText = item.sex
        const td4 = document.createElement("td")
        const button = document.createElement("button")
        button.innerText = "Edit Dog"
        td4.appendChild(button)

       trow.appendChild(td1)
       trow.appendChild(td2)
       trow.appendChild(td3)
       trow.appendChild(td4)
       tbody.appendChild(trow)

       button.addEventListener("click", () => {
        console.log(item)
        console.log(dogData)
         editaBle(item)
       })
    })
}
const editaBle = (data) => {
    const form = document.querySelector("form")
    form.elements[0].value = data.name
    form.elements[1].value = data.breed
    form.elements[2].value = data.sex
 const dataObj = {
    "name" : form.elements[0].value,
    "breed": form.elements[1].value,
    "sex" : form.elements[2].value

 }
    form.addEventListener("submit", (e)  => {
        e.preventDefault()
    return fetch(`http://localhost:3000/dogs/${data.id}`,{
        method : 'PATCH',
        headers : {
            'Content-Type': 'application/json',   
        },
        body: JSON.stringify(dataObj)
    })
    .then(response => response.json())
    .then(data => console.log(data))

    })
    
}

    


    // console.log(form.elements[0].value)


})