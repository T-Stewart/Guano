const HomeController = {
    Index: function(req, res) {
        res.render('home/index', {title: 'Guano'})
    }
};

module.exports = HomeController