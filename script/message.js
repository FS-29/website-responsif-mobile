const URL_API_PROFIL = 'https://6530a73e6c756603295ee17b.mockapi.io/profil'
let newData;
const winWidth = window.innerWidth;
let brClassSel = '';

if (winWidth<=992) {
    brClassSel = 'mobile-'
} else {
    brClassSel = 'desktop-'
}

async function getDataFrom(localData) {
    const response = await fetch(URL_API_PROFIL)
    const userData = await response.json()
    
    newData = userData.filter((data)=>data.email==localData)[0]
    document.querySelector('#nav-profil-img').src = newData.avatar
    document.querySelector('#profil-img').src = newData.avatar
    document.querySelector('#desktop-profil-sdbar').src = newData.avatar
    document.querySelector('#profil-name').innerHTML = newData.name
    // console.log(document.querySelector('#desktop-profil-sdbar'))
}
function addNewMessageList(data) {
    let element = ''
    if (winWidth<=992) {
        data.forEach((dataPengirim) => {
            element = element+`<button class="btn rounded-start-5 p-2 shadow" style="--bs-btn-border-width:0;" data-bs-toggle="offcanvas" data-bs-target="#db-message" aria-controls="db-message" aria-label="Toggle docs navigation" >
                                    <div class="d-flex flex-row align-items-center gap-4 p-2" >
                                        <img src="${dataPengirim.avatar}" class="rounded-circle" style="width: 60px; height: 60px;" alt="">
                                        <div class="d-flex flex-column align-items-start gap-1">
                                            <h5 class="fw-semibold" style="margin: 0;">${dataPengirim.nama}</h5>
                                            <p class="" style="margin: 0;">${dataPengirim.isi}</p>
                                        </div>
                                    </div>
                                </button>`
            
        });    
    }else{
        data.forEach((dataPengirim) => {
            element = element+`<button class="btn rounded-start-5 p-2 shadow" style="--bs-btn-border-width:0;" data-bs-toggle="" data-bs-target="" aria-controls="" aria-label="" >
                                    <div class="d-flex flex-row align-items-center gap-4 p-2" >
                                        <img src="${dataPengirim.avatar}" class="rounded-circle" style="width: 60px; height: 60px;" alt="">
                                        <div class="d-flex flex-column align-items-start gap-1">
                                            <h5 class="fw-semibold" style="margin: 0;">${dataPengirim.nama}</h5>
                                            <p class="" style="margin: 0;">${dataPengirim.isi}</p>
                                        </div>
                                    </div>
                                </button>`
            
        });
    }
    document.querySelector('#'+brClassSel+'messageList').innerHTML = element

    // console.log(element)
}

async function getDataKonselor() {
    const response = await fetch(URL_API_PROFIL+'/3')
    const konselorData = await response.json()

    let dataS = []
    let dataList = {
        nama:konselorData.name,
        avatar:konselorData.avatar,
        isi:"Halo apa Kabar "
    }
    dataS.push(dataList)
    // dataS.push(dataList)

    addNewMessageList(dataS)
    // console.log(userData)
}

function checkStateLogin() {
    const data = localStorage.getItem('email');
    if (data) {
        getDataFrom(localData=data)
    } else {
        window.location.href = 'index.html';
    }
}

checkStateLogin()
getDataKonselor()