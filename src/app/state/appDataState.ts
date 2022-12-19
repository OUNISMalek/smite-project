export enum DataStateEnum {
    LOADED,
    LOADING,
    ERROR
}

//generic interface
export interface DataState<T> {
    status?: DataStateEnum,
    data?: T,
    errorMessage?: string

}
