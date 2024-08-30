import React, { useEffect, useState } from 'react'
import { Card, Dialog } from 'shadcn-react'

const Posts = () => {
  
    const [post, setPosts] = useState([])

    const handleDelete = async (id) => {
        try {
            const delCard = await fetch(`https://login-fstack-server.vercel.app/delete/${id}`, { method: "DELETE" })
            const delRes = await delCard.json()
            alert("Card deleted successfully")
            window.location.reload()
        } catch (error) {
            alert(`Unable to delete card due to ${error}`)
        }
    }

    const userLists = async function() {
        const data = await fetch("https://login-fstack-server.vercel.app/", { method: "GET" })
        const dataFlow = await data.json()
        setPosts(dataFlow)
    }

    useEffect(() => {
        userLists()
    }, [])
  
    return (
        <div className='max-w-4xl mx-auto p-4'>
            <h1 className='text-5xl text-center font-bold mb-8'>User List</h1>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {post.map((user, index) => (
                    <Card key={index} className="shadow-lg p-4">
                        <div className="flex flex-col items-center">
                            <img 
                                src={user.imageUrl} 
                                alt="Profile" 
                                className="w-24 h-24 rounded-full object-cover mb-4"
                            />
                            <h1 className="text-2xl font-semibold text-gray-900 mb-2">{user.username}</h1>
                            <p className="text-gray-600 mb-1">First Name: {user.firstName}</p>
                            <p className="text-gray-600 mb-1">Last Name: {user.lastName}</p>
                            <p className="text-gray-600 mb-4">Password: {user.password}</p>
                            <button
                                onClick={() => handleDelete(user._id)}
                                className='text-sm text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg'>
                                Delete Card
                            </button>
                            <Dialog>
                                <>
                                    <p className="text-gray-600 mt-4">First Name: {user.firstName}</p>
                                    <p className="text-gray-600">Last Name: {user.lastName}</p>
                                    <p className="text-gray-600">Password: {user.password}</p>
                                </>
                            </Dialog>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    )
}

export default Posts
