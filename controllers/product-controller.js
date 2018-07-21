const repository = require('../repositories/product-repository');

exports.list = async(req, res, next) => {
	try{
		var data = await repository.list();
		res.render('index', {products: data});
	}catch(e){
		res.status(500).send({
			message : 'Falha ao processar sua requisição',
			errror : e
		});
	}
}

exports.showProductCreate = async(req, res, next) => {
	try{
		res.render('novo-produto');
	}catch(e){
		res.status(500).send({
			message : 'Falha ao processar sua requisição',
			errror : e
		});
	}
}

exports.createProduct = async(req, res, next) => {
	try{
		let insert = repository.create(req.body);

		if(!insert){
			res.redirect('back');
		}

		res.redirect('/');
	}catch(e){
		res.status(500).send({
			message : 'Falha ao processar sua requisição',
			errror : e
		});
	}
}

exports.edit = async(req, res, next) => {
	try{
		let product = await repository.getById(req.params.id);
		let tags = product.tags;
		res.render('editar-produto', {product:product, tags:tags});
	}catch(e){
		res.status(500).send({
			message : 'Falha ao processar sua requisição',
			errror : e
		});
	}
}

exports.update = async(req, res, next) => {
	try{
		let update = await repository.productUpdate(req.body._id, req.body);

		res.redirect('/');

	}catch(e){
		res.status(500).send({
			message : 'Falha ao processar sua requisição',
			errror : e
		});
	}
}

exports.delete = async(req, res, next) => {
	try{
		let del = await repository.delete(req.body._id);

		if(!del)
			res.redirect('/').send(200,{success: false, message : 'Falha ao remover o produto'});

		res.redirect('/').send(200,{success: true, message : 'Produto removido com sucesso'});
	}catch(e){
		res.status(500).send({
			message : 'Falha ao processar sua requisição',
			errror : e
		});
	}
}