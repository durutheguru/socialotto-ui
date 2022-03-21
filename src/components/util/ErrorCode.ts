

export default class ErrorCode {


    public static map: Map<string, string> = new Map([
        ["0", "User activation failed. Token might have expired."],
        ["0000", "Email already exists"],
        ["0001", "Username already exists"],
        ["0002", "Invalid Login Credentials"],
        ["0003", "Unrecognized email"],
        ["9999", "Unknown Error"],
    ]);


}
