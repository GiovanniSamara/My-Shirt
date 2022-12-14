const edits = document.querySelectorAll('.edit');
const editjahits = document.querySelectorAll('.editjahit');
const editdeskripsibahan = document.querySelectorAll('.editdeskripsibahan');
for(const edit of edits){
    edit.addEventListener('click',(event)=>{
        if(event.currentTarget.firstElementChild.textContent==='edit harga'){
            event.currentTarget.firstElementChild.textContent='Cancel';
        }
        else{
            event.currentTarget.firstElementChild.textContent='edit harga'
        }
        event.currentTarget.previousElementSibling.previousElementSibling.previousElementSibling.firstElementChild.classList.toggle('displaynone');
        event.currentTarget.previousElementSibling.previousElementSibling.previousElementSibling.firstElementChild.nextElementSibling.classList.toggle('displaynone');
    })
}

for(const editjahit of editjahits){
    editjahit.addEventListener('click',(event)=>{
        if(event.currentTarget.firstElementChild.textContent==='edit biaya jahit'){
            event.currentTarget.firstElementChild.textContent='Cancel';
        }
        else{
            event.currentTarget.firstElementChild.textContent='edit biaya jahit'
        }
        event.currentTarget.previousElementSibling.previousElementSibling.firstElementChild.classList.toggle('displaynone');
        event.currentTarget.previousElementSibling.previousElementSibling.firstElementChild.nextElementSibling.classList.toggle('displaynone');
    })
}

for(const editbahan of editdeskripsibahan){
    editbahan.addEventListener('click',(event)=>{
        if(event.currentTarget.firstElementChild.textContent==='edit deskripsi'){
            event.currentTarget.firstElementChild.textContent='Cancel';
        }
        else{
            event.currentTarget.firstElementChild.textContent='edit deskripsi'
        }
        event.currentTarget.previousElementSibling.firstElementChild.classList.toggle('displaynone');
        event.currentTarget.previousElementSibling.firstElementChild.nextElementSibling.classList.toggle('displaynone');
    })
}


const editHarga = document.querySelectorAll('.editaksharga');
const editStock = document.querySelectorAll('.editstock');

for(const harga of editHarga){
    harga.addEventListener('click',(event)=>{
        if(event.currentTarget.firstElementChild.textContent==='edit harga'){
            event.currentTarget.firstElementChild.textContent='Cancel';
        }
        else{
            event.currentTarget.firstElementChild.textContent='edit harga'
        }
        event.currentTarget.previousElementSibling.previousElementSibling.firstElementChild.classList.toggle('displaynone');
        event.currentTarget.previousElementSibling.previousElementSibling.firstElementChild.nextElementSibling.classList.toggle('displaynone');
    })
}

for(const stock of editStock){
    stock.addEventListener('click',(event)=>{
        if(event.currentTarget.firstElementChild.textContent==='edit stock'){
            event.currentTarget.firstElementChild.textContent='Cancel';
        }
        else{
            event.currentTarget.firstElementChild.textContent='edit stock'
        }
        event.currentTarget.previousElementSibling.previousElementSibling.firstElementChild.classList.toggle('displaynone');
        event.currentTarget.previousElementSibling.previousElementSibling.firstElementChild.nextElementSibling.classList.toggle('displaynone');
    })
}