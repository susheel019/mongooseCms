const express = require("express");
var router = express.Router();
const Customer = require("../BLL/CustomerDbBll");
const bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: true });
Customer.initializeConnection();

router.get("/", (req, res) => {
  var p = Customer.showAllCustomer();
  p.then((data) => {
    res.render("Customer", { cusArr: data });
  });
});

router.post("/", urlencodedParser, async (req, res) => {
  //we need data

  // console.log(req.body);
  var cus = new Customer();
  cus.id = parseInt(req.body.txtId);
  cus.name = req.body.txtName;
  cus.address = req.body.txtAddress;
  cus.mobile = req.body.txtMobile;

  var result = cus.addCustomer();
  result.then(
    (cus) => {
      var p = Customer.showAllCustomer();
      p.then(
        (data) => {
          res.render("Customer", { cusArr: data });
        },
        (err) => {
          res.render("Customer", { cus: err });
        }
      );
    },
    (err) => {
      res.render("Customer", { cusArr: [], err: err });
    }
  );
});

router.get("/search/:id", (req, res) => {
  var cus = new Customer();
  var id = req.params.id;
  var cus = cus.searchCustomer(id);
  cus.then((cus) => {
    var p = Customer.showAllCustomer();
    p.then(
      (data) => {
        console.log(cus);
        res.render("Customer", { cusArr: data, cus: cus });
      },
      (err) => {
        res.render("Customer", { cusArr: data, err: err.message });
      }
    );
  });
});

router.get("/delete/:id", (req, res) => {
  var cus = new Customer();
  var id = req.params.id;
  var cus = cus.deleteCustomer(id);
  cus.then((data) => {
    var p = Customer.showAllCustomer();
    p.then(
      (data) => {
        res.render("Customer", { cusArr: data });
      },
      (err) => {
        res.render("Customer", { cusArr: data, err: err });
      }
    );
  });
});

router.get("/modify/:id", urlencodedParser , (req, res) => {
  var cus = new Customer();
  cus.id = req.body.txtId
  console.log(cus.id)
  console.log(req.body.txtName);;
  cus.name = req.body.txtName;
  cus.address = req.body.txtAddress;
  cus.mobile = req.body.txtMobile;
  var cus = cus.modifyCustomer(req.params.id);
  cus.then((data) => {
    var p = Customer.showAllCustomer();
    p.then((data) => {
      res.render("Customer", { cusArr: data });
    });
  });
});

module.exports = router;
