export enum RoleName {
    ROLE_USER = 'ROLE_USER',
    ADMIN = 'ADMIN',
    Entreprise = 'Entreprise',
    Employee = 'Employee',
    Manager = 'Manager',
    HR = 'HR',
    CRM = 'CRM',
    Consult = 'Consult',
    PM = 'PM'
}

export class Role {
    id?: number;
    name!: RoleName;


}