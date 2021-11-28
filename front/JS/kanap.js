class Kanap {
    constructor( {name, imageUrl, price, _id, description, colors, altTxt, quantity} ) {

        this.name = name;
        this.imageUrl = imageUrl;
        this.price = price;
        this._id = _id;
        this.description = description;
        this.colors = colors;
        this.altTxt = altTxt;
        this.quantity = parseInt(quantity, 10);
    }
}