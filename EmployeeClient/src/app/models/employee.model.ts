export enum Gender{
    male,
    female
}
export class Employee{
    identity?:string
    firstName?:string
    lastName?:string
    startDate?:Date
    birthDate?:Date
    gender?:Gender
    roles?:EmployeeRole[]
}
export class Role{
    roleName?:string
}
export class EmployeeRole{
    roleId?:number
    startDate?:Date
    isManagement?:boolean

}