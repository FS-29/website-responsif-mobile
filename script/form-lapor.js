const winWidth = window.innerWidth;
let brClassSel = '';

if (winWidth<=992) {
    brClassSel = '.form-mobile '
} else {
    brClassSel = '.content-desktop '
}

const scProv = document.querySelector(brClassSel+'#selprov');
const scKab = document.querySelector(brClassSel+'#selkab');
const scKec = document.querySelector(brClassSel+'#selkec');
const scNama= document.querySelector(brClassSel+'#nama-sekolah');
const tingkat= document.querySelector(brClassSel+'#tingkatan-bully');

function handleGetForm() {    
    const nama = document.querySelector(brClassSel+'#nama');
    const noTlp = document.querySelector(brClassSel+'#telp');
    const tgl= document.querySelector(brClassSel+'#tanggal');
    const deskripsi= document.querySelector(brClassSel+'#deskripsi');
    return ({
        name:nama.value,  
        tlp:noTlp.value, 
        prov:scProv.value, 
        kab:scKab.value, 
        kec:scKec.value, 
        sekolah:scNama.value,
        tanggal:tgl.value,
        tingkatan:tingkat.value,
        desc:deskripsi.value,
    });
}

document.querySelector(brClassSel+'#pelapor').addEventListener('change', (event)=>{
    if (event.currentTarget.checked) {
        document.querySelector(brClassSel+'#telpContainer').className = "d-none"
        document.querySelector(brClassSel+'#alamatContainer').className = "d-none"
        
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

getProv()
scProv.addEventListener('change',()=>{
    if (scProv.value!='') {
        scKab.innerHTML='';
        let opt = document.createElement("option")
        opt.text = "Kabupaten/Kota"
        opt.value = ''
        scKab.appendChild(opt)
        getKab(scProv.value)
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

document.querySelector(brClassSel+'#send-laporan').addEventListener("click",(event)=>{
    event.preventDefault;
    console.log(handleGetForm())
})