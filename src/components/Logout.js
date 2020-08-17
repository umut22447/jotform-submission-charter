import React from 'react'
import { useAuth } from '../contexts/AuthContext'

export default function Logout() {

    const { logout } = useAuth();

    const handleExitClick = () => {
        logout();
    }
    return (
        <div>
            <button onClick={handleExitClick}>EXIT</button>
        </div>
    )
}
