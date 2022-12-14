const tombolubah = document.querySelectorAll('.ubah');

for(const ubah of tombolubah ){
    ubah.addEventListener('click',(event)=>{
        if(event.currentTarget.textContent=='Cancel'){
            event.currentTarget.innerHTML = '<img class="edit-img" src="pensil.png" alt="" />'
        }
        else{
            event.currentTarget.innerHTML = 'Cancel'
        }
        event.currentTarget.previousElementSibling.classList.toggle('displaynone');
        event.currentTarget.previousElementSibling.previousElementSibling.classList.toggle('displaynone');

    })
}