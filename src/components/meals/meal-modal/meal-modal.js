import React from 'react'
import { CustomModal } from './../../../modal/modal'
import { Formik, Form } from 'formik'
import axios from 'axios'

import './meal-modal.scss'

export const AddMealModal = ({ isOpen, onClose, className, editItem }) => {
  const isEditing = editItem.name !== ''

  const initialValues = {
    name: editItem.name,
    notes: editItem.notes,
    user_id: 1,
  }

  //add delete functionality

  return (
    <CustomModal className={className} isOpen={isOpen} onClose={onClose}>
      <div className="meal-modal">
        <div className="meal-modal__title">
          {isEditing ? (
            <div className="meal-modal__btn-wrapper">
              <button className="meal-modal__btn" type="submit">
                {isEditing ? 'Update' : 'Add'}
              </button>
              {isEditing && (
                <button className="meal-modal__btn-delete">Delete</button>
              )}
            </div>
          ) : (
            <span>Log A New Meal</span>
          )}
        </div>
        <Formik
          initialValues={initialValues}
          onSubmit={values => {
            editItem.name !== ''
              ? axios({
                  url: `http://localhost:3000/meals/1/${editItem.id}`,
                  method: 'PUT',
                  headers: { 'Content-Type': 'application/json' },
                  data: {
                    name: values.name || editItem.name,
                    notes: values.notes || editItem.notes,
                  },
                })
              : axios({
                  url: 'http://localhost:3000/meals/',
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  data: values,
                })
          }}
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
              {!isEditing && (
                <div className="meal-modal__btn-wrapper">
                  <button className="meal-modal__btn" type="submit">
                    Add
                  </button>
                </div>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </CustomModal>
  )
}
