// Récupérer l'id du produit à afficher //

let url = new URL(document.location.href);
let idProduct = url.searchParams.get("id");

let container = document.getElementById("prod");

// Insérer un produit et ses détails dans la page Produit //

const display = prod_kanap => {
    container.innerHTML = `
    <article>
    <div class="item__img">
      <img src="${prod_kanap.imageUrl}" alt="${prod_kanap.altTxt}">
    </div>
    <div class="item__content">

      <div class="item__content__titlePrice">
        <h1 id="title">${prod_kanap.name}</h1>
        <p>Prix : <span id="price">${prod_kanap.price}</span>€</p>
      </div>

      <div class="item__content__description">
        <p class="item__content__description__title">Description :</p>
        <p id="description">${prod_kanap.description}</p>
      </div>

      <div class="item__content__settings">
        <div class="item__content__settings__color">
          <label for="color-select">Choisir une couleur :</label>
          <select name="color-select" id="color">
              

          </select>
        </div>

        <div class="item__content__settings__quantity">
          <label for="itemQuantity">Nombre d'article(s) (1-100) :</label>
          <input type="number" name="itemQuantity" min="1" max="100" value="0" id="quantity">
        </div>
      </div>

      <div class="item__content__addButton" id="panier">
        <button id="addToCart">Ajouter au panier</button>
      </div>

    </div>
  </article>
    `;


    // console.log (produit.colors) //
    for (let color of prod_kanap.colors){
        document.getElementById('color').innerHTML+=
        `<option value=${color}>${color}</option>`
    }

    // Ecoute evenemnt au click + FNCT ajouter ProdPanier //

    document.getElementById('addToCart').addEventListener('click', function () {AjouterProdPanier(prod_kanap)});
};

// .then(response => {alert('test'); return response.json()})

// Appel Fetch API //

fetch("http://localhost:3000/api/products/" + idProduct)
.then(response => response.json())
.then(function (product) {
    
    let prod_kanap = new Kanap(product)
    display (prod_kanap);
})

// Si probleme API //

.catch (function (err) {
    console.log("fetch Error")
    alert ("Veuillez nous excuser les produits ne sont pas disponibles pour le moment")
});

// Ajouter des produits dans le panier //

// Envoi local storage //

const addLocalStorage = function(panier) {
    localStorage.setItem('panier', JSON.stringify(panier));
};

// Fonction Ajouter Panier //

const AjouterProdPanier = produit => {
    produit.quantity = parseInt(document.getElementById('quantity').value);

    // Recuperer Panier let variable=(condition)? "valeursi vrai": "valeursi faux" //

    let panier = localStorage.getItem('panier') ? JSON.parse(localStorage.getItem('panier')) : [];

    // Boucle for Parcours Ligne Panier //

    let produitExistIndex = false;
    for (let i = 0; i <panier.length; i++) {
        let product = panier[i];
        // Condition si produit existe //
        if (product.id === produit.id) {
            produitExistIndex = i;
        }
    };

    // Produit existe dans le panier //

    if (false !== produitExistIndex) {
        panier [produitExistIndex].quantity = parseInt(panier[produitExistIndex].quantity) + produit.quantity;
    } else {
        panier.push(produit);
    };

    addLocalStorage(panier)

};