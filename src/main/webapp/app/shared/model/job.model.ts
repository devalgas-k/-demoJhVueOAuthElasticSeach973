import { ITask } from '@/shared/model/task.model';
import { IEmployee } from '@/shared/model/employee.model';

export interface IJob {
  id?: number;
  jobTitle?: string;
  minSalary?: number | null;
  maxSalary?: number | null;
  subSalary?: number | null;
  totalSalary?: number | null;
  date?: Date | null;
  codeCode?: string | null;
  profilContentType?: string;
  profil?: string;
  tasks?: ITask[] | null;
  employee?: IEmployee | null;
}

export class Job implements IJob {
  constructor(
    public id?: number,
    public jobTitle?: string,
    public minSalary?: number | null,
    public maxSalary?: number | null,
    public subSalary?: number | null,
    public totalSalary?: number | null,
    public date?: Date | null,
    public codeCode?: string | null,
    public profilContentType?: string,
    public profil?: string,
    public tasks?: ITask[] | null,
    public employee?: IEmployee | null
  ) {}
}
