const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Kết nối đến MongoDB
mongoose.connect('mongodb://localhost:27017/sanpham', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Mô hình sản phẩm
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String
});

const Product = mongoose.model('Product', productSchema);

// Tạo sản phẩm mới
app.post('/products', async (req, res) => {
  const product = new Product(req.body);
  await product.save();
  res.status(201).send(product);
});

// Lấy danh sách sản phẩm
app.get('/products', async (req, res) => {
  const products = await Product.find();
  res.send(products);
});

// Cập nhật thông tin sản phẩm
app.put('/products/:id', async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  });
  res.send(product);
});

// Xóa sản phẩm
app.delete('/products/:id', async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
