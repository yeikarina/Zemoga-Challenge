(function () {
    console.log("inicié el script");
    loadCards();
    addListeners();
    console.log(dateText("2021-02-14T23:10:19.134Z", "business"));
})();

function addListeners() {
    //Select View 
    const cardsView = document.querySelector(".cardsView");
    cardsView.addEventListener("change", event => {
        const optionSelected = event.target.options[event.target.options.selectedIndex];
        if (optionSelected.value === "List") {
            const cardsContainer = document.querySelector(".grid-cards");
            const listThumbButton = document.querySelectorAll(".cardGrid-title .thumbButton");
            listThumbButton.forEach(element =>{                
                element.classList.toggle("listCard-thumb");
            });
            const cardGrid = document.querySelectorAll(`*[class^="cardGrid"]`);
            cardGrid.forEach(element => {
                console.log(element.classList);
                const newClass = element.classList.value.replace("cardGrid", "cardList");
                element.classList.value = newClass;
                console.log(element.classList[0]);
            });
            console.log(cardsContainer.classList);
            cardsContainer.classList.toggle("list-cards");
        }
        else {
            const cardsContainer = document.querySelector(".list-cards");
            const listThumbButton = document.querySelectorAll(".cardList-title .thumbButton");
            listThumbButton.forEach(element =>{                
                element.classList.toggle("listCard-thumb");
            });
            const cardGrid = document.querySelectorAll(`*[class^="cardList"]`);
            cardGrid.forEach(element => {
                console.log(element.classList);
                const newClass = element.classList.value.replace("cardList", "cardGrid");
                element.classList.value = newClass;
                console.log(element.classList[0]);
            });
            console.log(cardsContainer.classList);
            cardsContainer.classList.toggle("list-cards");
        }
    });
}

function loadCards(){
    fetch('https://zemoga-challenge-default-rtdb.firebaseio.com/data.json')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const pollingCards = document.querySelector(".polling-cards");
            data.forEach( element =>{
                //construct cards
                const card = document.createElement("div");
                card.classList.add("cardGrid");
                const img = document.createElement("img");
                img.classList.add("cardGrid-img");
                img.src = "/assets/img/" + element.picture;
                console.log("src: "+ img.src);
                const gradient = document.createElement("div");
                gradient.classList.add("cardGrid-gradient");
                gradient.innerHTML = `<div class="cardGrid-title"><div class="thumbButton ` + thumbClass(element.votes.positive, element.votes.negative) + `">`
                + thumbImg(element.votes.positive, element.votes.negative) +`</div><h2 class="name">`+ element.name +`</h2></div>`;  
                const description = document.createElement("div");
                description.classList.add("cardGrid-desc");
                description.innerText = element.description;
                const date = document.createElement("span");
                date.classList.add("cardGrid-date");   
                date.innerText = dateText(element.lastUpdated, element.category);
                const voting = document.createElement("div");
                voting.classList.add("voting");
                voting.innerHTML = votingInnerHtml();
                const gaugeBar = document.createElement("div");
                gaugeBar.classList.add("gaugeBar");
                gaugeBar.innerHTML = gaugeBarInnerHtml();

                card.appendChild(img);
                card.appendChild(gradient);
                gradient.appendChild(description);
                gradient.appendChild(date);
                gradient.appendChild(voting);
                gradient.appendChild(gaugeBar);
                pollingCards.appendChild(card);
            });
        });  
}

function thumbClass(positive, negative) {
    if(positive>= negative){
        return "thumbUp";
    }
    else{
        return "thumbDown";
    }
}

function thumbImg(positive, negative){
    if(positive>= negative){
        return `<img src="/assets/img/thumbs-up.svg" alt="Thumb Up" class="thumbButton-icon">`;
    }
    else{
        return `<img src="/assets/img/thumbs-down.svg" alt="Thumb Down" class="thumbButton-icon">`;
    }    
}

function dateText(lastUpdated, category){
    const lastUpdate = new Date(lastUpdated);
    const now = new Date();
    const yearDiff = now.getFullYear() - lastUpdate.getFullYear();
    const monthDiff = now.getMonth() - lastUpdate.getMonth();
    const dayDiff = now.getDay() - lastUpdate.getDay();
    const minDiff = now.getMinutes() - lastUpdate.getMinutes();
    let message = `ago in ` + category;
    if(yearDiff > 0){
        if(yearDiff === 1){
            return 1 + ` year ` + message;
        }else{
            return yearDiff + ` years ` + message;
        }
    } else if(monthDiff > 0){        
        if(monthDiff === 1){
            return 1 + ` month ` + message;
        }else{
            return monthDiff + ` months ` + message;
        }
    }else if(dayDiff > 0){
        if(dayDiff === 1){
            return 1 + ` day ` + message;
        }else{
            return dayDiff + ` days ` + message;
        }
    }else if(minDiff > 0){
        if(minDiff === 1){
            return 1 + ` minute ` + message;
        }else{
            return minDiff + ` minutes ` + message;
        }
    }else{
        return "Created Just now";
    }
}

function votingInnerHtml(){
    return `<div class="thumbButton thumbUp">
            <img src="/assets/img/thumbs-up.svg" alt="Thumb Up" class="thumbButton-icon">
            </div><div class="thumbButton thumbDown">
            <img src="/assets/img/thumbs-down.svg" alt="Thumb Down" class="thumbButton-icon">
            </div><div class="voteNow">Vote Now</div>`;
}

function gaugeBarInnerHtml(){
    return `<div class="gaugeBar-up"><div class="thumbButton thumbUp">
            <img src="/assets/img/thumbs-up.svg" alt="" class="thumbButton-icon">
            </div></div><div class="gaugeBar-down"><div class="thumbButton thumbDown">
            <img src="/assets/img/thumbs-down.svg" alt="" class="thumbButton-icon">
            </div></div>`;
}
