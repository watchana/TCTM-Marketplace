import React, { useEffect, useState } from 'react'
import axios from 'axios'

const YourComponent = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API}TCTM.infromation.getallinf_test`)
        setData(response.data.message.Data)
        console.log('response', response)
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [])

  return (
    <div>
      {data.map((item, index) => (
        <div key={index}>
          <p>Name: {item.name}</p>
          <p>Creation: {item.creation}</p>
          <p>Modified: {item.modified}</p>
          <p>post_name: {item.post_name}</p>
          <p>post_id: {item.post_id}</p>
          {/* Add more fields as needed */}
        </div>
      ))}
    </div>
  )
}

export default YourComponent
