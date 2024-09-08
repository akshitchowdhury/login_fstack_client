import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const Update = () => {
    const { id } = useParams()  // Get the user ID from the URL
    const navigate = useNavigate()
    
    const [user, setUser] = useState({
        username: '',
        firstName: '',
        lastName: '',
        password: '',
        imageUrl: '',
        currency: '',
        amount: '',
        isFavorite: false  // initialize as false
    })
    const [image, setImage] = useState(null)

    // Fetch the user's current details
    useEffect(() => {
        const fetchUser = async () => {
            const res = await fetch(`https://login-fstack-server.vercel.app/${id}`)
            const data = await res.json()
            setUser(data)
        }
        fetchUser()
    }, [id])

    const handleInputChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const handleFileChange = (e) => {
        setImage(e.target.files[0])
    }

    const handleFavoriteChange = (e) => {
        setUser({ ...user, isFavorite: e.target.checked })  // handle checkbox
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append('username', user.username)
        formData.append('firstName', user.firstName)
        formData.append('lastName', user.lastName)
        formData.append('password', user.password)
        formData.append('currency', user.currency)
        formData.append('amount', user.amount)
        formData.append('isFavorite', user.isFavorite)

        if (image) {
            formData.append('image', image)  // Add new image if selected
        }

        try {
            const response = await fetch(`https://login-fstack-server.vercel.app/update/${id}`, {
                method: 'PUT',
                body: formData
            })

            if (response.ok) {
                alert('User updated successfully')
                navigate('/')
            } else {
                alert('Failed to update user')
                console.log(response)
            }
        } catch (error) {
            alert(`Update failed: ${error}`)
        }
    }

    return (
        <div className='max-w-xl mx-auto p-4'>
            <h1 className='text-3xl font-bold mb-4'>Update User</h1>
            <form onSubmit={handleSubmit}>
                <div className='mb-4'>
                    <label className='block text-gray-700 mb-2'>Username</label>
                    <input
                        type='text'
                        name='username'
                        value={user.username}
                        onChange={handleInputChange}
                        className='w-full px-3 py-2 border border-gray-300 rounded-lg'
                    />
                </div>

                <div className='mb-4'>
                    <label className='block text-gray-700 mb-2'>First Name</label>
                    <input
                        type='text'
                        name='firstName'
                        value={user.firstName}
                        onChange={handleInputChange}
                        className='w-full px-3 py-2 border border-gray-300 rounded-lg'
                    />
                </div>

                <div className='mb-4'>
                    <label className='block text-gray-700 mb-2'>Last Name</label>
                    <input
                        type='text'
                        name='lastName'
                        value={user.lastName}
                        onChange={handleInputChange}
                        className='w-full px-3 py-2 border border-gray-300 rounded-lg'
                    />
                </div>

                <div className='mb-4'>
                    <label className='block text-gray-700 mb-2'>Password</label>
                    <input
                        type='password'
                        name='password'
                        value={user.password}
                        onChange={handleInputChange}
                        className='w-full px-3 py-2 border border-gray-300 rounded-lg'
                    />
                </div>
                <div className='mb-4'>
                    <label className='block text-gray-700 mb-2'>Currency</label>
                    <input
            type="text"
            placeholder="Set Currency"
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            required
          />
                </div>
                <div className='mb-4'>
                    <label className='block text-gray-700 mb-2'>Amount</label>
                    <input
            type="number"
            placeholder="Set Amount"
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            required
          />
                </div>

                <div className='mb-4'>
                    <label className='block text-gray-700 mb-2'>Profile Image</label>
                    <input
                        type='file'
                        name='image'
                        onChange={handleFileChange}
                        className='w-full px-3 py-2 border border-gray-300 rounded-lg'
                    />
                    {user.imageUrl && (
                        <img src={user.imageUrl} alt="Profile" className="w-24 h-24 rounded-full mt-4" />
                    )}
                </div>

                <div className='mb-4'>
                    <label className='block text-gray-700 mb-2'>Save as Favorite</label>
                    <input
                        type='checkbox'
                        name='isFavorite'
                        checked={user.isFavorite}  // use checked instead of value
                        onChange={handleFavoriteChange}
                        className='mr-2'
                    />
                    <span>{user.isFavorite ? 'Favorite' : 'Not Favorite'}</span>
                </div>

                <button
                    type='submit'
                    className='bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700'>
                    Update User
                </button>
            </form>
        </div>
    )
}

export default Update
