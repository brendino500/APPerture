import React from 'react'

const App = () => {
  
  React.useEffect(() => {
    const getData = async () => {
      const res = await fetch('/api/photos/')
      const data = await res.json()
      console.log(data)
    }
    getData()
  }, [])



  return (
    <h1>Hello APPerture</h1>
  )
}

export default App
