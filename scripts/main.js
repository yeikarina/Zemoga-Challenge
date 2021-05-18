class Celebrity {
    constructor(category, description, lastUpdated, name, picture, negative, positive) {
        this.category = category;
        this.description = description;
        this.lastUpdated = lastUpdated;
        this.name = name;
        this.picture = picture;
        this.votes = {
            "negative": parseInt(negative, 10),
            "positive": parseInt(positive, 10)
        };
    }
}
//Global Objects
let celebrities = [];

//gridClasses
const gridCardsCssClass = "grid-cards";
const cardGridTitleCssClass = "cardGrid-title";
const thumbButtonCssClass = "thumbButton";
const listCardThumbCssClass = "listCard-thumb";
const cardGridCssClass = "cardGrid";
const cardListCssClass = "cardList";
const listCardsCssClass = "list-cards";
const cardListTitleCssClass = "cardList-title";

(function () {
    console.log("Script Just started");
    loadCards(celebrities)
        .then(response => {
            if (response === "Cards Loaded") {
                console.log(response);
                addListeners(celebrities);
                verifyScreenWidth();
            }
        })
        .catch(error => {
            console.log("We couldn't load celebrities's info");
        });
    Celebrity.prototype.vote = function (position) {
        let response = false;
        if (this.selectedVote === "positive") {
            this.votes.positive++;
            console.log("Patching " + this.selectedVote + " with " + this.votes.positive + " votes");
            patchVotes(position, this.selectedVote, this.votes.positive);
            response = true;
        } else if (this.selectedVote === "negative") {
            this.votes.negative++;
            console.log("Patching " + this.selectedVote + " with " + this.votes.negative);
            patchVotes(position, this.selectedVote, this.votes.negative);
            response = true;
        }
        this.selectedVote = "";
        return response;
    }
    Celebrity.prototype.selectVote = function (votingType) {
        this.selectedVote = votingType;
    }
})();    

function addListeners(celebrities) {
    //changing between Grid view or List view listener
    const cardsView = document.querySelector(".cardsView");
    cardsView.addEventListener("change", event => {
        const optionSelected = event.target.options[event.target.options.selectedIndex];
        if (optionSelected.value === "List") {
            changeView(gridCardsCssClass, cardGridTitleCssClass, cardGridCssClass, cardListCssClass);
            saveViewSelected("List");
        }
        else {
            changeView(listCardsCssClass, cardListTitleCssClass, cardListCssClass, cardGridCssClass);
            saveViewSelected("Grid");
        }
    });

    const votePositiveButtons = document.querySelectorAll(".voting .thumbUp");
    votePositiveButtons.forEach(votePositive => {
        votePositive.addEventListener("click", event =>{            
            this.votingOption = "positive";
        });
        votePositive.addEventListener("click", clickVotingThumb);
    });

    const voteNegativeButtons = document.querySelectorAll(".voting .thumbDown");
    voteNegativeButtons.forEach(voteNegative => {
        voteNegative.addEventListener("click", event =>{            
            this.votingOption = "negative";
        });
        voteNegative.addEventListener("click", clickVotingThumb);
    });

    const votingArray = document.querySelectorAll(".voteNow");
    votingArray.forEach(button => {
        button.addEventListener("click", event => {
            console.log("Selected Card " + event.target.parentElement.getAttribute('cardName'));
            const cardName = event.target.parentElement.getAttribute('cardName');
            let counter = -1;
            let celebrityPosition;
            const celebrity = celebrities.filter(element => {
                counter++;
                if (element.name === cardName) {
                    celebrityPosition = counter;
                }
                return element.name === cardName;
            });
            console.log("celebrity patch position: " + celebrityPosition);
            if (celebrity[0].vote(celebrityPosition)) {
                loadPercentages(celebrity[0]);
                votedState(celebrity[0]);
                setThumbsBorder(celebrity[0].name);
            } else {
                if (event.target.innerText === "Vote Again") {
                    console.log("Reset initial state");
                    pendingVoteState(celebrity[0]);
                } else {                    
                    console.log("please decide a vote");
                }
            }
        });
    });
}

