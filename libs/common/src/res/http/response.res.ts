export interface ResponseHTTP<T> {
    data: T
    message: string
    traceId: string
    success: boolean
    version: number
    timestamp: string
}