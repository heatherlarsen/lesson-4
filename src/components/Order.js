import React from 'react'
import PropTypes from 'prop-types'
import './Order.css'

function formatPrice (priceInCents) {
  return `$${(priceInCents / 100).toFixed(2)}`
}

class Order extends React.Component {

  render () {
    const { order } = this.props

    const totalPrice = Object.keys(order)
      .map(key => order[key])
      .reduce((acc, pastry) => {
        return acc + (pastry.quantity * pastry.price)
      }, 0)

    return (
      <div className='order-wrap'>
        <h2 className='car-word'>Basket</h2>
        <table className='order'>
          <thead>
            <tr>
              <th>Item</th>
              <th>Price</th> 
              <th colSpan='2'>Qty</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(order).map(key => {
              const item = order[key]
              return (
                <tr key={key}>
                  <td>{item.name}</td>
                  <td>{formatPrice(item.price)}</td>
                  <td>{item.quantity}</td>
                  <td className='btn-cell'>
                    <form method='POST' action='/order' className='remove-from-order' onSubmit={this.props.removeFromOrder}>
                      <input type='hidden' value={item.name} />
                      <button type='submit' className='btn'>Remove</button>
                    </form>
                  </td>
                </tr>
              )
            })}
            <tr>
              <td colSpan='4' className='subtotal'><span>Subtotal:</span> {formatPrice(totalPrice)}</td>
            </tr>
            <tr>
              <td colSpan='4' className='clear-wrap'>
                <form method='POST' action='/order' className='clear-order' onSubmit={this.props.clearOrder}>
                  <button type='submit' className='btn'>Clear Basket</button>
                </form>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

Order.propTypes = {
  order: PropTypes.object.isRequired
}

export default Order
