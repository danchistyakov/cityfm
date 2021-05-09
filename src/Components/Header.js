import React, { useState } from 'react'
import { BrowserRouter as Route, Link } from 'react-router-dom';

const Header = () => {
    const [toggle, setToggle] = useState('');
    const menu = [
        ['История песен', '/lastsongs'],
        ['Чарт', '/chart'],
        ['Программы', '/shows'],
        ['Гостевая книга', '/chat'],
        ['Вебкамера', '/cam'],
        ['Контакты', '/contact']
    ]

    const navbar = () => {
        if (toggle === 'active') {
            setToggle('')
        } else {
            setToggle('active')
        }
        const overflow = display === false ? 'auto' : 'hidden'
        document.body.style.overflowY = overflow;
    }
    return (
        <header className={`header ${toggle}`}>
            <Link to="/"><h1 className="desktop_logo">City FM</h1></Link>
            <div className="mobile_header">
                <div onClick={navbar} className={`burger ${toggle}`}>
                    <span className="burger_line"></span>
                </div>
                <div className="mobile_logo">
                    <Link to="/" onClick={() => setToggle('')}><h1>City FM</h1></Link>
                </div>
                <p className="mobile_description">№1 in Moscow</p>
            </div>
            <div className={`nav_content ${toggle}`}>
                {menu?.map((menu, index) => (
                    <Link to={menu[1]} onClick={() => setToggle('')} className="nav_url" key={index}><p>{menu[0]}</p></Link>
                ))}
            </div>
        </header>
    )
}

export default Header