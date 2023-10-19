const winWidth = window.innerWidth;
let brClassSel = '';
const provId =[
    {id:'11', idSekolah:'060000'}, //aceh
    {id:'12', idSekolah:'070000'}, //sumut
    {id:'13', idSekolah:'080000'}, //sumbar
    {id:'14', idSekolah:'090000'}, //riau
    {id:'15', idSekolah:'100000'}, //jambi
    {id:'16', idSekolah:'110000'}, //sumsel
    {id:'17', idSekolah:'260000'}, //bengkulu
    {id:'18', idSekolah:'120000'}, //lampung
    {id:'19', idSekolah:'290000'}, //kep bangka belitung
    {id:'21', idSekolah:'310000'}, //kep riau
    {id:'31', idSekolah:'010000'}, //dkijakarta
    {id:'32', idSekolah:'020000'}, //jawa barat
    {id:'33', idSekolah:'030000'}, //jawa tengah
    {id:'34', idSekolah:'040000'}, //di yogyakarta
    {id:'35', idSekolah:'050000'}, //jawatimur
    {id:'36', idSekolah:'280000'}, //banten
    {id:'51', idSekolah:'220000'}, //bali
    {id:'52', idSekolah:'230000'}, //NTB
    {id:'53', idSekolah:'240000'}, //NTT
    {id:'61', idSekolah:'130000'}, //kalbar
    {id:'62', idSekolah:'140000'}, //kalteng
    {id:'63', idSekolah:'150000'}, //kalsel
    {id:'64', idSekolah:'160000'}, //kaltim
    {id:'65', idSekolah:'340000'}, //kalut
    {id:'71', idSekolah:'170000'}, //sulut
    {id:'72', idSekolah:'180000'}, //sulteng
    {id:'73', idSekolah:'190000'}, //sulsel
    {id:'74', idSekolah:'200000'}, //sultenggara
    {id:'75', idSekolah:'300000'}, //gorontalo
    {id:'76', idSekolah:'330000'}, //sulbar
    {id:'81', idSekolah:'210000'}, //maluku
    {id:'82', idSekolah:'270000'}, //maluku utara
    {id:'91', idSekolah:'320000'}, //papua barat
    {id:'94', idSekolah:'250000'}, //papua
]
const URL_API_PROFIL = 'https://6530a73e6c756603295ee17b.mockapi.io/profil'
let newData;

