let produitLocalStorage = JSON.parse(localStorage.getItem("produit"));
  console.log(produitLocalStorage);
// let produitLocalStoraget = localStorage.setItem('produit',JSON.stringify(produitLocalStorage));


//----------------------------AFFICHAGE DES PRODUIT DU PANIER---------------------------------------------------------------

const positionElement = document.querySelector(".container");
console.log(positionElement);


//Si le panier est vide : Le panier est vide

if (produitLocalStorage == null) {
    const panierVide = `<div class="panier-vide">Le panier est vide retourner a vos achats!!</div> `;
    positionElement.innerHTML=panierVide;
}
else {//si le panier n'est pas vide il faut afficher les produits
    produitLocalStorage.forEach(function(produit){ 
        console.log(produit);
      
        const nom = document.createElement("div");
        nom.classList.add("panier-produit-nom");
        document.querySelector(".panier-produit").appendChild(nom);
        nom.innerHTML=produit.name;

        const prix = document.createElement("div");
        prix.classList.add("panier-produit-prix");
        document.querySelector(".panier-produit").appendChild(prix);
        prix.innerHTML=produit.prix;
        

    })}


//---------------------------------------------------Le panier Bouton Pour Vider Le Panier----------------------------------

const btn = document.querySelector(".recap-panier-btn");
//supression de la key produit du localStorage
btn.addEventListener("click",(e)=>{
    e.preventDefault();

    //.removeItem pour vider le localStorage
    localStorage.removeItem("produit");

    //alerte le panier est vide
    alert("Le panier est vide");

    window.location.href ="panier.html"
})

//Fin 
//-----------------------------------Le Montant Total du panier--------------------------
//-------------------------------Declaration de ka variable pour pouvoir mettre les prix
let prixTotal = [];

//Chercher les prix dans le panier
for (let i = 0; i < produitLocalStorage.length; i++) {
    let prixProduitPanier = produitLocalStorage[i].prix;
    //Mettre les prix dans la variable "prixTotal"
    prixTotal.push(prixProduitPanier);
    //console.log(prixTotal);
}
// Transforme une cha??ne de caract??res en un nombre flottant

prixTotal= prixTotal.map((x) => parseFloat(x));

//Additionner les prix dans le tableau"prixTotal" avec la method .reduce

const reducer = (accumulator, currentValue) => accumulator + currentValue;

const prixToto = prixTotal.reduce(reducer);
console.log(prixToto);

//Faire apparaitre les prix total sur la page 

document.querySelector(".recap-panier-montant-prix").innerHTML = prixToto + "???";


/*
    Send data to the server
*/
envoie();

function envoie() {
  // On r??cup??re les inputs depuis le DOM.
const submit = document.querySelector(".commande");
let inputName = document.querySelector("#name");
let inputLastName = document.querySelector("#lastname");
let inputPostal = document.querySelector("#postal");
let inputCity = document.querySelector("#city");
let inputAdress = document.querySelector("#adress");
let inputMail = document.querySelector("#mail");
let inputPhone = document.querySelector("#phone");
let erreur = document.querySelector(".erreur");
  
// Lors d'un clic, si l'un des champs n'est pas rempli, on affiche une erreur, on emp??che l'envoi du formulaire. On v??rifie aussi que le num??ro est un nombre, sinon m??me chose.

    submit.addEventListener("click", (e) => {
      e.preventDefault();
      if (
        !inputName.value ||
        !inputLastName.value ||
        !inputPostal.value ||
        !inputCity.value ||
        !inputAdress.value ||
        !inputMail.value ||
        !inputPhone.value
      ) {
        erreur.innerHTML = "Vous devez renseigner tous les champs !";
        
      } 
      else if (isNaN(inputPhone.value)) {
       
        erreur.innerText = "Votre num??ro de t??l??phone n'est pas valide";
      } 
      else {
  
        // Si le formulaire est valide, le tableau productsBought contiendra un tableau d'objet qui sont les produits achet??, et order contiendra ce tableau ainsi que l'objet qui contient les infos de l'acheteur
         let productsBought = [];
         //On r??cup??re seulement les Id des produits afin de les envoyer au back-end
         produitLocalStorage.forEach(item => {
          productsBought.push(item._id)});
         
      
  
        const order = {
          contact: {
            firstName: inputName.value,
            lastName: inputLastName.value,
            address: inputAdress.value,
            city: inputCity.value,
            email: inputMail.value,
            

          },
          products: productsBought,
        };
        console.log(order);
        // -------  Envoi de la requ??te POST au back-end --------
        // Cr??ation de l'ent??te de la requ??te
        const options = {
          method: "POST",
          body: JSON.stringify(order),
          headers: { "Content-Type": "application/json"},
        };
         console.log(options);
         //Pr??paration du prix pour l'afficher sur la prochaine page
        let priceConfirmation = document.querySelector(".recap-panier-montant-prix").innerHTML;
      
  
        // Envoie de la requ??te. On changera de page avec un localStorage avecl'order id et le prix.
        fetch("http://localhost:3000/api/teddies/order", options)
          .then((response) => { return response.json(); })
          .then((r) => {
            localStorage.clear();
            console.log(r);
             localStorage.setItem("orderId", r.orderId);
             console.log(r);
            
             localStorage.setItem("total", priceConfirmation);
             document.location.href = "confirmation.html"; 
          })
           .catch((err) => {
             alert("Il y a eu une erreur : " + err);
           });
      }
    });
  }

  console.log(localStorage.getItem("produit"));