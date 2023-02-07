import React from 'react'
import './GlobalStyles.css';

interface Children {
    children: JSX.Element,
}

export const GlobalStyles: React.FC<Children> = ({ children }) => {
    return children;
}