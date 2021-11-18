import React, { useState, useEffect } from 'react'
import axios from 'axios'

export const Goals = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    axios({
      url: 'http://localhost:3000/goals/1',
      method: 'GET',
      headers: { 'Content-Type': undefined },
    })
      .then(res => {
        setData(res.data)
      })
      .catch(console.error)
  }, [])

  return (
    <div className="goals">
      <div className="Goals">Your Weekly Progress</div>
      <div>{!data ? 'Goals...' : data.map(item => <div key={item.id}>{item.title}</div>)}</div>
    </div>
  )
}
