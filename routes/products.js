var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
var Product = require("../db/models/products");

/* GET products listing. */
router.get("/", (req, res, next) => {
  Product.find({}, (err, result) => {
    if (err) {
      console.debug("Hey Look! Error", err);
      res.json(err);
    } else {
      // console.log(res);
      res.json(result);
    }
  });
});

router.post("/", (req, res, next) => {
  console.debug(req.body);
  const data = req.body;
  const product1 = new Product({
    code: data.code,
    name: data.name,
    price: data.price,
    remainingStock: data.remainingStock,
  });
  product1.save((err, newInstance) => {
    if (err) {
      console.error("Hey look, Error!", err);
      res.json(err);
    } else {
      res.json(newInstance);
    }
  });
});

router.delete("/:id", (req, res, next) => {
  const id = req.params['id'];
  console.debug(id);
  Product.findByIdAndDelete(id, (err, doc) => {
    if (err) {
      console.error("Hey look, Error!", err);
      res.json(err);
    } else {
      res.status(200).json(doc);
    }
  });
});

router.put("/", async (req, res, next) => {
  console.debug(req.body);
  const data = req.body;
  const id =data._id;
  delete data._id;
  console.debug(data);

  Product.findByIdAndDelete(id,data,(err,doc)=>{
    if(err){
      console.error("Heylook,Error!",err);
      res.json(err);
    }else{
      res.status(200).json(doc);
    }
  });
});
module.exports = router;
