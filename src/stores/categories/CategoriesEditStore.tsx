import { action, makeObservable, observable, runInAction } from "mobx"
import { ICategory, ICategoryAdd } from "../../interfaces/Categories"
import Api from "../../services/Api"

export class CategoriesEditStore {
    @observable public category: ICategoryAdd | null = null
    @observable public isLoading = false
    @observable public isEditing = false
    @observable public error: Error | null = null

    private loadIndex = 0

    constructor() {
        makeObservable(this)
    }

    @action
    public setValue(key: keyof ICategoryAdd, value: string): void {
        if (!this.category) {
            return
        }

        this.category[key] = value
    }

    @action
    public async loadById(id: string): Promise<void> {
        this.isLoading = true
        this.error = null
        this.category = null

        const loadIndex = ++this.loadIndex
        let error: Error | null = null
        let category: ICategoryAdd | null = null

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
    public async edit(id: string, editDone: () => void): Promise<void> {
        if (!this.category) {
            return
        }

        this.isEditing = true
        this.error = null

        const loadIndex = ++this.loadIndex
        let error: Error | null = null

        try {
            if (this.category.name === "" || this.category.slug === "") {
                throw new Error("Fill in the fields!")
            }

            await Api.put<ICategory>(`/wp-json/wc/v3/products/categories/${id}`, this.category)
            editDone()
        } catch (e) {
            error = e
        }

        if (loadIndex !== this.loadIndex) {
            return
        }

        runInAction(() => {
            this.isEditing = false
            this.error = error
        })
    }
}
