export interface User {
    _id?: String;
    name?: String;
    email?: String;
    password: String;
    username?: String;
    rememberMe?: boolean;
}

export interface ForgotPassword {
    email: string;
}