"use client"

import { useCallback, useEffect } from "react";

const useClickOutside = (ref, handler) => {

    const handleClickOutside = useCallback((e) => {
        const { current: wrap } = ref
        if (wrap && !wrap.contains(e.target)) {
            handler()
        }
    }, [ref, handler])

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [handleClickOutside])
}

export default useClickOutside