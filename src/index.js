
function fetchAndysToys() {
  fetch("http://localhost:3000/toys")
    .then(response => response.json())
    .then(function(json) {
      const toyCollection = document.getElementById("toy-collection");

      for (const toyInfo of json) {
        const nameHeader = document.createElement("h2");
        nameHeader.innerHTML = toyInfo.name;
        
        const toyImg = document.createElement("img");
        toyImg.setAttribute("src", toyInfo.image);
        toyImg.setAttribute("class", "toy-avatar");
        
        const likesP = document.createElement("p");
        likesP.innerHTML = `${toyInfo.likes} Likes`;

        const likeBtn = document.createElement("button");
        likeBtn.setAttribute("class", "like-btn");
        likeBtn.innerHTML = "Like <3";
        
        const cardDiv = document.createElement("div");
        cardDiv.setAttribute("id", `Toy${toyInfo.id}`);
        cardDiv.setAttribute("class", "card");
        cardDiv.appendChild(nameHeader);
        cardDiv.appendChild(toyImg);
        cardDiv.appendChild(likesP);
        cardDiv.appendChild(likeBtn);

        toyCollection.appendChild(cardDiv);
      };
      return json;
    })
    .then(function(json) {
      for (const toyInfo of json) {
        increaseLikes(toyInfo);
      };
    });
};


function displayToyForm() {
  const toyFormContainer = document.querySelector(".container");
  const addToyBtn = document.getElementById("new-toy-btn");
  let displayToy = false;

  // Display/Hide add new toy button
  addToyBtn.addEventListener("click", () => {
    displayToy = !displayToy;
    if (displayToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
};


function addNewToy() {
  const toyForm = document.querySelector(".add-toy-form");
  toyForm.addEventListener("submit", function(event) {
    const toyName = document.querySelector('[name="name"]').value;
    const toyImg = document.querySelector('[name="image"]').value;

    let formData = {
      name: toyName,
      image: toyImg,
      likes: 0
    };

    let configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(formData)
    };

    fetch("http://localhost:3000/toys", configObj)
      .then(fetchAndysToys());

    event.preventDefault();
  });
};


function increaseLikes(toyInfo) {
  
  let likes = toyInfo.likes;
  
  const toy = document.getElementById(`Toy${toyInfo.id}`);
  const likeBtn = toy.getElementsByClassName("like-btn")[0];
  const likeCount = toy.getElementsByTagName("p")[0];
  
  let liked = true;

  likeBtn.addEventListener("click", function(event) {

    liked = !liked
    if (liked) {
      likes--;
    } else {
      likes++;
    };

    likeCount.innerHTML = `${likes} Likes`;
    
    let formData = {
      likes: likes
    };
    
    let configObj = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(formData)
    };
    
    fetch(`http://localhost:3000/toys/${toyInfo.id}`, configObj);

    event.preventDefault();
  });
  
};


// Runner/Tester
fetchAndysToys();
displayToyForm();
addNewToy();