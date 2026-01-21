import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

function ScrollToTop() {

    // useLocation returns an object and that object has a property named pathname
    // here pathname is defined by react router and not by us
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }, [pathname])

    return null
}

export default ScrollToTop


// using a different variable name (destruturing properly)
// const [pathname: myPath] = useLocation();