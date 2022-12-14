const formtambahakun = document.querySelector('.tampilkan');
const formhilangkanakun = document.querySelector('.input .hilangkan');

formtambahakun.addEventListener('click',()=>{
    document.querySelector('.input').classList.remove('displaynone');
})

formhilangkanakun.addEventListener('click',()=>{
    document.querySelector('.input').classList.add('displaynone');
})

const formhapusakun = document.querySelector('.hapuskan');
const formditutup = document.querySelector('.hapus .hilangkan');

formhapusakun.addEventListener('click',()=>{
    document.querySelector('.hapus').classList.remove('displaynone');
})

formditutup.addEventListener('click',()=>{
    document.querySelector('.hapus').classList.add('displaynone');
})