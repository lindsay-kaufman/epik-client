import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Formik, Form, FieldArray, Field } from 'formik'

import './list.scss'

export const List = () => {
  const [data, setData] = useState([])

  // const [listItem, setListItem] = useState({
  //   name: '',
  //   completed: false,
  //   user_id: null,
  // })

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
      id: 1,
      name: e.target.name,
      completed: e.target.checked,
      user_id: 1
    }

    axios({
      url: `http://localhost:3000/todo/1/${e.target.id}`,
      method: 'PUT',
      headers: { 'Content-Type': undefined },
      data: data,
    })
  }

  const addListItem = () => {
    const listItem = {
      name: '',
      completed: false,
      user_id: 1,
    }

    setData([...data, listItem])
  }


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
              <Formik initialValues={initialValues}>
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
                        </fieldset>
                        <fieldset>
                          <Field name="name">
                            {({
                              field,
                              form, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                            }) => (
                              <div>
                                <input
                                  type="text"
                                  placeholder={item.name || ''}
                                  {...field}
                                  onChange={markItemAsCompleted}
                                  id={item.id}
                                  name={item.name}
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
      <button className="to-do__add" onClick={addListItem}>
        +
      </button>
    </div>
  )
}