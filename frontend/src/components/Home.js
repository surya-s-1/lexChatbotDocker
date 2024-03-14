import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { verifyJwt } from "../utilities/verifytoken";
import { getAllConversationsAPI, createConversationAPI, deleteConversationAPI } from "../utilities/api";

export default function Home() {
    const [conversations, setConversations] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const fetchConversations = async () => {
            try {
                const tokenIsValid = verifyJwt()

                if (tokenIsValid.isValid) {
                    const response = await fetch(`${getAllConversationsAPI()}`, {
                        method: 'POST',
                        body: JSON.stringify({token: tokenIsValid.token}),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    
                    if (!response.ok) {
                        throw new Error(`Error fetching conversations: ${response.status}`);
                    }
    
                    const data = await response?.json()
                    
                    setConversations(data?.conversation)
                } else {
                    navigate('/login')
                }
            } catch (error) {
                console.error('Error fetching conversations: ', error)
            }
        };

        fetchConversations();
    }, [conversations, navigate])

    const createConversation = async () => {
        try {
            const tokenIsValid = verifyJwt()

            if (tokenIsValid.isValid) {
                const response = await fetch(`${createConversationAPI()}`, {
                    method: 'POST',
                    body: JSON.stringify({token: tokenIsValid.token}),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
    
                if (!response.ok) {
                    throw new Error(`Error creating conversation: ${response.status}`);
                }
    
                const data = await response?.json()
                
                setConversations([...conversations, data?.conversation])
                navigate(`/conversations/${data?.conversation?._id}`)
            } else {
                navigate('/login')
            }
        } catch (error) {
            console.error('Error creating conversation: ', error)
        }
    }

    const deleteConversation = async (conversationId) => {
        try {
            const tokenIsValid = verifyJwt()

            if (tokenIsValid.isValid) {
                await fetch(`${deleteConversationAPI(conversationId)}`, {
                    method: 'DELETE',
                    body: JSON.stringify({token: tokenIsValid.token}),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            } else {
                navigate('/login')
            }
        } catch (err) {
            console.log('Error deleting converstaion:', err)
        }
    }

    const logout = () => {
        try {
            localStorage.removeItem('token')

            navigate('/login')
        } catch (error) {
            console.log('Error logging out: ', error)
        }
    }

    return (
        <div className="container" style={{ width: '40%' }}>
            <nav className="navbar sticky-top navbar-light bg-light px-2 py-1" style={{zIndex: 1, height: '7%', boxShadow: "0 0 2px grey"}}>
                <h1 className="navbar-brand m-0">
                    Conversations
                </h1>
                <button className="btn btn-primary m-0" onClick={createConversation}>
                    Start Conversation
                </button>
                <button className="btn btn-danger m-0" onClick={logout}>
                    Logout
                </button>
            </nav>
            <ul className="list-group my-2">
                {conversations?.map((conversation) => (
                    <li className="list-group-item list-group-item-action" key={conversation._id}>
                        <Link className="list-group-item-action" to={`/conversations/${conversation._id}`} style={{textDecoration: 'none'}}>Conversation {conversation._id}</Link>
                        <button className="btn btn-danger px-1 py-0 m-0 float-end" onClick={()=>{deleteConversation(conversation._id)}}>
                            <MdDelete />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}