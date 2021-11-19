class Kanap {
    constructor( {name, imageUrl, price, _id, description, color, altTxt, quantity} ) {

        this.name = name;
        this.imageUrl = imageUrl;
        this.price = price;
        this._id = _id;
        this.description = description;
        this.color = color;
        this.altTxt = altTxt;
        this.quantity = parseInt(quantity, 10);
    }
}