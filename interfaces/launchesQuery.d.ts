export interface LaunchesQueryInterface {
    docs: Doc[]
    totalDocs: number
    offset: number
    limit: number
    totalPages: number
    page: number
    pagingCounter: number
    hasPrevPage: boolean
    hasNextPage: boolean
    prevPage: null
    nextPage: null
}

export interface Doc {
    name: string
    id: string
}
