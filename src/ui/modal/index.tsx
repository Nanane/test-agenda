import React from "react";

interface ModalProps {
    isOpen: boolean;
    onHide: () => void;
    children?: React.ReactNode;
}
export default function Modal({ isOpen, onHide, children }: ModalProps) {
    const display = isOpen ? 'block' : 'hidden';

    const stopPropagation = (e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation();

    return isOpen ? (<div onClick={onHide} className={`${display} bg-slate-300 bg-opacity-50 z-50 fixed top-0 left-0 w-screen h-screen backdrop-blur`}>
            <div onClick={stopPropagation} className={`bg-white rounded-xl w-1/2 h-auto mx-auto mt-24 drop-shadow-2xl p-8`}>
                {children}
            </div>
        </div>) : null;
}