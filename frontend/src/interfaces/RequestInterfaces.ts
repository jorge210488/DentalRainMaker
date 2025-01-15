export interface IUserLogin {
    _id: string;
    name: string;
    given_name: string;
    family_name: string;
    email: string;
    provider: string;
    providerId: string;
    type: string;
    token: string;
}

export interface IUserGooglePut {
    _id: string;
    name: string;
    given_name: string;
    family_name: string;
    email: string;
    provider: string;
    providerId: string;
    type: string;
    token: string;
}