export interface Produit {
  id: number;
  ref: string;
  nom: string;
  quantite?: number;
  prix?: number;
  tauxTva?: number;
  image?: string;
  idFournisseur: number;
}
