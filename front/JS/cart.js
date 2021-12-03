let prixPanier = 0;

function prixTotalPanier(canap){
    prixPanier += canap.quantity * canap.price;

    let totalPrice = document.getElementById('totalPrice').textContent = prixPanier;
};


let kanaps = JSON.parse(localStorage.getItem("panier")) ? JSON.parse(localStorage.getItem("panier")) : [];

let cart__items = document.getElementById("cart__items");

kanaps.forEach((canap, i) => {
    cart__items.innerHTML += `
                <article class="cart__item" data-id="{product-ID}">
                <div class="cart__item__img">
                  <img src="${canap.imageUrl}" alt="${canap.altTxt}">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__titlePrice">
                    <h2>${canap.name}</h2>
                    <p>${canap.quantity * canap.price} €</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : </p>
                      <input type="number" data-id="${i} class="itemQuantity" name="itemQuantity" min="1" max="100" value="${canap.quantity * canap.price}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem" data-id="${i}">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>

    `;

    priceTotalPanier(canap)

});

document.querySelectorAll("deleteItem").forEach(delBtn => {
    delBtn.addEventListener('click', () => deletecanap(delBtn.dataset.id))
});

function deletcanap(i) {
    kanaps.slice(i, 1);
    localStorage.setItem('panier', JSON.stringify(kanaps));
    window.location.reload();
}

document.querySelectorAll(".itemQuantity").forEach(modifBtn => {
    modifBtn.addEventListener('change', () => updatecanap(modifBtn.dataset.id, modifBtn.value))
});

function updatecanap(i, value) {
    let canap = kanaps[i];
    canap.quantity = value;

    localStorage.setItem('panier', JSON.stringify(kanaps));
    window.location.reload();
}