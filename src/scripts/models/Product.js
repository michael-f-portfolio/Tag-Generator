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
		this.name = name;
		this.packageReference = packageReference;
		this.category = category;
		this.subCategory = subCategory;
		this.orderedQty = orderedQty;
		this.currentQty = currentQty;
		this.unitCost = unitCost;
		this.totalCost = totalCost;
	}
}
