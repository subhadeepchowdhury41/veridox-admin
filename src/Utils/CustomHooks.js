import { useEffect, useRef, useState } from 'react'
import CustomStack from './CustomStack';

export const useFocus = () => {
    const ref = useRef(null);
    const setFocus = () => {
        ref.current && ref.current.focus();
    }
    return [ref, setFocus];
}

export const usePrevious = (value) => {

    let stack = new CustomStack(10);

    const ref = useRef(stack);

    useEffect(() => {
        ref.current.push(value);
    }, [value]);
    
    return [ref.current, ref.current.pop];
}

export const useAsyncReducer = (reducer, initState) => {
    const [state, setState] = useState(initState);
    const dispatch = async (action) => setState(await reducer(state, action));

    return [state, dispatch];
}