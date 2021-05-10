import { action, makeObservable, observable, runInAction } from "mobx"
import { ICategory, ICategoryAdd } from "../../interfaces/Categories"
import Api from "../../services/Api"

export class CategoriesAddStore {
    @observable public category: ICategoryAdd = {
        name: "",
        slug: "",
        description: "",
    }
    @observable public isLoading = false
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
    public async add(saveDone: () => void): Promise<void> {
        if (!this.category) {
            return
        }

        this.isLoading = true
        this.error = null

        const loadIndex = ++this.loadIndex
        let error: Error | null = null

        try {
            if (this.category.name === "" || this.category.slug === "") {
                throw new Error("Fill in the fields!")
            }

            await Api.post<ICategory>(`/wp-json/wc/v3/products/categories`, this.category)
            saveDone()
        } catch (e) {
            error = e
        }

        if (loadIndex !== this.loadIndex) {
            return
        }

        runInAction(() => {
            this.isLoading = false
            this.error = error
        })
    }
}
