import { IExpertise } from '@/shared/model/expertise.model';

import { Contract } from '@/shared/model/enumerations/contract.model';
export interface IExperience {
  id?: number;
  title?: string;
  company?: string;
  description?: string | null;
  logoCompanyContentType?: string | null;
  logoCompany?: string | null;
  inProgress?: boolean;
  contract?: Contract;
  startDate?: Date | null;
  endDate?: Date | null;
  expertise?: IExpertise[] | null;
}

export class Experience implements IExperience {
  constructor(
    public id?: number,
    public title?: string,
    public company?: string,
    public description?: string | null,
    public logoCompanyContentType?: string | null,
    public logoCompany?: string | null,
    public inProgress?: boolean,
    public contract?: Contract,
    public startDate?: Date | null,
    public endDate?: Date | null,
    public expertise?: IExpertise[] | null
  ) {
    this.inProgress = this.inProgress ?? false;
  }
}
