import { useState } from "react"

export default function useModal() {
    const [isOpen, setIsOpen] = useState(false);
    return {
        isOpen,
        show: () => setIsOpen(true),
        hide: () => setIsOpen(false),
    }
}