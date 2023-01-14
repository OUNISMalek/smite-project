export enum DataStateEnum {
  LOADING,
  LOADED,
  ERROR,
}
export enum AppContext {
  PRODUIT,
  CLIENT,
  FACTURE,
  FOURNISSEUR,
  CHARGE,
  MVT_STOCK,
}

export interface AppDataState<T> {
  dataState: DataStateEnum;
  data?: T;
  errorMessage?: string;
}
export interface AppEvent {
  appContext: AppContext;
  payload?: any;
}
