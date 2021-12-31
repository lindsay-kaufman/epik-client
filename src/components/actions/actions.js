import React, { useState } from 'react'
import { Mood } from './mood/mood'
import { Meals } from './meals/meals'
import { Activites } from './activities/activities'
import activeIcon from './../../assets/hiking-man.png'
import moodIcon from './../../assets/lotus.png'
import mealIcon from './../../assets/food.png'

import './actions.scss'

export const Actions = () => {
  const [displayComponent, setDisplayComponent] = useState(<Activites />)

  return (
    <div className="actions">
      <div className="actions__icons">
        <div className="actions__icon">
          <img
            src={activeIcon}
            alt="active"
            onClick={() => setDisplayComponent(<Activites />)}
          />
          <p>Activities</p>
        </div>

        <div className="actions__icon">
          <img
            src={moodIcon}
            alt="mood"
            onClick={() => setDisplayComponent(<Mood />)}
          />
          <p>Mood</p>
        </div>

        <div className="actions__icon">
          <img
            src={mealIcon}
            alt="meal"
            onClick={() => setDisplayComponent(<Meals />)}
          />
          <p>Meals</p>
        </div>
      </div>

      <div className="actions__display-component">{displayComponent}</div>
    </div>
  )
}
