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
    resetKey?: String;
}

export interface ForgotPassword {
    email: string;
}