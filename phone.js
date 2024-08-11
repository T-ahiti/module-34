
const loadPhone = async (searchText, isShowAll) =>{
     const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
     const data = await res.json()
     const phones = data.data
     console.log(phones)
     displayPhones(phones, isShowAll)
}

const displayPhones = (phones, isShowAll) =>{

     // 1. call by id
     const phoneCont = document.getElementById('phoneContainer')
     //  clear phone container cards before adding new cards
     phoneCont.textContent = ''

    //  display show all button if there are more than 18 phones
    const showButton = document.getElementById('ShowAllContainer')
    if( phones.length > 18 && !isShowAll){
        ShowAllContainer.classList.remove('hidden')
    }
    else{
        ShowAllContainer.classList.add('hidden')
    }
    // console.log('is show all', isShowAll)

    // display only first 18 phones if not show all
    if(!isShowAll){
        phones = phones.slice(0,18)
    }


    phones.forEach(phone => {
    console.log(phone)
    // 2. select the div
    const phoneCard = document.createElement('div')
    phoneCard.classList = `card bg-base-100 w-72 shadow-xl`
    // 3. set inner HTML
    phoneCard.innerHTML = `
        <figure class="px-10 pt-10">
          <img src="${phone.image}" alt="phone" class="rounded-xl" />
        </figure>
        <div class="card-body items-center text-center">
          <h2 class="card-title">${phone.phone_name}</h2>
          <p>There are many variations of passages of available, but the majority have suffered</p>
          <p class="font-bold">$999</p>
          <div class="card-actions">
            <button onclick="handleShowDetail('${phone.slug}')" class="btn btn-primary text-white">Show Details</button>
          </div>
        </div>
    `
    // 4. append child 
    phoneCont.appendChild(phoneCard)
    });

    // hide loading bar
    toggleLoadingBar(false)
} 

// 
const handleShowDetail = async(id) =>{
//    console.log('clicked show details', id)
   const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
   const data = await res.json()
   const phone = data.data
   showPhoneDetails(phone)
}

const showPhoneDetails = (phone) =>{
    // console.log(phone)
    const phoneName = document.getElementById('phone-name')
    phoneName.innerText = phone.name
    const showDetailContainer = document.getElementById('detailContainer')
    showDetailContainer.innerHTML = `
     <img src="${phone.image}" class="text-center" alt="">
     <p><span class="font-bold">${phone?.mainFeatures?.storage}</span></p>
     <p><span class="font-bold">${phone?.mainFeatures?.displaySize}</span></p>
     <p><span class="font-bold">${phone?.mainFeatures?.chipSet}</span></p>
     <p><span class="font-bold">${phone?.slug}</span></p>
     <p><span class="font-bold">${phone?.releaseDate}</span></p>
     <p><span class="font-bold">${phone?.brand}</span></p>
     <p><span class="font-bold">${phone?.others?.GPS}</span></p>
    `
    showDetailsModal.showModal()
}

// handle search button
 const handleSearch = (isShowAll) => {
    toggleLoadingBar(true)
    const searchbar = document.getElementById('searchField')
    const getText = searchbar.value 
    console.log(getText)
    loadPhone(getText, isShowAll)
 }

 const toggleLoadingBar = (isLoading) =>{
    const loadingBar = document.getElementById('loadingBar')
    if(isLoading){
        loadingBar.classList.remove('hidden')
    }
    else{
        loadingBar.classList.add('hidden')
    }
 }


//  handle show all
const handleShowAll = () =>{
    handleSearch(true)
}

// loadPhone()