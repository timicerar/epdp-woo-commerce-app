import AsyncStorage from "@react-native-async-storage/async-storage"
import { action, makeObservable, observable, runInAction } from "mobx"
import { IUser } from "../../interfaces/Auth"
import AuthStore from "./AuthStore"

export class LoginStore {
    @observable public user: IUser = {
        username: "",
        password: "",
    }
    @observable public isLoading = false
    @observable public error: Error | null = null

    constructor() {
        makeObservable(this)
    }

    @action
    public setValue(key: keyof IUser, value: string): void {
        if (!this.user) {
            return
        }

        this.user[key] = value
    }

    @action
    public async login(): Promise<void> {
        if (!this.user) {
            this.error = new Error("Fill in the fields!")
            return
        }

        this.error = null
        this.isLoading = true

        let error: Error | null = null

        try {
            if (this.user.username === "admin" && this.user.password === "1002295327") {
                await AsyncStorage.setItem("user", JSON.stringify(this.user))
                AuthStore.setUser(this.user)
            } else {
                throw new Error("Invalid username or password.")
            }
        } catch (e) {
            error = e
        }

        runInAction(() => {
            this.isLoading = false
            this.error = error
        })
    }
}
