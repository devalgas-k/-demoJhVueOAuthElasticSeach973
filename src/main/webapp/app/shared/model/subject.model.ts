export interface ISubject {
  id?: number;
  name?: string;
}

export class Subject implements ISubject {
  constructor(public id?: number, public name?: string) {}
}
