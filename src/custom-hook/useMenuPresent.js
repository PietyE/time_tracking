import { useState, useEffect } from "react";

const useMenuPresent = () => {
    const [isOpen, setIsOpen] = useState(false)

    const handlerOpenMenu = () => {
        setIsOpen(!isOpen)
    }

    const handlerCloseMenu = () => {
        setIsOpen(false)
        window.removeEventListener('click',  handlerCloseMenu)
    }

    useEffect(() => {
        if (isOpen) {
            window.addEventListener('click', handlerCloseMenu)
        }
    }, [isOpen])

    return [
        isOpen, 
        handlerOpenMenu
    ]
}

export default useMenuPresent