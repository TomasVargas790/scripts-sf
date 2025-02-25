export interface SFRecord {
    Id?: string
    attributes: {
        type: string
        url: string
        [prop: string]: any
    }
    [field: string]: unknown
}