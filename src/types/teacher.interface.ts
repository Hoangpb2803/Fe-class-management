export interface ITeacher {
    _id: string,
    name: string,
    dateOfBirth: Date,
    major: {
        _id: string,
        name: string
    },
    exp: number,
    email: string
}