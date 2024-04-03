export interface AppResponse {
    status: number
    data: any
    [key: string]: any
}

export interface AppError {
    status: number
    message: string
    [key: string]: any
}