import { IExperience } from '@/shared/model/experience.model';

export interface IExpertise {
  id?: number;
  title?: string;
  description?: string | null;
  level?: number | null;
  experiences?: IExperience[] | null;
}

export class Expertise implements IExpertise {
  constructor(
    public id?: number,
    public title?: string,
    public description?: string | null,
    public level?: number | null,
    public experiences?: IExperience[] | null
  ) {}
}
