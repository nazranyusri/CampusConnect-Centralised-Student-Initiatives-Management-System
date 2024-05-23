export class GlobalConstants {

    //Message
    public static genericError: string = "Something went wrong. Please try again later.";

    //Regex
    public static usernameRegex: string = "^[a-z0-9._]{5,20}$";
    public static emailRegex: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
    public static passwordRegex: string = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\w\W]{5,20}$";
    public static phoneRegex: string = "^[0-9]{10}$";
}