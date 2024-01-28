function handleForm(){
    event.preventDefault();

    const name = document.getElementById("name").value;
    const address = document.getElementById("address").value;
    const phone = document.getElementById("phone_number").value;

    const details = {
        name,
        address,
        phone
    }

    saveDetails(details)
    .then(() => {
        add(); 
    });
}

function saveDetails(details){
    axios({
        method : 'post',
        url : "https://crudcrud.com/api/b61eac7b9fb1493cb99c4c315c9cfe57/appointmenetData",
        data : details
    })
    .then((responce)=>{
        console.log("SAVED");
    })
    .catch((err)=>{
        console.log(err);
    })
}

function add() {
    axios.get('https://crudcrud.com/api/b61eac7b9fb1493cb99c4c315c9cfe57/appointmenetData')
        .then((response) => {
            console.log(response);

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
            console.log(error);
        });
}

function deletePatientDetails(_id) {
    axios.delete(`https://crudcrud.com/api/b61eac7b9fb1493cb99c4c315c9cfe57/appointmenetData/${_id}`)
        .then((response) => {
            console.log(response.data);
            add();
        })
        .catch((error) => {
            console.log(error);
        });
}

function editPatientDetails(_id) {
    // Implement your edit logic here
    console.log(`Edit patient with ID: ${_id}`);
}

window.onload = add;