async function getDataFrom(localData) {
    const response = await fetch(URL_API_PROFIL)
    const userData = await response.json()

    newData = userData.filter((data)=>data.email==localData)[0]
    document.querySelector('#nav-profil-img').src = newData.avatar
    document.querySelector('#profil-img').src = newData.avatar
    document.querySelector('#profil-name').innerHTML = newData.name
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


if (winWidth<=992) {
    brClassSel = '.form-mobile '
} else {
    brClassSel = '.content-desktop '
}

const scProv = document.querySelector(brClassSel+'#selprov');
const scKab = document.querySelector(brClassSel+'#selkab');
const scKec = document.querySelector(brClassSel+'#selkec');
const scJenjang= document.querySelector(brClassSel+'#jenjang-sekolah');
const scNama= document.querySelector(brClassSel+'#nama-sekolah');
const tingkat= document.querySelector(brClassSel+'#tingkatan-bully');
const noTlp = document.querySelector(brClassSel+'#telp');

function handleGetForm() {    
    const nama = document.querySelector(brClassSel+'#nama');
    const tgl= document.querySelector(brClassSel+'#tanggal');
    const deskripsi= document.querySelector(brClassSel+'#deskripsi');
    return ({
        name:nama.value,  
        tlp:noTlp.value, 
        prov:scProv.options[scProv.selectedIndex].text, 
        kab:scKab.options[scKab.selectedIndex].text, 
        kec:scKec.options[scKec.selectedIndex].text,
        jenjang:scJenjang.options[scJenjang.selectedIndex].text, 
        sekolah:scNama.options[scNama.selectedIndex].text,
        tanggal:tgl.value,
        tingkatan:tingkat.options[tingkat.selectedIndex].text,
        desc:deskripsi.value,
    });
}

document.querySelector(brClassSel+'#pelapor').addEventListener('change', (event)=>{
    if (event.currentTarget.checked) {
        document.querySelector(brClassSel+'#telpContainer').className = "d-none"
        document.querySelector(brClassSel+'#alamatContainer').className = "d-none"
        noTlp.value = newData.telepon
        scProv.innerHTML = `<option value="ada" selected>${newData.prov}</option>`
        scKab.innerHTML = `<option value="ada" selected>${newData.kab}</option>`
        scKec.innerHTML = `<option value="ada" selected>${newData.kec}</option>`
        scJenjang.innerHTML = `<option value="ada" selected>${newData.jenjang}</option>`
        scNama.innerHTML = `<option value="ada" selected>${newData.sekolah}</option>`
        // console.log(newData)
    } else {
        document.querySelector(brClassSel+'#telpContainer').className = (winWidth<=992 ? "":"col-6 ")+"mb-3"
        document.querySelector(brClassSel+'#alamatContainer').className = "mb-3"
    }
})

document.querySelector(brClassSel+'#check-form').addEventListener('change',(event)=>{
    if (event.currentTarget.checked && !Object.values(handleGetForm()).includes('')) {
        document.querySelector(brClassSel+'#send-laporan').disabled = false;
    } else {
        document.querySelector(brClassSel+'#send-laporan').disabled = true;
    }
})

async function getProv (){
    try {
        let respons = await fetch('https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json')
        let data = await respons.json();
        data.map((data)=>{
            let opt = document.createElement("option")
            opt.text = data.name
            opt.value = data.id
            scProv.appendChild(opt);
            // console.log(data)
        })
    } catch (error) {
        console.log('cant fetch API')
    }
}

async function getKab (prov){
    try {
        let respons = await fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${prov}.json`)
        let data = await respons.json();
        data.map((data)=>{
            let opt = document.createElement("option")
            opt.text = data.name
            opt.value = data.id
            scKab.appendChild(opt);

        })
    } catch (error) {
        console.log('cant fetch API')
    }
}
async function getKec (kab){
    try {
        let respons = await fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/districts/${kab}.json`)
        let data = await respons.json();
        data.map((data)=>{
            let opt = document.createElement("option")
            opt.text = data.name
            opt.value = data.id
            scKec.appendChild(opt);
        })
    } catch (error) {
        console.log('cant fetch API')
    }
}
async function getSekolah (jenjang, prov){
    prov = provId.find((data)=>data.id==prov).idSekolah
    // console.log(prov)
    try {
        let respons = await fetch(`https://api-sekolah-indonesia.vercel.app/sekolah/${jenjang}?provinsi=${prov}&page=1&perPage=5000`)
        let data = await respons.json();
        data.dataSekolah.map((data)=>{
            let opt = document.createElement("option")
            opt.text = data.sekolah
            opt.value = data.npsn
            scNama.appendChild(opt);
        })
        // console.log(data.dataSekolah)
    } catch (error) {
        
    }
}
getProv()
scProv.addEventListener('change',()=>{
    if (scProv.value!='') {
        scKab.innerHTML='';
        let opt = document.createElement("option")
        opt.text = "Kabupaten/Kota"
        opt.value = ''
        scKab.appendChild(opt)
        getKab(scProv.value)

        if (scJenjang.value!='') {
            scNama.innerHTML='';
            let optNama = document.createElement("option")
            optNama.text = "Nama Sekolah"
            optNama.value = ''
            scKab.appendChild(optNama)
            getSekolah(scJenjang.value,scProv.value)   
        }
    }
})
scKab.addEventListener('change',()=>{
    if (scKab.value!='') {
        scKec.innerHTML='';
        let opt = document.createElement("option")
        opt.text = "Kecamatan"
        opt.value = ''
        scKec.appendChild(opt)
        getKec(scKab.value)
    }
})
scJenjang.addEventListener('change',()=>{
    if (scJenjang.value!=''&&scProv.value!='') {
        scNama.innerHTML='';
        let optNama = document.createElement("option")
        optNama.text = "Nama Sekolah"
        optNama.value = ''
        scKab.appendChild(optNama)
        getSekolah(scJenjang.value,scProv.value)
    }
})

async function sendLaporan(
    idUser,
    nama,
    nomor_Tlp,
    school_Prov,
    school_Kab,
    school_Kec,
    school_Jenjang,
    school_Nama,
    tanggal,
    tingkatan,
    deskripsi
){
    try {
        const response = await fetch(URL_API_PROFIL+`/${idUser}/laporan`,{
            method:'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nama: nama,
                nomorTlp: nomor_Tlp,
                schoolProv: school_Prov,
                schoolKab: school_Kab,
                schoolKec: school_Kec,
                schoolJenjang: school_Jenjang,
                schoolNama: school_Nama,
                tanggal: tanggal,
                tingkatanBully: tingkatan,
                deskripsi: deskripsi,
            })
        });
        location.reload()
        // const result = await response.json();
        // console.log(result);
    } catch (error) {
        console.log(error)
    }
}

document.querySelector(brClassSel+'#send-laporan').addEventListener("click",(event)=>{
    event.preventDefault;
    // console.log(handleGetForm())
    data = handleGetForm();
    sendLaporan(
        idUser=1,
        nama=data.name,
        nomor_Tlp=data.tlp,
        school_Prov=data.prov,
        school_Kab=data.kab,
        school_Kec=data.kec,
        school_Jenjang=data.jenjang,
        school_Nama=data.sekolah,
        tanggal=data.tanggal,
        tingkatan=data.tingkatan,
        deskripsi=data.desc
    )
})