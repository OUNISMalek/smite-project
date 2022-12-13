export class Facture {
    ligneFactures: Array<LigneFacture> = Array.of(new LigneFacture());
    factureMetadata: FactureMetadata = new FactureMetadata();
    id: number = 0;
}
export class LigneFacture {
    code: string = '';
    service: string = '';
    quantite: string = '';
    prix_uni_ht: string = '';
    prix_ht: string = '';
    tva: string = '';
    total: string = '';
}
export class FactureMetadata {
    total_lettre: string = '';
    total_ttc: number = 0;
    taxes: number = 0;
    total_ht: number = 0;
    benef_facture: string = '';
    num_facture: string = '';
    titre_facture: string = '';
}

// export interface Facture {
//     ligneFactures: Array<LigneFacture>,
//     factureMetadata: FactureMetadata,
//     id: number
// }
// export interface LigneFacture {
//     code: string,
//     service: string,
//     quantite: string,
//     prix_uni_ht: string,
//     prix_ht: string,
//     tva: string,
//     total: string
// }
// export interface FactureMetadata {
//     total_lettre: string,
//     total_ttc: number,
//     taxes: number,
//     total_ht: number,
//     benef_facture: string,
//     num_facture: string,
//     titre_facture: string
// }

