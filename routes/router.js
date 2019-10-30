
module.exports = function(app) {

	app.get('/', (req,res) => {

		res.render('base');
	});

	app.get('*', (req, res) => {
		
		res.redirect('/');
	});

	
};
