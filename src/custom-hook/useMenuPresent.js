import { useState, useEffect, useCallback } from 'react';

const useMenuPresent = () => {
    const [isOpen, setIsOpen] = useState(false)

    const handlerOpenMenu = () => {
        setIsOpen(!isOpen)
    }

    const handlerCloseMenu = useCallback(() => {
        setIsOpen(false)
        window.removeEventListener('click',  handlerCloseMenu)
    }, [])

    useEffect(() => {
        if (isOpen) {
            window.addEventListener('click', handlerCloseMenu)
        }
    }, [handlerCloseMenu, isOpen])

    return [
        isOpen, 
        handlerOpenMenu
    ]
}

export default useMenuPresent