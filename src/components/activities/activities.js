import React, { useEffect, useState } from 'react'
import { Formik, Form, FieldArray, Field } from 'formik'
import axios from 'axios'

import './activities.scss'

export const Activites = () => {
  const [activities, setActivites] = useState([])

  useEffect(() => {
    axios({
      url: 'http://localhost:3000/activity/1',
      method: 'GET',
      headers: { 'Content-Type': undefined },
    }).then(res => {
      const filteredData = res.data.filter(
        d =>
          new Date(d.created_at).toDateString() ===
          new Date(Date.now()).toDateString()
      )
      if (filteredData.length) {
        setActivites(filteredData)
      }
    })
  }, [])

  const addActivity = () => {
    const listItem = {
      name: '',
      completed: false,
      user_id: 1,
    }

    axios({
      url: 'http://localhost:3000/activity',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: listItem,
    })
      .then(res => {
        setActivites([...activities, res.data])
      })
      .catch(console.error)
  }

  const updateActivity = e => {
    const data = {
      id: e.target.id,
      description: e.target.value,
      user_id: 1,
    }

    axios({
      url: `http://localhost:3000/activity/1/${e.target.id}`,
      method: 'PUT',
      headers: { 'Content-Type': undefined },
      data: data,
    })
  }

  const onDelete = activity => {
    axios({
      url: `http://localhost:3000/activity/1/${activity.id}`,
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const initialValues = {
    activities: [
      {
        description: '',
      },
    ],
  }

  return (
    <div className="activities">
      <div className="activities__title-wrapper">
      <div className="activities__title">What Did You Do Today?</div>
      <button className="to-do__add" onClick={addActivity}>
        +
      </button>
      </div>
      <ul className="activities__list">
        {!activities
          ? 'Add an activity...'
          : activities.map((activity, i) => (
              <Formik
                initialValues={initialValues}
                key={i}
                onSubmit={e => e.preventDefault()}
              >
                {() => (
                  <Form className="activities__list-form">
                    <FieldArray>
                      <li className="activities__list-item" key={activity.id}>
                        <button
                          className="activities__list-item--delete-button"
                          onClick={onDelete}
                          id={activity.id}
                        >
                          -
                        </button>
                        <fieldset>
                          <Field name="description">
                            {({ field }) => (
                              <div>
                                <input
                                  type="text"
                                  placeholder=" "
                                  {...field}
                                  onChange={updateActivity}
                                  id={activity.id}
                                  name={activity.description}
                                  defaultValue={activity.description}
                                />
                              </div>
                            )}
                          </Field>
                        </fieldset>
                      </li>
                    </FieldArray>
                  </Form>
                )}
              </Formik>
            ))}
      </ul>
    </div>
  )
}
