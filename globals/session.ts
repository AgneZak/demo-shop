interface ISession {
    active: boolean;
    authToken: string;
    signInWithToken(token: string): void;
}

const Session: ISession = {
    active: false,
    authToken: '',
    signInWithToken(token) {
        this.active = true;
        this.authToken = token;
    }
};

export default Session;
