/**
 * Created with JetBrains WebStorm.
 * User: phaggood
 * Date: 10/16/13
 * Time: 10:55 PM
 * To change this template use File | Settings | File Templates.
 */

/*
 * GET home page.
 */

exports.index = function(req, res){
    console.log("Rendering index");
    res.sendfile('index.html');
};

exports.partials = function (req, res) {
    console.log("Rendering partial " + req.params.name)
    var name = req.params.name;
    res.sendfile('partials/' + name);
};

