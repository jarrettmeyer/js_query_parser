
exports.index = function(req, res){
  res.render('index', { title: 'Query Parser' });
};

exports.tests = function (req, res) {
	res.render('tests', { title: 'QUnit Tests' });
};
