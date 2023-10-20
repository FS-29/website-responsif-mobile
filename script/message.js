const URL_API_PROFIL = 'https://6530a73e6c756603295ee17b.mockapi.io/profil'
let newDataKonselor;
const winWidth = window.innerWidth;
let brClassSel = '';
let role;
let dataS = [];
let contentPesanKonselor = [
    {masuk:'Halo apa Kabar', keluar:''},
    {masuk:'Bagaimana Keadanmu?', keluar:''},
]

let contentPesanAdmin = [
    {masuk:'Halo apa Kabar', keluar:''},
    {masuk:'Perkenalkan Saya Robert, Admin dari website yang akan memandu kamu', keluar:''},
]

if (winWidth<=992) {
    brClassSel = 'mobile-'
} else {
    brClassSel = 'desktop-'
}

async function getDataFrom(localData) {
    const response = await fetch(URL_API_PROFIL)
    const userData = await response.json()
    
    newDataKonselor = userData.filter((data)=>data.email==localData)[0]
    document.querySelector('#nav-profil-img').src = newDataKonselor.avatar
    document.querySelector('#profil-img').src = newDataKonselor.avatar
    document.querySelector('#desktop-profil-sdbar').src = newDataKonselor.avatar
    document.querySelector('#profil-name').innerHTML = newDataKonselor.name
    // console.log(document.querySelector('#desktop-profil-sdbar'))
}
function addNewMessageList(data) {
    let element = ''
    if (winWidth<=992) {
        data.forEach((dataPengirim,index) => {
            element = element+`<button class="btn rounded-start-5 p-2 shadow" style="--bs-btn-border-width:0;" data-bs-toggle="offcanvas" data-bs-target="#db-message" aria-controls="db-message" aria-label="Toggle docs navigation"  id="mobile-pesanKe-${index+1}" onclick="pesanClicked(event)" >
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
        data.forEach((dataPengirim,index) => {
            element = element+`<button class="btn rounded-start-5 p-2 shadow" style="--bs-btn-border-width:0;" data-bs-toggle="" data-bs-target="" aria-controls="" aria-label=""  id="desktop-pesanKe-${index+1}" onclick="pesanClicked(event)">
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

    
    let dataList = {
        nama:konselorData.name,
        avatar:konselorData.avatar,
        isi:konselorData.role
    }
    dataS.push(dataList)
    // dataS.push(dataList)

    addNewMessageList(dataS)
    // changeHeaderPesan(konselorData.avatar,konselorData.name,konselorData.role)
    // console.log(userData)
}
async function getDataAdmin() {
    const response = await fetch(URL_API_PROFIL+'/1')
    const adminData = await response.json()

    
    let dataList = {
        nama:adminData.name,
        avatar:adminData.avatar,
        isi:adminData.role
    }
    dataS.push(dataList)
    // dataS.push(dataList)

    addNewMessageList(dataS)
    // changeHeaderPesan(konselorData.avatar,konselorData.name,konselorData.role)
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
function stringPesanMasuk(pesan=''){
    if (pesan=='') {
        return ''
    }
    return (`<div class="d-flex justify-content-start ps-4" id="pesan-masuk">
                <div class="rounded-4 ps-2 pe-2" style="max-width: 80%; background-color: var(--color11);">
                    <p class="m-2">${pesan}</p>
                </div>
            </div>
            `)
}

function stringPesanKeluar(pesan=''){
    if (pesan=='') {
        return ''
    }
    return (`<div class="d-flex justify-content-end pe-4" id="pesan-keluar">
                <div class="rounded-4 ps-2 pe-2" style="max-width: 80%; background-color: var(--color12);">
                    <p class="m-2">${pesan}</p>
                </div>
            </div>
            `)
}
function changeHeaderPesan(url,nama,role) {
    document.querySelector('#'+brClassSel+'header-img').src = url
    document.querySelector('#'+brClassSel+'header-nama').innerHTML = nama
    document.querySelector('#'+brClassSel+'header-role').innerHTML = role
}
async function renderPesan() {
    let list = document.querySelector('#'+brClassSel+'message-body')
    list.innerHTML = ''
    let dataNow = list.innerHTML
    if (role =='admin') {
        contentPesanAdmin.forEach((pesan)=>{
            dataNow = dataNow + stringPesanMasuk(pesan.masuk) +stringPesanKeluar(pesan.keluar)
        })
    } else if(role =='konselor') {
        contentPesanKonselor.forEach((pesan)=>{
            dataNow = dataNow + stringPesanMasuk(pesan.masuk) +stringPesanKeluar(pesan.keluar)
        })
    }
    
    list.innerHTML = dataNow   
}
function pesanClicked(e){
    const idTarget = e.currentTarget.id
    // const idNum = idTarget[idTarget.length-1]
    let url,nama;
    url = document.querySelector('#'+idTarget+' img').src
    nama = document.querySelector('#'+idTarget+' h5').textContent
    role = document.querySelector('#'+idTarget+' p').textContent
    // console.log()
    changeHeaderPesan(url,nama,role)
    if (winWidth>992) {
        document.querySelector('#content-message').className = 'col-6 col-xl-7 ps-0 d-flex flex-column'
    }

    renderPesan()

}

checkStateLogin()
getDataKonselor()
getDataAdmin()

document.querySelector('#desktop-close-message').addEventListener("click",()=>{
    if (winWidth>992) {
        document.querySelector('#content-message').className = 'col-6 col-xl-7 ps-0 d-flex flex-column d-none'
    }
})
document.querySelector('#'+brClassSel+'sendBtn').addEventListener("click",()=>{
    let inputMessage =  document.querySelector('#'+brClassSel+'message-input #input-text')
    if (role == 'admin' ) {
        contentPesanAdmin.push({masuk:'',keluar:inputMessage.value})
    } else if(role =='konselor') {
        contentPesanKonselor.push({masuk:'',keluar:inputMessage.value})
    }
    renderPesan()
    inputMessage.value = ''
})

document.querySelector('#'+brClassSel+'btn-logout').addEventListener("click",()=>{
    localStorage.removeItem("email");
    location.reload()
})
document.querySelector('#'+brClassSel+'btn-profil-logout').addEventListener("click",()=>{
    localStorage.removeItem("email");
    location.reload()
})
