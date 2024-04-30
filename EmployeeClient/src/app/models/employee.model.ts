export enum Gender{
    male=1,
    female=2
}
export class Employee{
    id!:number
    identity!:string
    firstName!:string
    lastName!:string
    startDate!:Date
    birthDate!:Date
    gender!:Gender
    employeeActivityStatus!:boolean
    roles!:EmployeeRole[]
}
export class Role{
    id!:number
    roleName!:string
}
export class EmployeeRole{
    id!:number
    employeeId!:number
    employee!:Employee
    roleId!:number
    role?:Role
    startDate!:Date
    isManagement!:boolean
}