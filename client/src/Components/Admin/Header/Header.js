import React from 'react'
import Menu from './Menu/Menu'
import './Header.scss'
class Header extends React.Component {
    render() {
        return (
            <div className="header-menu">
                <Menu/>
            </div>
        )
    }
}

export default Header