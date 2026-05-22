export interface IUser {
    name: string | null; // because NOT NULL was not specified
    email: string;
    password: string;
    is_active: boolean;
    age: number | null; // because NOT NULL was not specified,
    role ? : 'admin' | 'user' | 'agent'
}