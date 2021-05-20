import { action, makeObservable, observable, runInAction } from "mobx"
import { IOstaniZdrav } from "../../interfaces/OstaniZdrav"
import Api from "../../services/Api"

export class OstaniZdravStore {
    @observable public statistics: IOstaniZdrav[] | null = null
    @observable public isLoading = false
    @observable public error: Error | null = null

    private loadIndex = 0

    constructor() {
        makeObservable(this)
    }

    @action
    public async loadStatistics(): Promise<void> {
        this.isLoading = true
        this.error = null
        this.statistics = null

        const loadIndex = ++this.loadIndex
        let error: Error | null = null
        let statistics: IOstaniZdrav[] | null = null

        try {
            statistics = await Api.get<IOstaniZdrav[]>(
                "https://podatki.gov.si/dataset/d3e718b3-01f0-40bd-93b0-b56d3bb4e97f/resource/3710deae-85c9-41e5-ab27-cb06f6f74533/download/agregacija.json",
                { customUrl: true },
            )
        } catch (e) {
            error = e
        }

        if (loadIndex !== this.loadIndex) {
            return
        }

        runInAction(() => {
            this.isLoading = false
            this.error = error
            this.statistics = statistics
        })
    }
}
