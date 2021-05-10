import { action, makeObservable, observable, runInAction } from "mobx"
import { ICategory } from "../../interfaces/Categories"
import Api from "../../services/Api"

export class CategoriesStore {
    @observable public categories: ICategory[] | null = null
    @observable public category: ICategory | null = null
    @observable public isLoading = false
    @observable public isDeleting = false
    @observable public error: Error | null = null

    private loadIndex = 0

    constructor() {
        makeObservable(this)
    }

    @action
    public async loadProductCategories(): Promise<void> {
        this.isLoading = true
        this.error = null
        this.categories = null

        const loadIndex = ++this.loadIndex
        let error: Error | null = null
        let categories: ICategory[] | null = null

        try {
            categories = await Api.get<ICategory[]>("/wp-json/wc/v3/products/categories")
        } catch (e) {
            error = e
        }

        if (loadIndex !== this.loadIndex) {
            return
        }

        runInAction(() => {
            this.isLoading = false
            this.error = error
            this.categories = categories
        })
    }

    @action
    public async loadById(id: string): Promise<void> {
        this.isLoading = true
        this.error = null
        this.category = null

        const loadIndex = ++this.loadIndex
        let error: Error | null = null
        let category: ICategory | null = null

        try {
            category = await Api.get<ICategory>(`/wp-json/wc/v3/products/categories/${id}`)
        } catch (e) {
            error = e
        }

        if (loadIndex !== this.loadIndex) {
            return
        }

        runInAction(() => {
            this.isLoading = false
            this.error = error
            this.category = category
        })
    }

    @action
    public async deleteById(id: string, onDelete: () => void): Promise<void> {
        this.isDeleting = true
        this.error = null

        const loadIndex = ++this.loadIndex
        let error: Error | null = null

        try {
            await Api.delete(`/wp-json/wc/v3/products/categories/${id}?force=true`)
            onDelete()
        } catch (e) {
            error = e
        }

        if (loadIndex !== this.loadIndex) {
            return
        }

        runInAction(() => {
            this.isDeleting = false
            this.error = error
        })
    }
}
