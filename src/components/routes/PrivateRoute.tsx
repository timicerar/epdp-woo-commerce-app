import React from "react"
import { Redirect, Route } from "react-router-native"
import { observer } from "mobx-react"
import AuthStore from "../../stores/auth/AuthStore"

@observer
class PrivateRoute extends Route {
    public render(): React.ReactNode {
        let expectedPath

        if (!AuthStore.user) {
            expectedPath = "/login"
        }

        if (expectedPath) {
            return <Redirect to={`${expectedPath}`} />
        }

        return super.render()
    }
}

export default PrivateRoute
