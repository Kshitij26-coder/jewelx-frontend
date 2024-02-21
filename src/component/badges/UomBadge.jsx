import React from 'react'

const UomBadge = ({code}) => {
  return (
    <div className='btn btn-warning'>
      {code.toUpperCase()}
    </div>
  )
}

export default UomBadge
