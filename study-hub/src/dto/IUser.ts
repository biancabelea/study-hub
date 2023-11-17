export interface IUser {
    userId?: string;
    userName: string;
    userEmail: string;
    userPass: string;
    userYear: string;
    userRole: string;
    userSkills?: Array<string>;
}
