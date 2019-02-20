
//declared variable
var URL = "http://api-students.popschool-lens.fr/api"; // URL of the API
var selectPromo = document.querySelector("#select-promo");
var newnamepromo = document.querySelector(".newname");
var divContainer = document.querySelector('.list-container');

//function GET Promotions
function getpromotions() {

    fetch(URL + '/promotions') // fecth get list-promotions
        .then(response => response.json()) // builds the JavaScript value or the object described by this string.
        .then(function (promo) {
            const promotions = promo['hydra:member'];
            console.log(promotions);

            const list = document.querySelector(".list-container");
            divContainer.innerHTML = "";
            selectPromo.innerHTML = '';
            
            promotions.forEach(prom => { // GET ALL promotion one by one
                console.log(prom.name);
                const li = document.createElement("li"); 
                const link = document.createElement("a");
                var option = document.createElement("option");        // create balise OPTION

                if(selectPromo.innerHTML != prom.name){                  // check if the promotion are different of the promotion in the list
                    selectPromo.appendChild(option);                       // and
                    option.innerHTML = `${prom.id} ${prom.name}`; // add promotion in the list
                } else {
                    var error = document.querySelector("h2");
                    error.innerHTML = "la promo existe deja";
                }
                
                link.href = "promotion.html?id=" + prom.id; // create link on list promotions
                link.textContent = prom.name;
                li.appendChild(link)                          // add li in link
                list.appendChild(li);
                
            });  
        })
}

//function create promotion
var createpromo = document.querySelector("#create-new-promotion");
createpromo.addEventListener('submit', createPromotion);

function createPromotion(event) {
    event.preventDefault(event);//preventDefault() method cancels the event if it is cancelable, meaning that the default action that belongs to the event will not occur.
    const nameInput = document.querySelector("#new-promotion-name");
    const startInput = document.querySelector("#new-promotion-startdate") //declares the id of the DOM
    const endInput = document.querySelector("#new-promotion-endDate") // recover the value of the Input in the HTML
    console.log(nameInput.value);

    fetch(URL + '/promotions', { // fecth get list-promotions
            method: 'POST', // add promotion in the API
            headers: new Headers({
                'content-type': 'application/json'
            }),
            body: JSON.stringify({ // converts a JavaScript value to a JSON string

                name: nameInput.value,
                startDate: startInput.value,
                endDate: endInput.value,
                students: []

            })
        })

        .then(response => response.json())
        .then(promo => {

        getpromotions(); // callback function to refresh
        }) 
        .catch(error => console.log(error));
}


var modif = document.querySelector("#newpromname"); //declares the id of the DOM
modif.addEventListener("submit", modifier);

function modifier(event){ //create function modify promotions
    event.preventDefault(event);
    fetch(URL + '/promotions/' + selectPromo.value , {
        method: 'PUT', // modify promotion select in the API
        headers: new Headers({
            'content-type': 'application/json'
        }),
        body: JSON.stringify({ // converts a JavaScript value to a JSON string
            name: newnamepromo.value,
        })
    })

    .then(response => response.json())
    .then(promo => {

        getpromotions(); // callback function to refresh
    })
    .catch(error => console.log(error));
}





getpromotions(); //start function getpromotions