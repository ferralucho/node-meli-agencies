var express = require('express');
var request = require('request');
var router = express.Router();

router.get('/', function (req, res) {
    request.get("https://api.mercadolibre.com/sites", function (error, response, body) {
        if (error) {
            res.send(error)
        }
        res.send(JSON.parse(body))

    });
});

router.get('/:id', function (req, res) {
    var id = req.params.id
    request.get("https://api.mercadolibre.com/sites/" + id, function (error, response, body) {
        if (error) {
            res.send(error)
        }
        res.send(JSON.parse(body))

    });
});

router.get('/:site_id/payment_methods', function (req, res) {
    let siteId = req.params.site_id
    request.get("https://api.mercadolibre.com/sites/" + siteId + "/payment_methods", function (error, response, body) {
        if (error) {
            res.send(error)
        }
        res.send(JSON.parse(body))

    });
});

module.exports = router;
