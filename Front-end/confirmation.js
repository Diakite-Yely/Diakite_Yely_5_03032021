displayOrderIdAndPrice();


function displayOrderIdAndPrice() {
  const totalConfirmation = document.querySelector(".total");
  const orderId = document.querySelector(".orderid ");
  
  totalConfirmation.innerText = localStorage.getItem("total");
  orderId.innerText = localStorage.getItem("orderId");
  console.log(orderId);

  // On vide le localStorage pour recommencer plus tard le processus d'achat
  localStorage.clear(); 
}