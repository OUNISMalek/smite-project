import { FactureRes } from './facture.model';

export interface ClientReq {
  nom: string;
  photo: string;
  mail: string;
  tel: string;
  addresse: string;
  codePostale: string;
  gouvernorat: string;
  pays: string;
}
export interface ClientRes {
  id: number;
  nom: string;
  photo: string;
  mail: string;
  tel: string;
  addresse: string;
  codePostale: string;
  gouvernorat: string;
  pays: string;
  dateCreation: Date;
  factures: Array<FactureRes>;
}
