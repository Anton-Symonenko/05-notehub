import css from "./Modal.module.css";

import type { ReactNode } from "react";

interface ModalProps{
    children: ReactNode;
}

export default function Modal({ children }: ModalProps) {
    return (
        <div className={css.backdrop}>
            <div className={css.modal}>
                {children}
            </div>
        </div>
    );
}