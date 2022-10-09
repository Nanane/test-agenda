import { RefObject, useEffect, useRef, useState } from "react";
import { useMouse, useToggle, useClickAway } from "react-use";

export function useContextMenu() {
    const ref = useRef(null);

    const [isOpen, toggle] = useToggle(false);
    const mouse = useMouse(ref);
    const [left, setLeft] = useState(mouse.docX);
    const [top, setTop] = useState(mouse.docY);
    
    useClickAway(ref, () => {
        toggle(false);
    });

    useEffect(() => {
        if (!isOpen) {
            setLeft(mouse.docX);
            setTop(mouse.docY);
        }
    }, [mouse.docX, mouse.docY, isOpen]);

    return {
        isOpen,
        updateOrShow: () => {
            if (isOpen) {
                setLeft(mouse.docX);
                setTop(mouse.docY);
            } else {
                toggle(true);
            }
        },
        show: () => toggle(true),
        hide: () => toggle(false),
        top,
        left,
        ref
    }
}