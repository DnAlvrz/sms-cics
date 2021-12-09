const newStudentForm = document.getElementById('newStudentForm');
const schoolId = document.getElementById('schoolID');

document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll('.sidebar .nav-link').forEach(function(element) {

            element.addEventListener('click', function(e) {
                console.log(e.target)
                let nextEl = element.nextElementSibling;
                let parentEl = element.parentElement;

                if (nextEl) {
                    e.preventDefault();
                    let mycollapse = new bootstrap.Collapse(nextEl);

                    if (nextEl.classList.contains('show')) {
                        mycollapse.hide();
                    } else {
                        mycollapse.show();
                        // find other submenus with class=show
                        var opened_submenu = parentEl.parentElement.querySelector('.submenu.show');
                        // if it exists, then close all of them
                        if (opened_submenu) {
                            new bootstrap.Collapse(opened_submenu);
                        }
                    }
                }
            }); // addEventListener
        }) // forEach
});


// var myModal = document.getElementById('myModal')
// var myInput = document.getElementById('myInput')

// myModal.addEventListener('shown.bs.modal', function () {
//   myInput.focus()
// })


schoolId.addEventListener('keypress', function(evt) {
    const password = document.getElementById('password');
    password.value = schoolId.value
    console.log(password.value)
})


newStudentForm.addEventListener('submit', async(evt) => {
    evt.preventDefault();
    // errdiv = document.getElementById('errors')
    // errdiv.innerHTML ="";
    let data = {};
    const formData = new FormData(evt.target);
    formData.forEach(function(value, key) {
        data[key] = value;
    });
    data.birthdate = "12/12/12";
    data.password = data.schoolID;

    console.log(data)
    try {
        const response = await fetch('/api/students', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        let resData = await response.json();
        if (response.status === 422) {
            let errList = document.createElement('ul');
            resData.forEach(errData => {
                let errLi = document.createElement('li');
                errLi.innerText = errData.msg;
                errList.appendChild(errLi);
            })
            errdiv.appendChild(errList);
        } else if (response.status === 500) {
            console.log('Error:L 500')
            console.log(response);
        } else {
            alert('User saved!');
            evt.target.reset();
        }
    } catch (error) {
        console.log(error)
    }
})

function semUpdate() {
    console.log('active')
}


function updateSchoolYear(id, year) {
    document.getElementById('updateSchoolId').setAttribute('value', id);
    document.getElementById('updateYear').setAttribute('value', year);
}

function updateSemester(id, yearUUID, name) {
    document.getElementById('updateSemesterId').setAttribute('value', id);
    const schoolYear = document.getElementById('updateSchoolYear');
    const semName = document.getElementById('updateName');
    let option
    for (let i = 0; i < semName.options.length; i++) {
        option = semName.options[i];
        if (option.value === name) {
            option.selected = true;
        }
    }
    for (let i = 0; i < schoolYear.options.length; i++) {
        option = schoolYear.options[i];
        if (option.value === yearUUID) {
            option.selected = true;
        }
    }

}