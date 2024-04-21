// DAO is this.
export interface DataAccess<T> {
    add(t: T, pw: string): Promise<void>,
    delete(id: string, pw: string): Promise<void>,
    update(id: string, updateData: Partial<T>, pw: string): Promise<void>,
    updateCard(id: string, updateData: Partial<T>, pw: string): Promise<void>,
    get(id: string): Promise<T | void>,
    getAll(page: number, filter: string, category: string, user_id: string): Promise<Array<T>>
    getLength(filter: string, category: string): Promise<number>
}