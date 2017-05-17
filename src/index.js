import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  hashHistory,
  Switch
} from 'react-router-dom'

import pastries from './database/pastries'

import App from './components/App'
import PastryList from './components/PastryList'
import PastryPage from './components/PastryPage'
import Order from './components/Order'
import NotFound from './components/NotFound'

class Root extends React.Component {
  constructor () {
    super()
    this.state = {
      pastries, 
      order: {}, 
    }

    this.addToOrder = this.addToOrder.bind(this)
    this.removeFromOrder = this.removeFromOrder.bind(this)
    this.clearOrder = this.clearOrder.bind(this)
  }

  addToOrder (e) {
    e.preventDefault()

    const value = e.target.querySelector('input').value

    const pastries = Object.keys(this.state.pastries).map(key => this.state.pastries[key])
    const pastry = pastries.find(p => p.name === value)
    if (!pastry) return 

    const order = Object.assign({}, this.state.order)
    const orderPastry = Object.assign({}, order[pastry.name])

    if (orderPastry.name) {
      // pastry already exists, adjust quantity
      orderPastry.quantity++

      // add to order
      order[pastry.name] = orderPastry
    } else {
      // pastry doesn't exist in order yet, add 1
      order[pastry.name] = Object.assign({}, pastry, {
        quantity: 1
      })
    }

    // set order state
    this.setState({
      order
    })
  }

  removeFromOrder(e) {
    e.preventDefault()

    const value = e.target.querySelector('input').value

    const pastries = Object.keys(this.state.pastries).map(key => this.state.pastries[key])
    const pastry = pastries.find(p => p.name === value)
    if (!pastry) return

    const order = Object.assign({}, this.state.order)
    const orderPastry = Object.assign({}, order[pastry.name])

    if (orderPastry.quantity > 1) {
      // more than 1 in order, remove 1
      orderPastry.quantity--
      order[pastry.name] = orderPastry
    } else {
      // 1 in order, remove pastry
      delete order[pastry.name]
    }

    this.setState({
      order
    })
  }

  clearOrder(e) {
    e.preventDefault()

    const order = Object.assign({}, '')

    this.setState({
      order
    })
  }

  render () {
    return (
      <Router history={hashHistory}>
        <App>
          <Switch>
            <Route exact path='/' render={props => (
              <PastryList pastries={this.state.pastries} loadPastries={this.loadPastries} />
            )} />
            <Route path='/order' render={props => (
              <Order order={this.state.order} removeFromOrder={this.removeFromOrder} clearOrder={this.clearOrder} />
            )} />
            <Route path='/:pastry' render={props => {
              const pastryName = props.match.params.pastry
              const pastries = Object.keys(this.state.pastries).map(key => this.state.pastries[key])
              const pastry = pastries.find(p => p.name === pastryName)
              if (pastry) {
                return (
                  <PastryPage pastry={pastry} addToOrder={this.addToOrder} />
                )
              } else {
                return (
                  <Route path='*' status={404} component={NotFound} />
                )
              }
            }} />
          </Switch>
        </App>
      </Router>
    )
  }
}

ReactDOM.render(
  <Root />,
  document.getElementById('root')
)
