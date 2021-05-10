import AsyncStorage from "@react-native-async-storage/async-storage"
import { action, makeObservable, observable, runInAction } from "mobx"
import AuthStore from "./AuthStore"

export class LogoutStore {
    @observable public isLoading = false
    @observable public error: Error | null = null

    constructor() {
        makeObservable(this)
    }

    @action
    public async logout(): Promise<void> {
        this.error = null
        this.isLoading = true

        let error: Error | null = null

        try {
            await AsyncStorage.removeItem("user")
            AuthStore.setUser(null)
        } catch (e) {
            error = e
        }

        runInAction(() => {
            this.isLoading = false
            this.error = error
        })
    }
}
