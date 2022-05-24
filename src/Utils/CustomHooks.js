import { useRef } from 'react'

export const useFocus = () => {
    const ref = useRef(null);
    const setFocus = () => {
        ref.current && ref.current.focus();
    }
    return [ref, setFocus];
}