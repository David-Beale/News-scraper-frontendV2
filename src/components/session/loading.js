import React from 'react';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import Loader from 'react-loader-spinner'
import '../../styles/loading.css'

function Loading () {
  return (
    <div className="loading">
      <Loader
        type="Rings"
        color="#00BFFF"
        height={400}
        width={400}
        timeout={0}
      />
      Loading. Please Wait...
    </div>
  )
}

export default Loading;