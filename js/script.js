
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




getpromotions(); //start function getpromotions