import { ISubject } from '@/shared/model/subject.model';

export interface IMessage {
  id?: number;
  name?: string;
  email?: string;
  phone?: string | null;
  message?: string | null;
  fileContentType?: string | null;
  file?: string | null;
  city?: string | null;
  otherCountry?: string | null;
  date?: Date | null;
  subject?: ISubject;
}

export class Message implements IMessage {
  constructor(
    public id?: number,
    public name?: string,
    public email?: string,
    public phone?: string | null,
    public message?: string | null,
    public fileContentType?: string | null,
    public file?: string | null,
    public city?: string | null,
    public otherCountry?: string | null,
    public date?: Date | null,
    public subject?: ISubject
  ) {}
}
