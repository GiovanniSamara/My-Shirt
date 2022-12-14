const btnsEdit = document.querySelectorAll('.edit-btn');

for(const btnEdit of btnsEdit ){
    btnEdit.addEventListener('click',(event)=>{
        if(event.currentTarget.textContent==='Edit'){
            event.currentTarget.textContent = 'Cancel';
        }
        else{
            event.currentTarget.textContent = 'Edit';
        }
        event.currentTarget.previousElementSibling.classList.toggle('displaynone');
        event.currentTarget.previousElementSibling.previousElementSibling.previousElementSibling.classList.toggle('displaynone')
    })
}
