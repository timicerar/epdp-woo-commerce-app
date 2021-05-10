import React from "react"
import { StyleSheet, Text, View } from "react-native"
import { useHistory } from "react-router-native"
import Constants from "expo-constants"
import { observer } from "mobx-react"
import { Button } from "../../components/common"

export const Reports = observer(() => {
    const history = useHistory()

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Reports</Text>
            <Button
                title="Coupons"
                onPress={() => history.push("/reports/coupons")}
                backgroundColor="#FFFFFF"
                color="#111111"
                marginBottom={8}
                borderColor="#111111"
            />
            <Button
                title="Customers"
                onPress={() => history.push("/reports/customers")}
                backgroundColor="#FFFFFF"
                color="#111111"
                marginBottom={8}
                borderColor="#111111"
            />
            <Button
                title="Orders"
                onPress={() => history.push("/reports/orders")}
                backgroundColor="#FFFFFF"
                color="#111111"
                marginBottom={8}
                borderColor="#111111"
            />
            <Button
                title="Products"
                onPress={() => history.push("/reports/products")}
                backgroundColor="#FFFFFF"
                color="#111111"
                marginBottom={8}
                borderColor="#111111"
            />
            <Button
                title="Sales"
                onPress={() => history.push("/reports/sales")}
                backgroundColor="#FFFFFF"
                color="#111111"
                marginBottom={8}
                borderColor="#111111"
            />
            <Button
                title="Top Sellers"
                onPress={() => history.push("/reports/top-sellers")}
                backgroundColor="#FFFFFF"
                color="#111111"
                marginBottom={8}
                borderColor="#111111"
            />
            <Button title="Go back" onPress={() => history.push("/menu")} backgroundColor="#111111" />
        </View>
    )
})

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 32,
        marginTop: Constants.statusBarHeight,
    },
    heading: {
        fontSize: 24,
        color: "#111111",
        marginBottom: 16,
    },
})
