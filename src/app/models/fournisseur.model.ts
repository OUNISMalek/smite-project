export interface FournisseurReq {
  nom: string;
  description: string;
  matFiscale: string;
}
export interface FournisseurRes {
  id: number;
  nom: string;
  description: string;
  matFiscale: string;
  dateCreation: Date;
}
