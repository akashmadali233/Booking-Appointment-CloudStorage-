function handleForm(event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const address = document.getElementById("address").value;
    const phone = document.getElementById("phone_number").value;

    const details = {
        name,
        address,
        phone
    };

    saveDetails(details)
        .then(() => {
            add();
        })
        .catch((error) => {
            console.error(error);
        });
}

function saveDetails(details) {
    return axios({
        method: 'post',
        url: "https://crudcrud.com/api/66dde0eeb57e46c28cb35dba038bddcc/appointmentData",
        data: details
    })
    .then(() => {
        console.log("SAVED");
    })
    .catch((error) => {
        console.error(error);
    });
}

function deletePatientDetails(_id) {
    axios.delete(`https://crudcrud.com/api/66dde0eeb57e46c28cb35dba038bddcc/appointmentData/${_id}`)
        .then(() => {
            console.log("DELETED");
            add();
        })
        .catch((error) => {
            console.error(error);
        });
}

function editPatientDetails(_id) {

    axios.get(`https://crudcrud.com/api/66dde0eeb57e46c28cb35dba038bddcc/appointmentData/${_id}`)
        .then(response=> editPatientDetailsInform(response.data))
        .catch(err => console.log(err));
    
}

function add() {
    axios.get('https://crudcrud.com/api/66dde0eeb57e46c28cb35dba038bddcc/appointmentData')
        .then((response) => {
            const ul = document.getElementById("unorderlist");
            ul.innerHTML = '';

            if (response.data) {
                response.data.forEach(data => {
                    const li = document.createElement('li');
                    li.id = `${data._id}`;

                    const deleteButton = document.createElement("button");
                    deleteButton.type = "button";
                    deleteButton.textContent = "Delete";
                    deleteButton.addEventListener('click', function () {
                        deletePatientDetails(data._id);
                    });

                    const editButton = document.createElement("button");
                    editButton.type = "button";
                    editButton.textContent = "Edit";
                    editButton.addEventListener('click', function () {
                        editPatientDetails(data._id);
                    });

                    li.textContent = `${data._id} - ${data.name} - ${data.address} - ${data.phone}`;
                    li.appendChild(deleteButton);
                    li.appendChild(editButton);
                    ul.appendChild(li);
                });
            }
        })
        .catch((error) => {
            console.error(error);
        });
}

 function editPatientDetailsInform(data){
    if(data){
        const form = document.createElement('form');
        form.innerHTML = 
        `<h3>Booking Appointment</h3>
        <label for="editedName">Name:</label>
        <input type="text" id="editedName" value="${data.name}" required>
        <br>
        <label for="editedAddress">Address:</label>
        <input type="text" id="editedAddress" value="${data.address}" required>
        <br>
        <label for="editedPhone">Phone:</label>
        <input type="text" id="editedPhone" value="${data.phone}" required>
        <br>
        <button type="button" onclick="saveEdit('${data._id}')">Save</button>
        <button type="button" onclick="cancelEdit()">Cancel</button>
        `;
        const listItem = document.getElementById(`${data._id}`)
        listItem.innerHTML = ''
        listItem.appendChild(form);

    }
 }

 function saveEdit(_id) {
    const editedName = document.getElementById("editedName").value;
    const editedAddress = document.getElementById("editedAddress").value;
    const editedPhone = document.getElementById("editedPhone").value;

    const updatedDetails = {
        name: editedName,
        address: editedAddress,
        phone: editedPhone
    };

    return axios({
        method: 'put',
        url: `https://crudcrud.com/api/66dde0eeb57e46c28cb35dba038bddcc/appointmentData/${_id}`,
        data: updatedDetails
    })
    .then(() => {
        console.log("UPDATED");
        window.location.reload();
    })
    .catch((error) => {
        console.error(error);
    });
}

function cancelEdit(){
    add();
}
window.onload = add;
