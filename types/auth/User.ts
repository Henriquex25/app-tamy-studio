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

export type UserChangePasswordType = {
    currentPassword: string;
    newPassword: string;
    confirmNewPassword: string;
};

export type ValidationErrorsChangePassword = {
    currentPassword?: string[];
    newPassword?: string[];
    newPassword_confirmation?: string[];
};

export type UserChangeData = {
    name: string;
    cell_phone: string;
}

export type ValidationErrorsChangeData = {
    name?: string[];
    cell_phone?: string[];
}