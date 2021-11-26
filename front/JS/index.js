let container = document.getElementById("items");

// Affichage HTML //

const display = produit => {
    container.innerHTML += `
    <a href="./product.html?id=${produit._id}">
            <article>
              <img src="${produit.imageUrl}" alt="${produit.altTxt}">
              <h3 class="productName">${produit.name}</h3>
              <p class="productDescription">${produit.description}</p>
            </article>
          </a>
    `
};

// Appel API avec Fetch //

fetch("http://localhost:3000/api/products")
    .then(response => response.json())
    .then(function (listeProduct) {

        //Boucle//

    for (let product of listeProduct) {
        let produit = new Kanap(product)
        display(produit);
    }
})

// Si probleme API //

    .catch(function (err) {  
        console.log("fetch Error")
        alert("Veuillez nous excuser, les produits ne sont pas disponibles pour le moment")      
    });