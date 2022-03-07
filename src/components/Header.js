import React from 'react'
import '../styles/navBar.css'

const Header = () => {
    return (
        <nav className="navigation">
            <h1 id="title">RTEditor</h1>
            <ul>
                <li>
                    <a href="/home">Home</a>
                </li>
                <li>
                    <a href="/about">About</a>
                </li>
                <li>
                    <a href="#">Repo</a>
                </li>
            </ul>
        </nav>
    )
}

export default Header
