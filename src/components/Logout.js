import React from 'react'
import { useAuth } from '../contexts/AuthContext'

export default function Logout() {

    const { user, logout } = useAuth();

    const handleExitClick = () => {
        logout();
    }
    return (
        <div>
            <div class="dropdown">
                <button class="btn btn-dark dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Welcome, {user.name} <img src={user.avatarUrl} alt="user-profile" width="20px" height="20px"/>
                </button>
                <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
                    <button onClick={handleExitClick} class="btn btn-outline-danger w-100">Exit</button>
                </div>
            </div>
        </div>
    )
}
