export interface User {
    _id?: String;
    name?: String;
    email?: String;
    password?: String;
    username?: String;
    rememberMe?: boolean;
    currentPassword?: String;
    newPassword?: String;
    confirmPassword?:String;
    key?: String;
}

export interface ForgotPassword {
    email: string;
}