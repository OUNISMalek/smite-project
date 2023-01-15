export enum DataStateEnum {
  LOADING,
  LOADED,
  ERROR,
}
export enum AppContext {
  NO_ACTION,
  NEWFACTURE,
  PRODUIT,
  CLIENT,
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
