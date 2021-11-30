import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Formik, Form, FieldArray, Field } from 'formik'

import './list.scss'

export const List = () => {
  const [data, setData] = useState([])

  // TODO: wrap placeholder if long text
  //can't put data as a dependency bc i am getting data in the useEffect so it is continuouslty updating
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

  const onSubmit = e => {
    e.preventDefault()
  }

  const addListItem = () => {
    const listItem = {
      name: '',
      completed: false,
      user_id: 1,
    }

    axios({
      url: 'http://localhost:3000/todo',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: listItem,
    })
      .then(res => {
        setData([...data, res.data])
      })
      .catch(console.error)
  }

  const updateListItem = e => {
    const data = {
      id: e.target.id,
      name: e.target.value,
      completed: e.target.checked,
      user_id: 1,
    }

    axios({
      url: `http://localhost:3000/todo/1/${e.target.id}`,
      method: 'PUT',
      headers: { 'Content-Type': undefined },
      data: data,
    })
  }

  const toggleCompleted = e => {
    const data = {
      id: e.target.id,
      name: e.target.name,
      completed: e.target.checked,
      user_id: 1,
    }

    axios({
      url: `http://localhost:3000/todo/1/${e.target.id}`,
      method: 'PUT',
      headers: { 'Content-Type': undefined },
      data: data,
    })
  }

  const deleteListItem = e => {
    axios({
      url: `http://localhost:3000/todo/1/${e.target.id}`,
      method: 'DELETE',
      headers: { 'Content-Type': undefined },
    })
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
      <div className="to-do__title-wrapper">
      <div className="to-do__title">To Do List</div>
      <button className="to-do__add" onClick={addListItem}>
        +
      </button>
      </div>
      <ul className="to-do__list">
        {!data
          ? 'Loading to do list...'
          : data.map((item, i) => (
              <Formik 
              initialValues={initialValues} 
              key={i} 
              onSubmit={onSubmit}>
                {() => (
                  <Form className="to-do__list-item-form">
                    <FieldArray>
                      <li className="to-do__list-item" key={item.id}>
                        <fieldset>
                          <input
                            type="checkbox"
                            defaultChecked={item.completed}
                            onClick={toggleCompleted}
                            name={item.name}
                            id={item.id}
                          />
                        </fieldset>
                        <fieldset>
                          <Field name="name">
                            {({
                              field,
                              // form, {values, setXXXX, handleXXXX, dirty, isValid, status, etc.}
                            }) => (
                              <div>
                                <input
                                  type="text"
                                  placeholder=' '
                                  {...field}
                                  onChange={updateListItem}
                                  id={item.id}
                                  name={item.name}
                                  defaultValue={item.name}
                                />
                              </div>
                            )}
                          </Field>
                        </fieldset>
                        <button
                          className="to-do__list-item--delete-button"
                          onClick={deleteListItem}
                          id={item.id}
                        >
                          -
                        </button>
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
