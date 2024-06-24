import { useState } from 'react'

export const useModal = () => {
  const [isShown, setIsShown] = useState<boolean>(false)

  const openModal = () => {
    document.body.classList.add('noScroll')
    setIsShown(true)
  }

  const closeModal = () => {
    document.body.classList.remove('noScroll')
    setIsShown(false)
  }

  return {
    isShown,
    openModal,
    closeModal,
  }
}
