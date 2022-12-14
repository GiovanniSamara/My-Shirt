




// function bukaTextBox(event){
//     const textbox2 = document.createElement('input');
//     textbox2.type='text';
//     textbox2.name = 'filter';
//     textbox2.placeholder ='Isi dengan Id Pesanan';
//     const br = document.createElement('br');
//     const textbox =document.createElement('input');
//     textbox.type = 'text';
//     textbox.name = 'update';
//     textbox.placeholder = 'Isi dengan update';
//     const buttonSubmit = document.createElement('button');
//     buttonSubmit.type = 'submit';
//     buttonSubmit.textContent = 'Submit';
//     buttonSubmit.classList = 'kumpul';

    

    
    


//     const buttonCancel = document.createElement('button');
//     buttonCancel.textContent = 'Cancel';

//     const formCancel = document.createElement('form');
//     formCancel.method = 'get';
//     formCancel.action = '/caristatus';
//     formCancel.appendChild(buttonCancel);


//     const form = document.createElement('form');
//     form.method = 'post';
//     form.action = '/updateStatus';
//     form.id = 'kirimupdate';
//     form.appendChild(textbox2);
//     form.appendChild(br);
//     form.appendChild(textbox);
//     form.appendChild(buttonSubmit);
    
//     event.currentTarget.parentElement.previousElementSibling.innerHTML ='';
//     event.currentTarget.parentElement.previousElementSibling.appendChild(form);
//     event.currentTarget.parentElement.previousElementSibling.appendChild(formCancel);
// }




const pencils = document.querySelectorAll(".ubah");
// const cancels = document.querySelectorAll('.cancel');

for(const pencil of pencils){
    pencil.addEventListener('click',(event)=>{
        if(event.currentTarget.firstElementChild.tagName==='IMG'){
            event.currentTarget.innerHTML = '<button>Cancel</button>';
        }
        else{
            event.currentTarget.innerHTML='<img src="pensil.png" alt="" >'
        }
        event.currentTarget.previousElementSibling.firstElementChild.classList.toggle('displaynone');
        event.currentTarget.previousElementSibling.firstElementChild.nextElementSibling.classList.toggle('displaynone');
        // event.currentTarget.parentElement.previousElementSibling.firstElementChild.nextElementSibling.nextElementSibling.classList.remove('displaynone');
    });
}
// for(const cancel of cancels){
//     cancel.addEventListener('click',(event)=>{
//         event.currentTarget.classList.add('displaynone');
//         event.currentTarget.parentElement.firstElementChild.classList.remove('displaynone');
//         event.currentTarget.previousElementSibling.classList.add('displaynone');
//         event.currentTarget.parentElement.previousElementSibling.classList.remove('displaynone');
//     })
// }