async function loadCards(celebrities) {
    console.log("Loading Cards");
    const response = await fetch('https://zemoga-challenge-default-rtdb.firebaseio.com/data.json')
        .then(response => response.json() )
        .then(data => {
            const pollingCards = document.querySelector(".polling-cards");
            data.forEach(element => {
                //construct cards
                const card = document.createElement("div");
                card.classList.add("cardGrid");
                card.setAttribute("cardName", element.name);
                const img = document.createElement("img");
                img.classList.add("cardGrid-img");
                img.src = "/assets/img/" + element.picture;
                const gradient = document.createElement("div");
                gradient.classList.add("cardGrid-gradient");
                gradient.innerHTML = `<div class="cardGrid-title"><div class="thumbButton ` + thumbClass(element.votes.positive, element.votes.negative) + `">`
                    + thumbImg(element.votes.positive, element.votes.negative) + `</div><h2 class="name">` + element.name + `</h2></div>`;
                const description = document.createElement("div");
                description.classList.add("cardGrid-desc");
                description.innerText = element.description;
                const date = document.createElement("span");
                date.classList.add("cardGrid-date");
                date.innerText = dateText(element.lastUpdated, element.category);
                const voting = document.createElement("div");
                voting.classList.add("voting");
                voting.setAttribute("cardName", element.name);
                voting.innerHTML = votingInnerHtml(element.name);
                const gaugeBar = document.createElement("div");
                gaugeBar.classList.add("gaugeBar");
                gaugeBar.setAttribute("cardName", element.name);
                gaugeBar.innerHTML = gaugeBarInnerHtml(element);

                card.appendChild(img);
                card.appendChild(gradient);
                gradient.appendChild(description);
                gradient.appendChild(date);
                gradient.appendChild(voting);
                gradient.appendChild(gaugeBar);
                pollingCards.appendChild(card);

                //adding celebs to array
                celebrities.push(new Celebrity(
                    element.category,
                    element.description,
                    element.lastUpdated,
                    element.name,
                    element.picture,
                    element.votes.negative,
                    element.votes.positive
                ));
                loadPercentages(celebrities[celebrities.length - 1]);
            });
            return "Cards Loaded";
        });
    return response;
}

function thumbClass(positive, negative) {
    if (positive >= negative) {
        return "thumbUp";
    }
    else {
        return "thumbDown";
    }
}

function thumbImg(positive, negative) {
    if (positive >= negative) {
        return `<img src="/assets/img/thumbs-up.svg" alt="Thumb Up" class="thumbButton-icon">`;
    }
    else {
        return `<img src="/assets/img/thumbs-down.svg" alt="Thumb Down" class="thumbButton-icon">`;
    }
}

function dateText(lastUpdated, category) {
    const lastUpdate = new Date(lastUpdated);
    const now = new Date();
    const yearDiff = now.getFullYear() - lastUpdate.getFullYear();
    const monthDiff = now.getMonth() - lastUpdate.getMonth();
    const dayDiff = now.getDay() - lastUpdate.getDay();
    const minDiff = now.getMinutes() - lastUpdate.getMinutes();
    let message = `ago in ` + category;
    if (yearDiff > 0) {
        if (yearDiff === 1) {
            return 1 + ` year ` + message;
        } else {
            return yearDiff + ` years ` + message;
        }
    } else if (monthDiff > 0) {
        if (monthDiff === 1) {
            return 1 + ` month ` + message;
        } else {
            return monthDiff + ` months ` + message;
        }
    } else if (dayDiff > 0) {
        if (dayDiff === 1) {
            return 1 + ` day ` + message;
        } else {
            return dayDiff + ` days ` + message;
        }
    } else if (minDiff > 0) {
        if (minDiff === 1) {
            return 1 + ` minute ` + message;
        } else {
            return minDiff + ` minutes ` + message;
        }
    } else {
        return "Created Just now";
    }
}

function votingInnerHtml(cardName) {
    return `<div class="thumbButton thumbUp" cardName="` + cardName + `">
            <img src="/assets/img/thumbs-up.svg" alt="Thumb Up" class="thumbButton-icon">
            </div><div class="thumbButton thumbDown" cardName="` + cardName + `">
            <img src="/assets/img/thumbs-down.svg" alt="Thumb Down" class="thumbButton-icon">
            </div><div class="voteNow" cardName="` + cardName + `">Vote Now</div>`;
}

function gaugeBarInnerHtml(element) {
    const total = element.votes.positive + element.votes.negative;
    return `<div class="gaugeBar-up"><div class="thumbButton thumbUp">
            <img src="/assets/img/thumbs-up.svg" alt="" class="thumbButton-icon"></div>            
            <div class="percentage">` + percentage(total, element.votes.positive) + `%</div>
            </div><div class="gaugeBar-down"><div class="percentage">`
            + percentage(total, element.votes.negative) + `%</div><div class="thumbButton thumbDown">
            <img src="/assets/img/thumbs-down.svg" alt="" class="thumbButton-icon"></div>
            </div>`;
}

function percentage(total, portion) {
    return Number.parseFloat(portion * 100 / total).toFixed(2);
}

