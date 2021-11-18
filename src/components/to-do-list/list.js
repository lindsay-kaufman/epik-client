import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Formik, Form, FieldArray, Field } from 'formik'

import './list.scss'

export const List = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    axios({
      url: 'http://localhost:3000/todo/1',
      method: 'GET',
      headers: { 'Content-Type': undefined },
    })
      .then(res => {
        setData(res.data)
      })
      .catch(console.error)
  }, [])

  const markItemAsCompleted = e => {
    const data = {
      name: e.target.name,
      completed: e.target.checked,
    }

    axios({
      url: `http://localhost:3000/todo/1/${e.target.id}`,
      method: 'PUT',
      headers: { 'Content-Type': undefined },
      data: data,
    })
  }

  const updateListItem = () => {}

  const initialValues = {
    listItems: [
      {
        name: '',
        completed: false,
        checked: [],
      },
    ],
  }

  return (
    <div className="to-do">
      <div className="to-do__title">To Do List:</div>
      <ul className="to-do__list">
        {!data
          ? 'Loading to do list...'
          : data.map(item => (
              <Formik initialValues={initialValues} onSubmit={updateListItem}>
                {() => (
                  <Form className="to-do__list-item-form">
                    <FieldArray>
                      <li className="to-do__list-item" key={item.id}>
                        <fieldset>
                          <input
                            type="checkbox"
                            defaultChecked={item.completed}
                            onClick={markItemAsCompleted}
                            name={item.name}
                            id={item.id}
                          />

                          <Field
                            name="name"
                            placeholder={item.name || ''}
                            type="text"
                          />
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
