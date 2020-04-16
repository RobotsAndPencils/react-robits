import React from 'react'
import { useState } from '@storybook/client-api'
import { text, boolean, select } from '@storybook/addon-knobs'
import Modal, { Modal as ModalComponent } from '../core/components/modal/Modal'
import ModalBody from '../core/components/modal/ModalBody'
import ModalHeader from '../core/components/modal/ModalHeader'
import ModalFooter from '../core/components/modal/ModalFooter'
import Button from '../core/components/button/Button'

export default {
  title: 'Robits/Modal',
  component: ModalComponent
}

export const Normal = ({ themeName }) => {
  const componentKnobs = {
    closeOnBackdropClick: boolean('Close on Backdrop Click', true),
    size: select('Size', ['sm', 'md', 'lg'], 'md'),
    centered: boolean('Centered', false)
  }

  if (componentKnobs.size === 'md') {
    delete componentKnobs.size
  }

  const withCloseButton = boolean('With Close Button', false)
  const header = text('Header', 'Modal Header')
  const footer = text('Footer', 'Modal Footer')
  const withHeaderBorder = boolean('Header With Border', false)

  const [modalOpen, setModalOpen] = useState(false)

  return (
    <>
      <Button themeName={themeName} onClick={() => setModalOpen(true)}>
        Open Modal
      </Button>
      <Modal
        {...componentKnobs}
        themeName={themeName}
        open={modalOpen}
        toggleModal={() => setModalOpen(!modalOpen)}>
        {header ? (
          <ModalHeader
            themeName={themeName}
            withBorder={withHeaderBorder}
            withCloseButton={withCloseButton}
            closeModal={() => setModalOpen(!modalOpen)}>
            {header}
          </ModalHeader>
        ) : (
          []
        )}
        <ModalBody themeName={themeName}>Hello World</ModalBody>
        {footer ? <ModalFooter themeName={themeName}>{footer}</ModalFooter> : []}
      </Modal>
    </>
  )
}
