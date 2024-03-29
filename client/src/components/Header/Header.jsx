import SearchBar from './Searchbar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/pro-duotone-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { useContext, useState } from 'react'
import Sidebar from './Sidebar'
import UserSidebar from './UserSidebar'
import userContext from '../../userContext'
import LogIn from './LogIn'
import { Link } from 'react-router-dom'
const Header = () => {

    const { loggedIn } = useContext(userContext)
    
    const [navBar, openNavBar] = useState(false)
    const [userBar, openUserBar] = useState(false)

    const toggleNavBar = () => openNavBar(!navBar)
    const toggleUser = () => openUserBar(!userBar)

    return (
        <div className="header"> 
            <div className="header-primary">
                <FontAwesomeIcon icon={faBars} inverse className="side-menu-button" onClick={toggleNavBar}/>
                { navBar ? <Sidebar toggleNavBar={toggleNavBar} /> : null  }
               < Link to="/" className='link-home-logo' > 
                <div className="app-title"> Venyou </div>
                </Link>
                <FontAwesomeIcon icon={faUser} className="user-icon" onClick={toggleUser} />
            </div>

            <div className="header-login">
                { loggedIn && userBar ? <UserSidebar toggleUser={toggleUser} />  : null}
                <div className="header-login-form">
                    { !loggedIn && userBar ? <LogIn /> : null }
                </div>
            </div>    
            
            <div className="header-search">
                <SearchBar />
            </div>      
                  
        </div>
    )
}
export default Header