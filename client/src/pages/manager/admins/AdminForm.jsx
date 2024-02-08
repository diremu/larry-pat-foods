import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAdminContext } from '../../../hooks/useAdminContext'
import { useAuthContext } from '../../../hooks/useAuthContext'
import '../../../App.css'

function AdminForm() {
    const { dispatch } = useAdminContext()
    const { user } = useAuthContext()

    const navigate = useNavigate()

    const [FirstName, setFirstName] = useState('')
    const [LastName, setLastName] = useState('')
    const [Email, setEmail] = useState('')
    const [Password, setPassword] = useState('ABCabc123!')
    const [Role, setRole] = useState('')
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [EmptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()

        setIsLoading(false)

        if (!user && !user.role === "manager") {
            setError('You must be logged in as a manager')
            prompt('You must be logged in as a manager!')
            navigate('/login')
            return
        }

        const person = { FirstName, LastName, Email, Password, Role }

        const response = await fetch('http://localhost:2500/api/user/signup', {
            method: 'POST',
            body: JSON.stringify(person),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()

        if (!response.ok) {
            console.log(json)
            setError(json.error)
            setEmptyFields(json.emptyFields)
            setIsLoading(false)
        }
        if (response.ok) {
            setFirstName('')
            setLastName('')
            setEmail('')
            setPassword('')
            setRole('')
            setError(null)
            setEmptyFields([])
            // console.log('new product added!', json);
            dispatch({ type: 'CREATE_ADMIN', payload: json })
            setIsLoading(false)
        }
    }

    return (
        <form className="create my-4 w-[350px] h-[320px] rounded-xl bg-green-100 m-auto" onSubmit={handleSubmit}>
            <h3 className='font-bold'>Add a new admin or manager</h3>
            <br />

            <label>FirstName: </label>
            <input
                type="text"
                onChange={(e) => setFirstName(e.target.value)}
                value={FirstName}
                className={EmptyFields.includes('firstName') ? 'error' : 'border rounded px-2'}
            />
            <br />
            <br />

            <label>LastName: </label>
            <input
                type="text"
                onChange={(e) => setLastName(e.target.value)}
                value={LastName}
                className={EmptyFields.includes('lastName') ? 'error' : 'border rounded px-2'}
            />
            <br />
            <br />

            <label>Email: </label>
            <input
                type="text"
                onChange={(e) => setEmail(e.target.value)}
                value={Email}
                className={EmptyFields.includes('email') ? 'error' : 'border rounded px-2'}
            />
            <br />
            <br />

            <label>Password: </label>
            <input
                type="text"
                onChange={(e) => setPassword(e.target.value)}
                value={Password}
                className={EmptyFields.includes('password') ? 'error' : 'border rounded px-2'}
            />
            <br />
            <br />
            
            <label>Role: </label>
            <select
                value={Role}
                onChange={(e) => setRole(e.target.value)}
                className='border rounded px-2'
            >
                <option value="">Select Role</option>
                <option value="Admin">Admin</option>
                <option value="Manager">Manager</option>
            </select>
            <br />
            <br />
            <br />

            <button disabled={isLoading} className={isLoading ? 'bg-green-300 hover:bg-green-400 transition-all py-2 px-4 rounded-3xl text-white text-sm m-4' : 'bg-green-500 hover:bg-green-400 transition-all py-2 px-4 rounded-3xl text-white text-sm m-4'}>Add Manager/Admin</button>
            {error && <div className='error'>{error}</div>}
        </form>
    )
}

export default AdminForm