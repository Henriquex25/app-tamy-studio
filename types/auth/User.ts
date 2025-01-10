export type UserType = {
    id: number,
    google_id?: string;
    name: string;
    avatar?: string;
    email: string;
    cell_phone: string;
};

export type UserRegistrationType = {
    name: string;
    email: string;
    email_confirmation: string;
    cell_phone: string;
    password: string;
    password_confirmation: string;
};