export default class Products {
	constructor(products) {
		this.array = products || [];
		this.categories = () => {
			const categories = [];
			this.array.forEach((product) => {
				categories.push(product.category);
			});
			return new Set(categories);
		};
		this.subCategories = () => {
			const subCategories = [];
			this.array.forEach((product) => {
				subCategories.push(product.subCategory);
			});
			return new Set(subCategories);
		};
	}
}
