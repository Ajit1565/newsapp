import React, { Component } from 'react'

export default class Spinner extends Component {
  render() {
    return (
      <div className='text-center'>
        <img className='my-3' src="/loading.gif" alt="loading" height={50} width={50} />
      </div>
    )
  }
}
