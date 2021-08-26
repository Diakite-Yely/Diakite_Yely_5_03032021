
let params = new URL(document.location).searchParams;
let id = params.get("id");
console.log(id);

const produitImg = document.querySelector(".produit-img");
const produitName = document.querySelector(".produit-titre");
const produitDescription = document.querySelector(
  ".produit-description"
);
const produitPrice = document.querySelector(".produit-prix");
const bearNumber = document.querySelector("#bearNum");
const colorSelect = document.querySelector("#color-select");



  getArticles();

function getArticles() {
  fetch(`http://localhost:3000/api/teddies/${id}`)
    .then(function (response) {
      return response.json();
    })
    .catch((error) => {error
    })
    .then(function (resultatAPI) {
      article = resultatAPI;
      console.log(article);
      produitName.innerHTML = article.name;
      produitImg.src = article.imageUrl;
      produitDescription.innerText = article.description;
      produitPrice.innerHTML = article.price/100 + '€';

      const colorSelect = document.querySelector(".produit-choix-couleur");
      for (let i = 0; i < article.colors.length; i++) {
        let option = document.createElement("option");
        option.innerText = article.colors[i];
        colorSelect.appendChild(option);
      


    }});
}


const btn = document.querySelector(".produit-btn");
btn.addEventListener("click", (event) =>{ event.preventDefault();
  let optionProduit = {
    name: produitName.innerHTML,
    prix: produitPrice.innerHTML,
    _id:id,
  
  
  }
  console.log(optionProduit)

//Declaration de la variable das laquelle on met les key qui sont dans le localStorage
  let produitLocalStorage = JSON.parse(localStorage.getItem("produit"));
//------------------------------Fonction fenetre Popup------------------------------

 function popupConfirmation() {
   if (window.confirm(`${produitName.innerHTML} a bien était ajouté au panier 
Consulter le panier OK ou revenir à l'accueil ANNULER` ))
 { window.location.href="panier.html"}else {window.location.href="index.html"}}

  //--------------------------------------Fonction pour ajouter un objet dans le localStorage-------------------

  function ajoutLocalStorage(){
    //ajout dans le tableau de l'objet 
    produitLocalStorage.push(optionProduit);

    //transformation en format JSON et envoi dans la Key "produit" du LocalStorage
    localStorage.setItem('produit',JSON.stringify(produitLocalStorage))

  }



  //---------------------------------------LOCAL STORAGE --------------------------------

  //S'il y a deja des objet dans le localStorage
  if (produitLocalStorage){
    ajoutLocalStorage();
    popupConfirmation();
  }
   //S'il y a pas d'objet dans le localStorage
  else {
    produitLocalStorage= [];
    ajoutLocalStorage();
    popupConfirmation();
  
  
  }

});



