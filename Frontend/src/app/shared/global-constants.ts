export class GlobalConstants {

    //Message
    public static genericError: string = "Something went wrong. Please try again later.";

    //Regex
    public static emailRegex: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
    public static passwordRegex: string = "^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$";
    public static phoneRegex: string = "^[0-9]{10}$";
}