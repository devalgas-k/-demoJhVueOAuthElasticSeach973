import { IJob } from '@/shared/model/job.model';
import { IDepartment } from '@/shared/model/department.model';

import { Contract } from '@/shared/model/enumerations/contract.model';
export interface IEmployee {
  id?: number;
  firstName?: string | null;
  lastName?: string | null;
  email?: string;
  phoneNumber?: string | null;
  hireDate?: Date | null;
  salary?: number | null;
  commissionPct?: number | null;
  level?: number | null;
  contract?: Contract | null;
  cvContentType?: string | null;
  cv?: string | null;
  jobs?: IJob[] | null;
  manager?: IEmployee | null;
  department?: IDepartment | null;
}

export class Employee implements IEmployee {
  constructor(
    public id?: number,
    public firstName?: string | null,
    public lastName?: string | null,
    public email?: string,
    public phoneNumber?: string | null,
    public hireDate?: Date | null,
    public salary?: number | null,
    public commissionPct?: number | null,
    public level?: number | null,
    public contract?: Contract | null,
    public cvContentType?: string | null,
    public cv?: string | null,
    public jobs?: IJob[] | null,
    public manager?: IEmployee | null,
    public department?: IDepartment | null
  ) {}
}
