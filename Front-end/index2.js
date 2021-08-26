
getArticles();
function getArticles() { 
   fetch("http://localhost:3000/api/teddies")
    .then(function(response) { return response.json()})
    .then (function(articles){return articles})
    .catch(function(err){alert("err")})
    

    .then(function (resApi){
      for (article in articles) {
     
      const product = document.createElement("article");
      document.querySelector('#main').appendChild(product);
      product.classList.add("produit");
  
      const productLien = document.createElement("a")
      product.appendChild(productLien);
      productLien.classList.add('lien')

      const productImg = document.createElement("img");
      productLien.appendChild(productimg);
      productImg.classList.add('img')

      const productInfo = document.createElement("div")
      productLien.appendChild(productInfo);
      productInfo.classList.add('info')

      const productName = document.createElement("div")
      productInfo.appendChild(productName);
      productName.classList.add('titre')

      const productPrice = document.createElement("div")
      productInfo.appendChild(productPrice)

      

      
        
    }
  });
}