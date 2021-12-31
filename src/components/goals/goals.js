import React, { useState, useEffect } from 'react'
import axios from 'axios'
import dayjs from 'dayjs'
import en from 'dayjs/locale/en'

import './goals.scss'

export const Goals = () => {
  const [goals, setGoals] = useState([])
  const [goalOccurances, setGoalOccurances] = useState([])

  useEffect(() => {
    axios({
      url: 'http://localhost:3000/goals/1',
      method: 'GET',
      headers: { 'Content-Type': undefined },
    })
      .then(res => {
        setGoals(res.data)
      })
      .then(() => {
        goals.forEach(goal => {
          return axios({
            url: `http://localhost:3000/occurances/${goal.id}`,
            method: 'GET',
            headers: { 'Content-Type': undefined },
          }).then(res => {
            setGoalOccurances([...goalOccurances, res.data])
          })
        })
      })
      .catch(console.error)
  }, [])

  // useEffect(() => {
  //   axios({
  //     url: 'http://localhost:3000/occurances',
  //     method: 'GET',
  //     headers: { 'Content-Type': undefined },
  //   })
  //     .then(res => {
  //       setGoalOccurances(res.data)
  //     })
  // })

  //console.log(goalOccurances)

  dayjs.locale({
    ...en,
    weekStart: 1,
  })
  const startOfWeek = dayjs().day(7)

  const weekdays = new Array(7)
    .fill(startOfWeek)
    .map((day, i) => day.add(i, 'day').format('dd').slice(0, 1))

  const occurances = new Array(7).fill()

  // error: Cannot PUT /occurances/2
  const addGoalOccurance = e => {
    console.log(e.target.id)
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
      <div className="goals__wrapper">
        <div className="goals__title">Challenges</div>
        <div className="goals__content">
          <div className="goals__calendar">
            <table>
              <thead>
                <tr>
                  <th>Goals</th>
                  {weekdays.map((day, i) => (
                    <th key={i}>{day}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {goals.map((goal, i) => (
                  <tr key={i}>
                    <td>{goal.title}</td>
                    {occurances.map(i => (
                      <td key={i}>
                        <button
                          className="goals__occurance"
                          type="checkbox"
                          defaultChecked="false"
                          id={goal.id}
                          onClick={addGoalOccurance}
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
