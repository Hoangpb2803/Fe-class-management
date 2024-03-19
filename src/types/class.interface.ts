export interface IClass {
    _id: string,
    name: string,
    major: {
        _id: string,
        name: string
    },
    teacher: {
        _id: string,
        name: string
    },
    students: [{
        _id: string,
        name: string
    }]
}