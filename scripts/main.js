(function () {
    console.log("inicié el script");
    addListeners();
})();

function addListeners() {
    //Select View 
    const cardsView = document.querySelector(".cardsView");
    cardsView.addEventListener("change", event => {
        const optionSelected = event.target.options[event.target.options.selectedIndex];
        if (optionSelected.value === "List") {
            const cardsContainer = document.querySelector(".grid-cards");
            const listThumbButton = document.querySelector(".cardGrid-title .thumbButton");
            listThumbButton.classList.toggle("listCard-thumb");
            const cardGrid = document.querySelectorAll(`.polling-cards div[class^="cardGrid"], p[class^="cardGrid"], span[class^="cardGrid"]`);
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
            const listThumbButton = document.querySelector(".cardList-title .thumbButton");
            listThumbButton.classList.toggle("listCard-thumb");
            const cardGrid = document.querySelectorAll(`.polling-cards div[class^="cardList"], p[class^="cardList"], span[class^="cardList"]`);
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



function loadCards() {

}

