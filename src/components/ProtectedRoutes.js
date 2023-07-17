import React from 'react'

export const ProtectedRoutes = (props) => {
    let isLoggedin = localStorage.getItem('logginStatus')
    if(isLoggedin ==='slfjflsdj-sdfhsdofjsd-sflsdf-wsrhwejf'){
        return props.children;
    }
}
