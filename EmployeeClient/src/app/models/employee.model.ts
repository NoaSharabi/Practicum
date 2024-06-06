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
    gender!:number
    employeeActivityStatus!:boolean
    roles:EmployeeRole[]=[]
}
export class Role{
    id!:number
    roleName!:string
    isManagement!:boolean

}
export class EmployeeRole{
    roleId!:number  
}