import React from 'react'
import { CustomModal } from './../../../../modal/modal'
import { Formik, Form } from 'formik'
import axios from 'axios'

import './meal-modal.scss'

export const AddMealModal = ({ isOpen, onClose, className, editItem, onMealAdded }) => {
  const isEditing = editItem.name !== '' || editItem.notes !== ''

  const initialValues = {
    name: editItem.name,
    notes: editItem.notes,
    user_id: 1,
  }

  const onUpdate = (item, values) => {
    console.log('update')
    axios({
      url: `http://localhost:3000/meals/1/${item.id}`,
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      data: {
        name: values.name || item.name,
        notes: values.notes || item.notes,
      },
    }).then(() => onClose())
  }

  const onCreate = values => {
    axios({
      url: 'http://localhost:3000/meals/',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: values,
    }).then(() => onClose())
  }

  const onDelete = () => {
    axios({
      url: `http://localhost:3000/meals/1/${editItem.id}`,
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    }).then(() => onClose())
  }

  return (
    <CustomModal className={className} isOpen={isOpen} onClose={onClose}>
      <div className="meal-modal">
        <div className="meal-modal__title">
          {isEditing ? (
            <span>Edit Your Meal</span>
          ) : (
            <span>Log A New Meal</span>
          )}
        </div>
        <Formik
          initialValues={initialValues}
          onSubmit={values =>
            isEditing ? onUpdate(editItem, values) : onCreate(values)
          }
        >
          {props => (
            <Form className="meal-modal__add-item-form">
              <fieldset>
                <input
                  type="text"
                  placeholder="Name..."
                  name="name"
                  id="name"
                  onChange={props.handleChange}
                  defaultValue={editItem.name}
                />
              </fieldset>
              <fieldset>
                <textarea
                  type="text"
                  placeholder="Description..."
                  name="notes"
                  id="notes"
                  onChange={props.handleChange}
                  defaultValue={editItem.notes}
                />
              </fieldset>
              <div className="meal-modal__btn-wrapper">
                <button className={`meal-modal__btn${isEditing ? '-update' : ''}`} type="submit">
                  {isEditing ? 'Update' : 'Add'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
        {isEditing && (
          <button
            className="meal-modal__btn-delete"
            type="button"
            onClick={onDelete}
          >
            Delete
          </button>
        )}
      </div>
    </CustomModal>
  )
}
