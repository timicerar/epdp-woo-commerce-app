import AsyncStorage from "@react-native-async-storage/async-storage"
import { action, makeObservable, observable, runInAction } from "mobx"
import { IUser } from "../../interfaces/Auth"

class AuthStore {
    @observable public user: IUser | null = null
    @observable public initDone = false

    constructor() {
        makeObservable(this)
    }

    private isInit = false

    @action
    public async init(): Promise<void> {
        if (this.initDone || this.isInit) {
            return
        }

        this.isInit = true

        try {
            const storageValue = await AsyncStorage.getItem("user")

            if (storageValue) {
                const user: IUser = (JSON.parse(storageValue) as unknown) as IUser

                if (user.username === "admin" && user.password === "1002295327") {
                    this.setUser(user)
                } else {
                    await AsyncStorage.removeItem("user")
                    this.setUser(null)
                }
            }
        } catch (e) {
            console.error(e)
        } finally {
            runInAction(() => {
                this.initDone = true
                this.isInit = false
            })
        }
    }

    @action
    public setUser(user: IUser | null): void {
        runInAction(() => {
            this.user = user
        })
    }
}

export default new AuthStore()
