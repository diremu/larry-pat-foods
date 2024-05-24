import React, { useState } from 'react'
import { IconContext } from 'react-icons'
import { FaHome, FaTimes } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import '../App.css'
import axios from 'axios'
import { useSignup } from '../hooks/useSignup'

function Signup() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const { signup, isLoading, error } = useSignup()
    // setTimeout(() => {
    //     setError("")
    // }, 3000)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        await signup(firstName, lastName, email, password)
    }

    return (
        <div className='logsign p-4 bg-gray-300 h-[110vh]'>
            <Link to='/'>
                <div className="p-4 bg-green-500 hover:bg-green-300 w-12 rounded">
                    <IconContext.Provider value={{ color: 'white' }}>
                        <FaHome />
                    </IconContext.Provider>
                </div>
            </Link>
            <form action="/" className='rounded-xl w-[300px] md:w-[400px] lg:w-[500px] m-auto p-4 bg-green-100' onSubmit={handleSubmit}>
                <h1 className='font-bold text-xl uppercase'>signup page</h1>
                <br />
                <label htmlFor="first_name">First Name: </label>
                <br className="block md:hidden lg:hidden" />
                <input type="text" id='first_name' className='rounded border-gray-700 px-2 py-1 w-[200px] md:w-[200px] lg:w-[200px]' placeholder='' name='first_name' onChange={(e) => setFirstName(e.target.value)} required />
                <br />
                <br />
                <label htmlFor="last_name">Last Name: </label>
                <br className="block md:hidden lg:hidden" />
                <input type="text" id='last_name' className='rounded border-gray-700 px-2 py-1 w-[200px] md:w-[200px] lg:w-[200px]' placeholder='' name='last_name' onChange={(e) => setLastName(e.target.value)} required />
                <br />
                <br />
                <label htmlFor="email">Email: </label>
                <br className="block md:hidden lg:hidden" />
                <input type="email" id='email' className='rounded border-gray-700 px-2 py-1 w-[200px] md:w-[200px] lg:w-[200px]' placeholder='' name='email' onChange={(e) => setEmail(e.target.value)} required />
                <br />
                <br />
                <label htmlFor="password">Password: </label>
                <br className="block md:hidden lg:hidden" />
                <input type="password" id='password' className='rounded border-gray-700 px-2 py-1 w-[200px] md:w-[200px] lg:w-[200px]' placeholder='' name='password' onChange={(e) => setPassword(e.target.value)} required />
                <br />
                <br />
                <button type="reset" title='Clear form'><FaTimes /></button>
                <br />
                <div className="error text-red-500">
                    {error && <div className='error'>{error}</div>}
                </div>
                <button type="submit" disabled={isLoading} className={isLoading ? 'bg-green-300 hover:bg-green-400 transition-all py-2 px-4 rounded-3xl text-white text-sm' : 'bg-green-500 hover:bg-green-400 transition-all py-2 px-4 rounded-3xl text-white text-sm'}>SIGNUP</button>
                <br />
                <br />
                <hr />
                <br />
                <p>Already have an account?</p>
            </form>
            <p>Login <Link to='/login' className='text-green-700 font-bold hover:underline'>HERE</Link></p>
        </div>
    )
}

export default Signup