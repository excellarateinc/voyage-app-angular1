class AuthorizationService {
    constructor() {
        this.accessToken = null;
    }

    setToken(token) {
        this.accessToken = token;
    }

    getToken() {
        return this.accessToken;
    }
}

export default AuthorizationService;