import React, { useEffect } from "react"
import { StyleSheet, View } from "react-native"
import { NativeRouter, Redirect, Switch } from "react-router-native"
import { StatusBar } from "expo-status-bar"
import { observer } from "mobx-react"
import PrivateRoute from "./src/components/routes/PrivateRoute"
import ProtectedRoute from "./src/components/routes/ProtectedRoute"
import { Login } from "./src/containers/auth"
import { Categories, CategoriesAdd, CategoriesDetails, CategoriesEdit, CategoriesList } from "./src/containers/categories"
import { Menu } from "./src/containers/menu"
import { OstaniZdrav } from "./src/containers/ostani-zdrav"
import {
    Reports,
    ReportsCoupons,
    ReportsCustomers,
    ReportsOrders,
    ReportsProducts,
    ReportsReviews,
    ReportsSales,
    ReportsTopSellers,
} from "./src/containers/reports"
import AuthStore from "./src/stores/auth/AuthStore"

const App = observer(() => {
    useEffect(() => {
        AuthStore.init()
    }, [])

    if (!AuthStore.initDone) {
        return null
    }

    return (
        <NativeRouter>
            <View style={styles.container}>
                <Switch>
                    <ProtectedRoute path={`/login`} component={Login} />
                    <PrivateRoute path={`/menu`} component={Menu} />

                    <PrivateRoute path={`/categories/details/:id`} component={CategoriesDetails} />
                    <PrivateRoute path={`/categories/edit/:id`} component={CategoriesEdit} />
                    <PrivateRoute path={`/categories/list`} component={CategoriesList} />
                    <PrivateRoute path={`/categories/add`} component={CategoriesAdd} />
                    <PrivateRoute path={`/categories`} component={Categories} />

                    <PrivateRoute path={`/reports/coupons`} component={ReportsCoupons} />
                    <PrivateRoute path={`/reports/customers`} component={ReportsCustomers} />
                    <PrivateRoute path={`/reports/orders`} component={ReportsOrders} />
                    <PrivateRoute path={`/reports/products`} component={ReportsProducts} />
                    <PrivateRoute path={`/reports/reviews`} component={ReportsReviews} />
                    <PrivateRoute path={`/reports/sales`} component={ReportsSales} />
                    <PrivateRoute path={`/reports/top-sellers`} component={ReportsTopSellers} />
                    <PrivateRoute path={`/reports`} component={Reports} />

                    <PrivateRoute path={`/ostani-zdrav`} component={OstaniZdrav} />

                    <Redirect to={`/login`} />
                    <StatusBar style="auto" />
                </Switch>
            </View>
        </NativeRouter>
    )
})

const styles = StyleSheet.create({
    container: {
        height: "100%",
        width: "100%",
    },
})

export default App
