import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import './PastryList.css'

class PastryList extends React.Component {
  render () {
    const { pastries } = this.props
    return (
      <div className='pastry-list-container'>
        <ul className='pastry-list'>
          {Object.keys(pastries).map(key => {
            const pastry = pastries[key]
            return <li key={key}>
              <Link to={`/${pastry.name}`}>{pastry.name}</Link>
            </li>
          })}
        </ul>
      </div>
    )
  }
}

PastryList.propTypes = {
  pastries: PropTypes.object.isRequired
}

export default PastryList
