export const loginAPI = () => {
    return `${process.env.REACT_APP_CONNECT_BACKEND}/login`
}

export const registerAPI = () => {
    return `${process.env.REACT_APP_CONNECT_BACKEND}/register`
}

export const getAllConversationsAPI = () => {
    return `${process.env.REACT_APP_CONNECT_BACKEND}/conversations`
}

export const createConversationAPI = () => {
    return `${process.env.REACT_APP_CONNECT_BACKEND}/conversations/create`
}

export const deleteConversationAPI = (conversationId) => {
    return `${process.env.REACT_APP_CONNECT_BACKEND}/conversations/${conversationId}`
}

export const getAllMessagesAPI = (conversationId) => {
    return `${process.env.REACT_APP_CONNECT_BACKEND}/conversations/${conversationId}`
}

export const sendUserMessageAPI = (conversationId) => {
    return `${process.env.REACT_APP_CONNECT_BACKEND}/conversations/${conversationId}/messages`
}

export const getBotMessagesAPI = (conversationId) => {
    return `${process.env.REACT_APP_CONNECT_BACKEND}/conversations/${conversationId}/botmessages`
}