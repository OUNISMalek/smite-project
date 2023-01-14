export interface FactureReq {
  codeFacture: string;
  dateFacture: Date;
  ligneFactures: Array<LigneFactureReq>;
  typeFacture: TypeFacture;
  idClient: number;
}
export interface LigneFactureReq {
  idProduit: number;
  quantite: number;
}
export interface FactureRes {
  id: number;
  codeFacture: string;
  dateFacture: Date;
  ligneFactures: Array<LigneFactureRes>;
  idClient: number;
  dateCreation: Date;
  typeFacture: TypeFacture;
  etatFacture: EtatFacture;
}

export interface LigneFactureRes {
  id: number;
  idProduit: number;
  quantite: number;
  idFacture: number;
}
export enum TypeFacture {
  FACTURE_CLIENT,
  FACTURE_FOURNISSEUR,
  AUTRE_FACTURE,
}
export enum EtatFacture {
  NON_VALIDEE,
  VALIDEE,
  ANNULEE,
}