function loadPercentages(celebrity) {
    const barUp = document.querySelector(`div[cardName="` + celebrity.name + `"] .gaugeBar-up`);
    const barDown = document.querySelector(`div[cardName="` + celebrity.name + `"] .gaugeBar-down`);
    total = celebrity.votes.positive + celebrity.votes.negative;
    barUp.style.width = percentage(total, celebrity.votes.positive) + "%";
    barDown.style.width = percentage(total, celebrity.votes.negative) + "%";

    const barUpPercentaje = document.querySelector(`div[cardName="` + celebrity.name + `"] .gaugeBar-up .percentage`);
    const barDownPercentaje = document.querySelector(`div[cardName="` + celebrity.name + `"] .gaugeBar-down .percentage`);
    barUpPercentaje.innerText = percentage(total, celebrity.votes.positive) + "%";
    barDownPercentaje.innerText = percentage(total, celebrity.votes.negative) + "%";
}

function patchVotes(position, key, value) {
    fetch(`https://zemoga-challenge-default-rtdb.firebaseio.com/data/`
        + position + `/votes.json`, {
        "method": "PATCH",
        "headers": {
            "content-type": "application/json",
            "cache-control": "no-cache"
        },
        "body": `{"` + key + `": ` + value + `}`
    })
    .then(response => response.json())
    .then(data => console.log(data));
}

function votedState(celebrity) {
    const dateField = document.querySelector(`div[cardName="` + celebrity.name + `"] span[class*="-date"]`);
    dateField.innerHTML = "Thank you for your vote!";

    const votingThumbs = document.querySelectorAll(`div[cardName="` + celebrity.name + `"][class="voting"] > .thumbButton`);
    votingThumbs.forEach(button => {
        button.classList.toggle("displayNone");
    });

    const voteButton = document.querySelector(`div[cardName="` + celebrity.name + `"][class="voting"] > .voteNow`);
    voteButton.innerText = "Vote Again";
}
function pendingVoteState(celebrity) {
    const dateField = document.querySelector(`div[cardName="` + celebrity.name + `"] span[class*="-date"]`);
    dateField.innerHTML = dateText(celebrity.lastUpdated, celebrity.category);

    const votingThumbs = document.querySelectorAll(`div[cardName="` + celebrity.name + `"][class="voting"] > .thumbButton`);
    votingThumbs.forEach(button => {
        button.classList.toggle("displayNone");
    });

    const voteButton = document.querySelector(`div[cardName="` + celebrity.name + `"][class="voting"] > .voteNow`);
    voteButton.innerText = "Vote Now";
}

function saveViewSelected(view) {
    localStorage.setItem("actualView", view);
}

function changeView(cardContainer, cardTitle, oldCardView, newCardView) {
    const cardsContainer = document.querySelector("." + cardContainer);
    const listThumbButton = document.querySelectorAll("." + cardTitle + " .thumbButton");
    listThumbButton.forEach(element => {
        element.classList.toggle(listCardThumbCssClass);
    });
    const cardGrid = document.querySelectorAll(`*[class^="` + oldCardView + `"]`);
    cardGrid.forEach(element => {
        const newClass = element.classList.value.replace(oldCardView, newCardView);
        element.classList.value = newClass;
    });
    if(cardsContainer !== null){
        cardsContainer.classList.toggle(listCardsCssClass);
    }
}

function clickVotingThumb(event){
    const cardName = event.target.parentElement.getAttribute('cardName');
    const celebrity = celebrities.filter(element => element.name === cardName);

    //set border
    setThumbsBorder(cardName);
    //selectVoting type
    celebrity[0].selectVote(window.votingOption);
    window.votingOption = "";
}

function setThumbsBorder(cardName){
    const thumbs = document.querySelectorAll(`div[cardName="` + cardName + `"][class="voting"] > .thumbButton`);
    thumbs.forEach(thumb =>{
        thumb.classList.remove("bordered");
        if(thumb.classList.contains("thumbUp") && window.votingOption === "positive"){
            thumb.classList.add("bordered");
        }else if(thumb.classList.contains("thumbDown") && window.votingOption === "negative"){
            thumb.classList.add("bordered");
        }
    });
}

function verifyScreenWidth(){
    let viewportWidth = window.innerWidth;
    let actualView = localStorage.getItem("actualView");
    const cardsView = document.querySelector(".cardsView");
    setTimeout(() => {
        if(viewportWidth < 768 && actualView === "List"){ 
           changeView(listCardsCssClass, cardListTitleCssClass, cardListCssClass, cardGridCssClass);
           cardsView.selectedIndex= 0;
        }
        verifyScreenWidth();
    }, 100);
}