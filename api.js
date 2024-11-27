const path = require('path')
const Products = require('./products')
const autoCatch = require('./lib/auto-catch')
const orders = require('./orders')
const autoCatch = require('./lib/auto-catch') 

/**
 * Handle the root route
@@ -49,9 +50,9 @@ async function getProduct(req, res, next) {
 * @param {object} req 
 * @param {object} res 
 */
async function createProduct(req, res) {
  console.log('request body:', req.body)
  res.json(req.body)
async function createProduct (req, res, next) {
  const product = await Products.create(req.body)
  res.json(product)
}

/**
@@ -74,12 +75,60 @@ async function editProduct(req, res, next) {
*/
async function deleteProduct(req, res, next) {
  res.json({ success: true })
}
async function editProduct (req, res, next) {
  const change = req.body
  const product = await Products.edit(req.params.id, change)
  res.json(product)
}

async function deleteProduct (req, res, next) {
  const response = await Products.destroy(req.params.id)
  res.json(response)
}
async function createOrder (req, res, next) {
  const order = await Orders.create(req.body)
  res.json(orders)
}
async function listOrders (req, res, next) {
  const { offset = 0, limit = 25, productId, status } = req.query

  const orders = await Orders.list({ 
    offset: Number(offset), 
    limit: Number(limit),
    productId, 
    status 
  })

  res.json(orders)
}
async function editOrder(req, res, next) {
  try {
    const changes = req.body;
    const order = await Orders.edit(req.params.id, changes);
    res.json(order);
  } catch (error) {
    next(error);
  }
}
async function deleteOrder(req, res, next) {
  try {
    await Orders.destroy(req.params.id);
    res.status(204).send(); // Respond with no content
  } catch (error) {
    next(error);
  }
}

module.exports = autoCatch({
  handleRoot,
  listProducts,
  getProduct,
  createProduct,
  editProduct,
  deleteProduct
  deleteProduct,
  listOrders,
  createOrder,
  editOrder,
  deleteOrder,
});
