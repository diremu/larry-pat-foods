import { useState } from "react";
import { useAuthContext } from './useAuthContext'
import { useNavigate } from 'react-router-dom'

export const useLogin = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { user, dispatch } = useAuthContext()
    const navigate = useNavigate()

    const login = async (email, password) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch('http://localhost:2500/api/user/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        })
        const json = await response.json()

        // console.log(json, response);

        if (!response.ok) {
            setIsLoading(false)
            setError(json.message)
        }
        if (response.ok) {
            localStorage.setItem('larry-pat-user', JSON.stringify(json))

            dispatch(({ type: 'LOGIN', payload: json }))

            setIsLoading(false)
        }
    }

    return { login, isLoading, error }
}