import ProductName from "./ProductName.js";

export default class Product {
	constructor(
		SKU,
		name,
		packageReference,
		category,
		subCategory,
		orderedQty,
		currentQty,
		unitCost,
		totalCost
	) {
		this.SKU = SKU;
		this.name = new ProductName(name);
		this.packageReference = packageReference;
		this.category = category;
		this.subCategory = subCategory;
		this.orderedQty = orderedQty.substring(0, orderedQty.indexOf("."));
		this.currentQty = currentQty;
		this.unitCost = unitCost;
		this.totalCost = totalCost;
	}
}
