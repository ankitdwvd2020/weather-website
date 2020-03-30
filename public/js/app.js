const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const yourLocation = search.value
    if(!yourLocation){
        return console.log('Please Enter your location')
    }
    fetch('/weather?address='+yourLocation).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                messageOne.textContent = 'Unable to find your location,please enter your correct address'
            }else{
                messageOne.textContent = data.location,
                messageTwo.textContent = data.forecastData
            }            
        })
    })
})