
module.exports = function(app) {

	app.get('/helloworld1', (req,res) => {

		res.render('base', {path: "helloworld1"});
	});

	app.get('/helloworld2', (req, res) => {
		
		res.render('base', {path: "helloworld2"});
	});

	app.get('*', (req, res) => {
		
		res.redirect('helloworld1');
	});

	
};
