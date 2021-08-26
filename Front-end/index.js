getArticles();
/*
  Permet de récupérer et d'aficher les articles sur la partie front
*/
function getArticles() {
  fetch("http://localhost:3000/api/teddies")
    .then(function (res) {
      return res.json();
    })
    .catch((error) => {
      alert("Nous sommes désolé veiller réessayer ulterieurement")
    })
  
    .then(function (resApi){
      const articles = resApi;
       console.log(articles);
      articles.forEach(function(article){
      //pour chaque
        const product = document.createElement("article");
        document.querySelector("#main").appendChild(product);
    
        const productLien = document.createElement("a")
        product.appendChild(productLien);
        productLien.classList.add("lien");
        productLien.href = `produit.html?id=${article._id}`

        const productImg = document.createElement("img");
        productLien.appendChild(productImg);
        productImg.classList.add("img");
        productImg.src = article.imageUrl;

        const productInfo = document.createElement("div")
        productLien.appendChild(productInfo);
        productInfo.classList.add("info");

        const productName =document.createElement("div")
        productInfo.appendChild(productName);
        productName.classList.add("titre");
        productName.innerHTML = article.name;

        const productPrice = document.createElement("div");
        productInfo.appendChild(productPrice);
        productPrice.classList.add("price")
        productPrice.innerHTML = article.price/100 + '€';
        
        //const imgFond = document.querySelector(".img-fond");
       // imgFond.src =article.imageUrl[1];
      })

  });
}