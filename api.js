const path = require('path')
const Products = require('./products')
const Orders = require('./orders')
const autoCatch = require('./lib/auto-catch')

/**
@@ -47,34 +48,80 @@ async function getProduct(req, res, next) {
/**
 * Create a product
 * @param {object} req 
@@ -50,36 +51,70 @@ async function getProduct(req, res, next) {
 * @param {object} res 
 */
async function createProduct(req, res) {
  console.log('request body:', req.body)
  res.json(req.body)
  const product = await Products.create(req.body)
  res.json(product)
}

/**
 * Edit a product
 * @param {object} req
@@ -60,9 +20,13 @@ async function createProduct(req, res) {
 * @param {object} res
 * @param {function} next
 */

async function editProduct(req, res, next) {
  console.log(req.body)
  res.json(req.body)
  const change = req.body
  const product = await Products.edit(req.params.id, change)
  res.json(product)
}

/**
 * Delete a product
 * @param {*} req 
@@ -71,15 +35,61 @@ async function editProduct(req, res, next) {
 * @param {*} res 
 * @param {*} next 
 */

async function deleteProduct(req, res, next) {
  res.json({ success: true })
  const response = await Products.destroy(req.params.id)
  res.json(response)
}

async function createOrder (req, res, next) {
  const order = await Orders.create(req.body)
  res.json(orders)
}

async function editOrder(req, res, next) {
  try {
    const updatedOrder = await Orders.edit(req.params.id, req.body); // Calls the edit method from Orders
    res.json(updatedOrder); // Sends the updated order as JSON
  } catch (error) {
    next(error); // Passes errors to the error-handling middleware
  }
}

async function deleteOrder(req, res, next) {
  try {
    await Orders.destroy(req.params.id); // Calls the destroy method from Orders
    res.status(204).send(); // Sends a no-content response
  } catch (error) {
    next(error); // Passes errors to the error-handling middleware
  }
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


module.exports = autoCatch({
  handleRoot,
  listProducts,
  getProduct,
  createProduct,
  editProduct,
  deleteProduct,
  createOrder,
  listOrders,
  editOrder,
  deleteOrder
});