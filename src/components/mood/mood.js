import React, { useState, useEffect } from 'react'
import classNames from 'classnames'
import axios from 'axios'

import './mood.scss'

export const Mood = () => {
  const [mood, setMood] = useState([])
  const [notes, setNotes] = useState('')
  const [score, setScore] = useState(null)

  useEffect(() => {
    axios({
      url: 'http://localhost:3000/mood/1',
      method: 'GET',
      headers: { 'Content-Type': undefined },
    })
      .then(res => {
        setMood([res.data])
        setScore(res.data[0].score)
        setNotes(res.data[0].notes)
      })
      .catch(console.error)
  }, [score, notes])

  const addScore = e => {
    const data = {
      notes: notes,
      score: e.target.id,
      user_id: 1,
    }

    if (mood !== []) {
      const today = new Date(Date.now())
      const filteredMoods = mood[0].filter(
        moods => new Date(moods.created_at) === today
      )

      if (filteredMoods !== []) {
        axios({
          url: `http://localhost:3000/mood/1/${mood[0][0].id}`,
          method: 'DELETE',
          headers: { 'Content-Type': undefined },
        })
      }
    }

    axios({
      url: `http://localhost:3000/mood`,
      method: 'POST',
      headers: { 'Content-Type': undefined },
      data: data,
    }).then(res => setScore(res.data.score))
  }

  const submitNote = e => {
    const data = {
      notes: e.target.value,
      score: score,
      user_id: 1,
      id: mood[0][0].id,
    }

    axios({
      url: `http://localhost:3000/mood/1/${mood[0][0].id}`,
      method: 'PUT',
      headers: { 'Content-Type': undefined },
      data: data,
    })
      .then(res => setNotes(res.data.notes))
  }

  const notesClassName = classNames('mood__notes', {
    'has-note': notes !== ''
  })

  return (
    <div className="mood">
      <div className="mood__title">How's Your Mood?</div>
      <div className="mood__scores">
        <button
          className={score === 1 ? 'mood__score-active' : 'mood__score'}
          id="1"
          onClick={addScore}
        >
          1
        </button>
        <button
          className={score === 2 ? 'mood__score-active' : 'mood__score'}
          id="2"
          onClick={addScore}
        >
          2
        </button>
        <button
          className={score === 3 ? 'mood__score-active' : 'mood__score'}
          id="3"
          onClick={addScore}
        >
          3
        </button>
        <button
          className={score === 4 ? 'mood__score-active' : 'mood__score'}
          id="4"
          onClick={addScore}
        >
          4
        </button>
        <button
          className={score === 5 ? 'mood__score-active' : 'mood__score'}
          id="5"
          onClick={addScore}
        >
          5
        </button>
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
