const mongoose = require('mongoose');
const Product  = mongoose.model('Product');

exports.list = async() => {
	let response = await Product.find({}, 'title price description slug active');
	return response;
}

exports.create = async(data) => {
	let product = new Product(data);
	await product.save();
}

exports.getById = async(id) => {
	let product = await Product.findById(id);
	return product;
}

exports.productUpdate = async(id, data) => {
	await Product.findByIdAndUpdate(id, {
		$set: {
			title: data.title,
			price: data.price,
			description: data.description,
			slug: data.slug,
			tags: data.tags,
			active: data.active
		}
	});
}

exports.delete = async(id) => {
	await Product.findByIdAndDelete(id);
}