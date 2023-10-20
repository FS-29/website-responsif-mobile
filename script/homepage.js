const URL_API_PROFIL = 'https://6530a73e6c756603295ee17b.mockapi.io/profil'
const winWidth = window.innerWidth;
let localDataEmail 
let brClassSel = '';

if (winWidth<=768) {
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
    document.querySelector('#profil-name').innerHTML = newData.name
    // console.log(newData);
}

function checkStateLogin() {
    localDataEmail = localStorage.getItem('email');
    if (winWidth<=992) {
        
        if (localDataEmail) {
            getDataFrom(localData=localDataEmail)
            document.querySelector('#'+brClassSel+'profilOn').className = "nav-item "
            document.querySelector('#'+brClassSel+'profilOff').className = "nav-item d-none"
        } else {
            document.querySelector('#'+brClassSel+'profilOn').className = "nav-item d-none"
            document.querySelector('#'+brClassSel+'profilOff').className = "nav-item"
        }   
    } else {
        if (localDataEmail) {
            getDataFrom(localData=localDataEmail)
            document.querySelector('#'+brClassSel+'profilOn').className = "nav-item ps-3 pe-5 "
            document.querySelector('#'+brClassSel+'profilOff').className = "nav-item ps-3 pe-3 d-flex flex-row align-items-center gap-2 d-none"
        } else {
            document.querySelector('#'+brClassSel+'profilOn').className = "nav-item ps-3 pe-5 d-none"
            document.querySelector('#'+brClassSel+'profilOff').className = "nav-item ps-3 pe-3 d-flex flex-row align-items-center gap-2"
        } 
        
    }
}
checkStateLogin()

document.querySelector('#'+brClassSel+'btn-logout').addEventListener("click",()=>{
    localStorage.removeItem("email");
    window.location.href = 'index.html'
})

document.querySelector('#kirim-aduan').addEventListener('click',()=>{
    if (localDataEmail) {
        window.location.href='/form-lapor.html'
    } else {
        window.location.href='/login.html'
    }
})
document.querySelector('#kirim-aduan-float').addEventListener('click',()=>{
    if (localDataEmail) {
        window.location.href='/form-lapor.html'
    } else {
        window.location.href='/login.html'
    }
})

