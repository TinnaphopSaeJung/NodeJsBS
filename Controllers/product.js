const Product = require("../Model/Products");


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
    const productCreated = await Product(req.body).save();

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

    res.send(productRemoved);
  } catch (err) {
    // Detect Error
    console.log(err);
  }
};
