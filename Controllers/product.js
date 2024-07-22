const Product = require("../Model/Products");
const fs = require('fs')


exports.list = async (req, res) => {
  try {
    // Your Code
    const productShow = await Product.find({}).exec();

    res.send(productShow);
  } catch (err) {
    // Detect Error
    console.log(err);
    res.status(500).send("Server Error");
  }
};

exports.read = async (req, res) => {
    try {
      // Your Code
      const id = req.params.id
      const productRead = await Product.findOne({ _id: id }).exec();

      res.send(productRead);
    } catch (err) {
      // Detect Error
      console.log(err);
      res.status(500).send("Server Error");
    }
  };

exports.create = async (req, res) => {
  try {
    // Your Code
    var data = req.body

    if (req.file) {
      data.file = req.file.filename
    }

    const productCreated = await Product(data).save();

    res.send(productCreated);
  } catch (err) {
    // Detect Error
    console.log(err);
  }
};

exports.update = async (req, res) => {
  try {
    // Your Code
    const id = req.params.id
    const productEdit = await Product.findOneAndUpdate({ _id: id }, req.body, { new: true }).exec()

    res.send(productEdit);
  } catch (err) {
    // Detect Error
    console.log(err);
  }
};

exports.remove = async (req, res) => {
  try {
    // Your Code
    const id = req.params.id
    const productRemoved = await Product.findOneAndDelete({ _id: id }).exec()

    if (productRemoved?.file) {   // มี file ไหม
      await fs.unlink('./public/images' + productRemoved.file, (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log('Remove Success');
        }
      })
    }

    res.send(productRemoved);
  } catch (err) {
    // Detect Error
    console.log(err);
  }
};
