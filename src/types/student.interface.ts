export interface IStudent {
    _id: string,
    name: string,
    dateOfBirth: string,
    major: {
        _id: string,
        name: string
    },
    level: string,
    email: string
}