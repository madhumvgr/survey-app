
export class UrlConstants {
    // public userURL = "/api/account";
    // changeUserPassword = this.userURL + "/changePassword";
    // finishPasswordReset = this.userURL + "/reset-password/finish";
    // requestPasswordReset = this.userURL + "/reset-password/init";
    public static login ="api/authenticate";
    public static changePassword ="api/change-password";
    public static initiateForgotPassword = "api/account/reset-password/init"
    public static finishForgotPassword = "api/account/reset-password/finish"
    public static registerUser = "api/register";
    public static registerKeyForOtp = "api/portal-user-otps"
    // login = "/api/authenticate"
}