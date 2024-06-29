export class PaginationResult<T> {
    constructor(
        public readonly items: T[],
        public readonly page: number,
        public readonly totalPages: number
    ) {}
}
