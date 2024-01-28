function handleForm(){
    event.preventDefault();

    const name = document.getElementById("name").value;
    const address = document.getElementById("address").value;
    const phone = document.getElementById("phone_number").value;

    const id = 'user_'+ Date.now();

    const details = {
        id,
        name,
        address,
        phone
    }

    saveDetails(details);
    add();
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
                    li.id = `${data.id}`;

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

                
                    li.textContent = `${data.id} - ${data.Name} - ${data.Address} - ${data.Phone}`;
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
function deletePatientDetails(id){
    axios.delete('https://crudcrud.com/api/b61eac7b9fb1493cb99c4c315c9cfe57/appointmenetData')
    .then((responce)=>{
        console.log(responce.data);
        responce = responce.filter(data => data._id !== _id);
        add();
    })
    .catch((err)=>{
        console.log(err);
    })
}

window.onload = add;
