import React from 'react'
import { CustomModal } from './../../../modal/modal'
import { Formik, Form } from 'formik'
import axios from 'axios'

import './activity-modal.scss'

export const ActivityModal = ({ isOpen, onClose, className, editItem }) => {
  const initialValues = {
    description: editItem.description,
    user_id: 1,
  }

  const onDelete = () => {
    axios({
      url: `http://localhost:3000/activity/1/${editItem.id}`,
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    }).then(onClose())
  }

  console.log(editItem.id)
  return (
    <CustomModal className={className} isOpen={isOpen} onClose={onClose}>
      <div className="activity-modal">
        <div className="activity-modal__title">What did you do today?</div>
        <Formik
          initialValues={initialValues}
          onSubmit={values => {
            axios({
              url: `http://localhost:3000/activity/1/${editItem.id}`,
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              data: {
                description: values.description || editItem.description,
              },
            })
          }}
        >
          {props => (
            <Form className="activity-modal__edit-activity-form">
              <fieldset>
                <textarea
                  type="text"
                  defaultValue={editItem.description}
                  name="description"
                  id="description"
                  onChange={props.handleChange}
                />
              </fieldset>
              <button
                className="activit-modal__submit"
                type="submit"
                onClick={onClose}
              >
                Update
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </CustomModal>
  )
}
