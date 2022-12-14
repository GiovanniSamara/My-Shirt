
let fileField = document.querySelector("input[type='file']")

const uploadFile = (file)=>{
    let formData = new FormData();
    formData.append('foto',file)
    console.log(file);
    fetch('/uploadBukti',{
        method : 'POST',
        body :formData,
    })
    .then(res=> res.json())
    .then(json=>console.log(json))
    .catch(err=>console.error(err))    
}
fileField.addEventListener('change',()=>{
    uploadFile(fileField.files[0])
    
})


