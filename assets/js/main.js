let card__details = document.getElementById("cardDetails");
let users__box = document.getElementById("usersBox");
let search__userBtn = document.getElementById("searchUserBtn");
let search__userInput = document.getElementById("searchUser");
let allUsers = [];

let url = "https://jsonplaceholder.typicode.com/users";
fetch(url)
  .then((response) => response.json())
  .then((data) => {
    allUsers = data;
    getUsers(data);
  })
  .catch((err) => {
    console.log(err.message);
  });

search__userBtn.addEventListener("click", () => {
  const inputData = search__userInput.value;
  const filterUser = allUsers.filter((user) => {
  const isNameMatched = user.name.toLowerCase().includes(inputData.toLowerCase());
  const isIdMatched = user.id == inputData;
  const isEmailMatched = user.email.toLowerCase().includes(inputData.toLowerCase());
  if (isNameMatched || isIdMatched || isEmailMatched) {
    return user;
  }
  });
  getUsers(filterUser);
});

function getUsers(users = []) {
  users__box.innerHTML = "";
  for (const user of users) {
    users__box.appendChild(createUser(user));
  }
}

function createUser(user) {
  const div = document.createElement("div");
  div.className = "card";
  div.innerHTML = `<div class="card__img">
    <img
    src="https://img.freepik.com/premium-vector/anonymous-user-circle-icon-vector-illustration-flat-style-with-long-shadow_520826-1931.jpg"
    class="card-img-top"
    alt="..."
  />
   </div>
    <div class="card__body flex ai-c">
      <h1 class="card__title">${user?.name}</h1>
      <p>
       <b>Email: </b>${user?.email}
      </p>
      <p>
        <b>ID: </b>${user?.id}
      </p>
    </div>

    <div class="card__btn">
        <button class="btn" onClick="showDetails(${user?.id})">Details</button>
    </div>

   <div class="card__details" id="cardDetails-${user?.id}">
    <h3 style="text-align: center;">Details</h3>
    <div class="card__details--text flex jc-c">
      <ul class="">
        <li class="list__item personal__details"><strong>Personal</strong></li>
        <li class="list__item">Username: ${user?.username}</li>
        <li class="list__item">Email: ${user?.email}</li>
        <li class="list__item">Phone: ${user?.phone}</li>
        <li class="list__item">Website: ${user?.website}</li>
        <li class="list__item">Company: ${user?.company?.name}</li>
      </ul>

      <ul class="">
        <li class="list__item address__details"><strong>Address</strong></li>
        <li class="list__item">street: ${user?.address?.street}</li>
        <li class="list__item">suite: ${user?.address?.suite}</li>
        <li class="list__item">city: ${user?.address?.city}</li>
        <li class="list__item">zipcode: ${user?.address?.zipcode}</li>
      </ul>
      <button class="closeBtn" onClick="showDetails(${user?.id})">Close</button>
    </div>
   </div>`;
  return div;
}

function showDetails(userId) {
  let cardDetails = document.getElementById(`cardDetails-${userId}`);
  let cardDetailsAll = document.querySelectorAll(".card__details");

  cardDetailsAll = [...cardDetailsAll];
  cardDetailsAll = cardDetailsAll.filter((item) => item !== cardDetails);
  cardDetailsAll.forEach((item) => {
    item.classList.remove("card__show");
  });
  cardDetails.classList.toggle("card__show");
}
