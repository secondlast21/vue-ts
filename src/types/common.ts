export type BaseResponse<D> = {
    count: number
    next: string
    previous: string
    results: D
}
