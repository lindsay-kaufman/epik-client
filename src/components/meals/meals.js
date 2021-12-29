import React, { useState, useEffect } from 'react'
import { AddMealModal } from './meal-modal/meal-modal'
import axios from 'axios'

import './meals.scss'

export const Meals = () => {
  const [meals, setMeals] = useState([])
  const [isEditModalOpen, setEditModalOpen] = useState(false)
  const [editItem, setEditItem] = useState({ name: '', notes: '', id: null })

  useEffect(() => {
    axios({
      url: 'http://localhost:3000/meals/1',
      method: 'GET',
      headers: { 'Content-Type': undefined },
    }).then(res => {
      const filteredData = res.data.filter(
        d =>
          new Date(d.created_at).toDateString() ===
          new Date(Date.now()).toDateString()
      )
      if (filteredData.length) {
        setMeals(filteredData)
      }
    })
  }, [])


  
  return (
    <div className="meals">
      <div className="meals__title-wrapper">
        <div className="meals__title">What Did You Eat Today?</div>
        <button className="meals__add" onClick={() => setEditModalOpen(true)}>
          +
        </button>
      </div>
      <ul className="meals__list">
        {!meals.length ? (
          <li className="meals__meal">
            <p className="meals__meal-name">Pancakes...</p>
          </li>
        ) : (
          meals.map(meal => (
            <li className="meals__meal" key={meal.id}>
              <p className="meals__meal-name">{meal.name}</p>
              <button
                className="meals__meal-edit"
                onClick={() => {
                  setEditItem({ name: meal.name, notes: meal.notes, id: meal.id })
                  setEditModalOpen(true)
                }}
                id={meal.id}
              >-</button>
            </li>
          ))
        )}
      </ul>
      <AddMealModal
        className="meals__edit-modal"
        isOpen={isEditModalOpen}
        onClose={() => {
          setEditModalOpen(false)
          setEditItem({ name: '', notes: '', id: null})
        }}
        editItem={editItem}
      />
    </div>
  )
}
