const BASE_URL = "https://user-list.alphacamp.io";
const INDEX_URL = BASE_URL + "/api/v1/users/";
const friends = [];
const dataPanel = document.querySelector("#data-panel");


//axios get all the fake users data into friends array

axios 
  .get(INDEX_URL)
  .then((res) => {
    friends.push(...res.data.results);
    console.log(friends)
    renderFriendList(friends)
  })
  .catch((err) => console.log(err))

//Render friends list
function renderFriendList (data){
  let rawHTML = "";
  data.forEach((item) => {
    rawHTML += `
    <div class="col-sm-3">
          <div class="mb-2">
    
            <div class="card">
              <img
                src="${item.avatar}"
                class="card-img-top"
                alt="friend avatar"
              />
              <div class="card-body">
                <h5 class="card-title">${item.name}</h5>
              </div>
              <div class="card-footer">
              
                <button
                  class="btn btn-primary btn-show-friend"
                  data-bs-toggle="modal"
                  data-bs-target="#friend-modal"
                  data-id="${item.id}"
                >
                  More
                </button>
    
                <button class="btn btn-info btn-add-favorite">+</button>
              </div>
            </div>
          </div>
        </div>
    `;
  })
  dataPanel.innerHTML = rawHTML
}


//Add event listener to dataPanel (listen "more" button)
dataPanel.addEventListener("click", function onPanelClicked(event) {
  if (event.target.matches(".btn-show-friend")) {
    showFriendDetail(event.target.dataset.id);
  }
});
