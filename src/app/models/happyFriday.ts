import { User } from 'src/app/models/user'
import { Company } from 'src/app/models/company'

export class HappyFriday {
  CollaboratorId?: number;
  Collaborator?: User;
  CompanyId?: number;
  Company?: Company;
  HappyFridayDate?: string;
}
