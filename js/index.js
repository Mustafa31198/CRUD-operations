var siteNameInput = document.getElementById('siteName');
var siteUrlInput = document.getElementById('siteUrl');
var tableBody = document.getElementById('siteData');
var container = [];


if (localStorage.getItem('Site') !== null) {
    container = JSON.parse(localStorage.getItem('Site'));
    display();
};
function submitSite() {

  if(
    validateForm(siteNameInput)&&
    validateForm(siteUrlInput)
){
    Swal.fire({
        position: "center",
        icon: "success",
        title: "Your Website has been saved",
        showConfirmButton: false,
        timer: 1500
      });
      
    var site = {
        name: siteNameInput.value,
        url: siteUrlInput.value
    };
    container.push(site);
    
    localStorage.setItem('Site', JSON.stringify(container));

    clearForm();
    display();
  }
  else{
    Swal.fire({
        icon: "error",
        title: "Sorry",
        text: "Something went wrong!",
       

      });
      
    
  }

};


function clearForm() {
    siteNameInput.value = null;
    siteUrlInput.value = null;
    siteNameInput.classList.remove('is-valid')
    siteUrlInput.classList.remove('is-valid')
}

var index;

function display() {
    index = i;
    var cartona = '';
    for (var i = 0; i < container.length; i++) {
        cartona += ` <tr>
            <td class="py-2">${i + 1}</td>
            <td class="py-2">${container[i].name}</td>
            <td class="py-2"><a target="_blank"  href="${container[i].url}"><button onclick='visitSite()' id="visitSite" class="btn btn-success"><i class="fa-solid fa-eye me-2"></i>Visit</button></a></td>
            <td class="py-2"><button onclick='deleteSite(${i})' id="deleteSite" class="btn btn-danger"><i class="fa-solid fa-trash me-2"></i>Delete</button></td>
        </tr>`};
    document.getElementById('siteData').innerHTML = cartona;

};
function deleteSite(index) {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-success",
            cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            display();
            localStorage.setItem('Site', JSON.stringify(container));
            swalWithBootstrapButtons.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
            });
        } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire({
                title: "Cancelled",
                text: "Your imaginary file is safe :)",
                icon: "error"
            });
        }
    });
    container.splice(index, 1);

};


function validateForm(ele) {

    var regix = {
        siteName: /^\w{3,}(\s+\w+)*$/,
        siteUrl: /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/
    };
    if (regix[ele.id].test(ele.value)) {
        ele.classList.remove('is-invalid');
        ele.classList.add('is-valid');
        ele.nextElementSibling.classList.add('d-none');
        return true;
    }
    else {
        ele.classList.remove('is-valid')
        ele.classList.add('is-invalid')
        ele.nextElementSibling.classList.remove('d-none');
        return false;
    };
};





