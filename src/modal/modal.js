import { React } from 'react'

import './modal.scss'

export const CustomModal = ({ className, children, isOpen, onClose }) => {

  return (
    <div>
      <modal className={isOpen ? 'modal modal-open' : 'modal modal-closed'}>
        <div className="modal__container">
          <button type="button" className="modal__container-btn" onClick={onClose}>X</button>
          <div classNames={`${className} modal__content`}>{children}</div>
        </div>
      </modal>
    </div>
  )
}
