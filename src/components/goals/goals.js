import React, { useState, useEffect, useMemo } from 'react'
import axios from 'axios'
import dayjs from 'dayjs'
import en from 'dayjs/locale/en'

import './goals.scss'

export const Goals = () => {
  const [goals, setData] = useState([])

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

  dayjs.locale({
    ...en,
    weekStart: 1,
  })
  const startOfWeek = dayjs().day(7)

  const weekdays = new Array(7)
    .fill(startOfWeek)
    .map((day, i) => day.add(i, 'day').format('dd'))

  const occurances = new Array(7).fill()

 // error: Cannot PUT /occurances/2
  const addGoalOccurance = e => {
    // const dateAdded = new Date(Date.now())
    // const timezone = dateAdded.getTimezoneOffset() * 60000
    // const createdAt = dateAdded - timezone
    
    axios({
      url: `http://localhost:3000/occurances/${e.target.id - 1}`,
      method: 'POST',
      headers: { 'Content-Type': undefined },
    })
    .then(console.log('occurance added'))
    .catch()
  }

  return (
    <div className="goals">
      <div className="goals__title">Your Weekly Progress</div>
      <div className="goals__wrapper">
        <div className="goals__calendar">
          <table>
            <thead>
            <tr>
              <th>Goals</th>
              {weekdays.map((day, i) => {
                return (
                  <>
                    <th key={i}>{day}</th>
                  </>
                )
              })}
            </tr>
            </thead>
            <tbody>
              {goals.map(goal => {
                return (
                  <tr key={goal.id}>
                    <td>{goal.title}</td>
                    {occurances.map((i) => {
                      return (
                        <td key={i}> 
                          <button
                            className="goals__occurance"
                            type="checkbox"
                            defaultChecked="false"
                            id={goal.id}
                            onClick={addGoalOccurance}
                          />
                        </td>
                      )
                    })}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
