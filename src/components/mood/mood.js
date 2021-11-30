import React, { useState, useEffect } from 'react'
import classNames from 'classnames'
import axios from 'axios'

import './mood.scss'

export const Mood = () => {
  const [mood, setMood] = useState([])
  const [notes, setNotes] = useState('')
  const [score, setScore] = useState(null)
  const scores = [1, 2, 3, 4, 5]

  // maybe for week view display a button that opens a modal with scores and notes for the week
  // need to think of a way to view past notes by date
  // add today's date into query for get request

  useEffect(() => {
    axios({
      url: 'http://localhost:3000/mood/1',
      method: 'GET',
      headers: { 'Content-Type': undefined },
    })
      .then(res => {
        const filteredData = res.data.filter(
          d =>
            new Date(d.created_at).toDateString() ===
            new Date(Date.now()).toDateString()
        )

        if (filteredData.length) {
          const currentMood = filteredData.length - 1
          setMood([filteredData[currentMood]])
          setScore(filteredData[currentMood].score)
          setNotes(filteredData[currentMood].notes)
        }
      })
      .catch(console.error)
  }, [score, notes])

  const addScore = e => {
    const data = {
      notes: notes,
      score: e.target.id || score,
      user_id: 1,
    }

    if (mood.length) {
      axios({
        url: `http://localhost:3000/mood/1/${mood[0].id}`,
        method: 'DELETE',
        headers: { 'Content-Type': undefined },
      })
    }

    axios({
      url: `http://localhost:3000/mood`,
      method: 'POST',
      headers: { 'Content-Type': undefined },
      data: data,
    }).then(res => setScore(res.data.score))
  }

  const submitNote = e => {
    const method = mood.length ? 'PUT' : 'POST'

    const data = {
      notes: e.target.value,
      score: score,
      user_id: 1,
      id: mood.length && mood[0].id,
    }

    axios({
      url: `http://localhost:3000/mood/1/${mood[0].id}`,
      method: method,
      headers: { 'Content-Type': undefined },
      data: data,
    }).then(res => setNotes(res.data.notes))
  }

  const notesClassName = classNames('mood__notes', {
    'has-note': notes !== '',
  })

  return (
    <div className="mood">
      <div className="mood__title">How's Your Mood?</div>
      <div className="mood__scores">
        {scores.map(num => (
          <button
            className={score === num ? 'mood__score-active' : 'mood__score'}
            id={num}
            onClick={addScore}
            key={num}
          >
            {num}
          </button>
        ))}
      </div>
      <form className="mood__notes">
        <textarea
          className={notesClassName}
          id={score}
          placeholder={'Thoughts for the day...?'}
          defaultValue={notes}
          onChange={submitNote}
        />

        {/* <button type="submit" className="mode__notes-submit" onClick={submitNote} disabled={score === null}>Save Note</button> */}
      </form>
    </div>
  )
}
