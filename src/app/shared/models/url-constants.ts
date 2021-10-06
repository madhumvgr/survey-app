
export class UrlConstants {
    public userURL = "/api/account";
    changeUserPassword = this.userURL + "/changePassword";
    finishPasswordReset = this.userURL + "/reset-password/finish";
    requestPasswordReset = this.userURL + "/reset-password/init";
    public static registerUser = "/api/register";
    otpProfile = "/api/portal-user-otps"
    login = "/api/authenticate"
}