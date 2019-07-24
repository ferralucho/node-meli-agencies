const express = require("express");

//const Agency = require("../models/agency");

const router = express.Router();
let request = require('request');
let fs = require("fs")

router.get('/:site_id/payment_methods', function (req, res) {
    let siteId = req.params.site_id
    request.get("https://api.mercadolibre.com/sites/" + siteId + "/payment_methods", function (error, response, body) {
        if (error) {
            res.send(error)
        }
        res.send(JSON.parse(body))

    });
});
//http://localhost:3000/agencies/MLA?payment_method=rapipago&latitud=-31.412971&longitud=-64.18758&radio=500&limit=500&order_criteria=address_line&order_criteria_sort=

router.get('/:site_id/', function (req, res) {
    let siteId = req.params.site_id
    let paymentMethod = req.query.payment_method;
    let latitud = req.query.latitud;
    let longitud = req.query.longitud;
    let radio = req.query.radio
    let limit = req.query.limit;
    let orderCriteria = req.query.order_criteria;
    let orderCriteriaSort = req.query.order_criteria_sort;

    if(!limit || limit == "NaN")
    {
        limit = 50
    }

    let url = "https://api.mercadolibre.com/sites/" + siteId + "/payment_methods/" + paymentMethod + "/agencies?" + "near_to=" + latitud + "," + longitud + "," + radio + "&limit=" + limit
    let agencies

    request.get(url,
        function (error, response, body) {
            if (error) {
                res.send(error)
            }
            let agenciesPaged = JSON.parse(body)

            if (agenciesPaged) {
                agencies = agenciesPaged.results

            }

            if (orderCriteria) {
                switch (orderCriteria) {
                    case "agency_code":
                        agencies.sort(function (a, b) {
                            return a.agency_code - b.agency_code
                        })
                        break
                    case "distance":
                        agencies.sort(function (a, b) {
                            return (a.distance - b.distance)
                        })
                        break
                    case "address_line":
                        agencies.sort(function (a, b) {
                            return a.address.address_line.localeCompare(b.address.address_line)
                        })
                        break
                }
            }

            if (orderCriteriaSort && orderCriteriaSort == "DESC") {
                agencies.reverse()
            }
            if(agencies)
            {
                fs.writeFile("agencies.json", JSON.stringify(agencies), function (err) {
                        if (err) throw err;
                    }
                );
            }
            //res.status(200).json({ message: "exitoso" });
            res.status(200).send(agencies)

        });
});

//http://localhost:3000/api/agencies/agencias_recomendadas

router.get('/sites/agencias-recomendadas', function (req, res) {
    let arrAgenciesRecomendadas = [];
    fs.readFile('agencias-recomendadas.json', 'utf8', function readFileCallback(err, agenciesRecomendadas) {
      
        if (err) {
            //throw err;
        } else {
            
            if (agenciesRecomendadas) {
                arrAgenciesRecomendadas = JSON.parse(agenciesRecomendadas);
            }
            res.send(arrAgenciesRecomendadas)    
        }
    });
    
});

//http://localhost:3000/agencies/MLA/5690084ae4b0ce36d943c765/like

router.get('/:siteId/:agency_id/like', function (req, res) {
    let agencyId = req.params.agency_id
    let siteId = req.params.site_id
    let agencyGuardada = {}

    fs.readFile('agencies.json', 'utf8', function readFileCallback(err, data) {
        if(!data || data == "undefined")
        {
            res.send("Debe consultar agencias")
        }
        if (err) {
            console.log(err);
        } else {
            let arrAgencies = JSON.parse(data);
            agencyGuardada = arrAgencies.find(ag => ag.id == agencyId)

            fs.readFile('agencias-recomendadas.json', 'utf8', function readFileCallback(err, agenciesRecomendadas) {

                if (err) {
                    console.log(err);
                } else {
                    let arrAgenciesRecomendadas = []
                    if (agenciesRecomendadas) {
                        arrAgenciesRecomendadas = JSON.parse(agenciesRecomendadas)
                    }

                    if (arrAgenciesRecomendadas) {
                        if (!arrAgenciesRecomendadas.find(ag => ag.id == agencyId)) {
                            arrAgenciesRecomendadas.push(agencyGuardada)

                            let json = JSON.stringify(arrAgenciesRecomendadas);
                            fs.writeFile('agencias-recomendadas.json', json, 'utf8', function (err) {
                                if (err) throw err;
                            });
                            res.status(200).send("La agencia se guardó como recomendada")
                        } else {
                            res.status(200).send("La agencia ya es recomendada")
                        }
                    }

                }
            });
        }
    });


});

//http://localhost:3000/agencies/MLA/5690084ae4b0ce36d943c765/unlike
//http://localhost:3000/api/agencies/MLA/5690084ae4b0ce36d943c765/unlike
router.get('/:siteId/:agency_id/unlike', function (req, res) {
    let agencyId = req.params.agency_id
    let agencyGuardada = {}

    fs.readFile('agencies.json', 'utf8', function readFileCallback(err, data) {
        if(!data || data == "undefined")
        {
            res.send("Debe consultar agencias")
            throw new Error('Debe consultar agencias');
        }
        if (err) {
            throw err
        } else {
            if(!data)
            {
                res.send("Debe consultar agencias")
            }
            let arrAgencies = JSON.parse(data)
            agencyGuardada = arrAgencies.find(ag => ag.id == agencyId)

            fs.readFile('agencias-recomendadas.json', 'utf8', function readFileCallback(err, agenciesRecomendadas) {
                if (err) {
                    throw err;
                } else {
                    let arrAgenciesRecomendadas = [];
                    if (agenciesRecomendadas) {
                        arrAgenciesRecomendadas = JSON.parse(agenciesRecomendadas);
                    }


                    if (arrAgenciesRecomendadas.find(ag => ag.id == agencyId)) {
                        arrAgenciesRecomendadas = arrAgenciesRecomendadas.filter(function (ag) {
                            ag != agencyGuardada;
                        });
                        if (arrAgenciesRecomendadas) {
                            let json = JSON.stringify(arrAgenciesRecomendadas);
                            fs.writeFile('agencias-recomendadas.json', json, 'utf8', function (err) {
                                if (err) throw err;
                            });
                            res.status(200).send("La agencia ya no es recomendada")
                        } else {
                            res.status(200).send("La agencia no es recomendada")
                            //throw new Error('La agencia no es recomendada');
                        }
                    }

                }
            });
        }
    });


});

module.exports = router;

