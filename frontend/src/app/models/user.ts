export interface User {
    firstName: string;
    lastName: string;
    email: string;
    password?: string;
    isAdmin?: boolean;
    loggedIn?: boolean;
    token?: string;
    id: number;
}
