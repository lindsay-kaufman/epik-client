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
      <p>{!data ? 'Goals...' : data.map(item => <div>{item.title}</div>)}</p>
    </div>
  )
}
