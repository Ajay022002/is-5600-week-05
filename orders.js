const cuid = require('cuid')

const db = require('./db')

const Order = db.model('Order', {
  _id: { type: String, default: cuid },
  buyerEmail: { type: String, required: true },
  products: [{
    type: String,
    ref: 'Product', // ref will automatically fetch associated products for us
    index: true,
    required: true
  }],
  status: {
    type: String,
    index: true,
    default: 'CREATED',
    enum: ['CREATED', 'PENDING', 'COMPLETED']
  }
})
async function list(options = {}) {

    const { offset = 0, limit = 25, productId, status } = options;

    const productQuery = productId ? {
      products: productId
    } : {}

    const statusQuery = status ? {
      status: status
    } : {}

    const query = {
      ...productQuery,
      ...statusQuery
    }

    const orders = await Order.find(query)
      .sort({ _id: 1 })
      .skip(offset)
      .limit(limit)

    return orders
  }
  async function get (_id) {
    const order = await Order.findById(_id)
    .populate('products')
    .exec()

  return order
}
async function create (fields) {
    const order = await new Order(fields).save()
    await order.populate('products')
    return order

  }
  async function edit(_id, changes) {
    const order = await Order.findById(_id); // Find the order by ID

    if (!order) {
      throw new Error(`Order with ID ${_id} not found`);
    }
    Object.keys(changes).forEach((key) => {
        order[key] = changes[key];
      });

      await order.save(); // Save the updated order
      await order.populate('products'); // Populate product references
      return order;
    }  
    async function destroy(_id) {
        const result = await Order.deleteOne({ _id });

        if (result.deletedCount === 0) {
          throw new Error(`Order with ID ${_id} not found`);
        }
      }

  module.exports = {
    list,
    get,
    create,
    edit,
    destroy,
  };

