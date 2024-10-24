import React from 'react'

const ProgressLoader = ({ progress }) => {
  return (
        <div style={{
      maxWidth: '350px',
      width: '100%',
      backgroundColor: '#e0e0e0',
      borderRadius: '3px',
      overflow: 'hidden',
      height: '4px', 
      margin: '10px 0'
    }}>
      <div style={{
        width: `${progress}%`,
        backgroundColor: '#0d6efd', 
        height: '100%',
        transition: 'width 0.5s ease'
      }} />
    </div>

  )
}

export default ProgressLoader
