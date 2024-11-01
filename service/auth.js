const sessionIdtoUserMap = new Map();

function setUser(sessionId, user) {
    sessionIdtoUserMap.set(sessionId, user);
}

function getUser(sessionId) {
    return sessionIdtoUserMap.get(sessionId);
}

module.exports = {
    setUser,
    getUser
}