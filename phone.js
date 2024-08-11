
const loadPhone = async () =>{
     const res = await fetch('https://openapi.programming-hero.com/api/phones?search=iphone')
     const data = await res.json()
     const phones = data.data
     console.log(phones)
     displayPhones(phones)
}

const displayPhones = phones =>{

     // 1. call by id
     const phoneCont = document.getElementById('phoneContainer')

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
            <button class="btn btn-primary text-white">Show Details</button>
          </div>
        </div>
    `
    // 4. append child 
    phoneCont.appendChild(phoneCard)
    });
}

loadPhone()