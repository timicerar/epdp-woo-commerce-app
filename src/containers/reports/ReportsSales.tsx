import React, { useEffect, useState } from "react"
import { FlatList, StyleSheet, Text, View } from "react-native"
import { useHistory } from "react-router-native"
import Constants from "expo-constants"
import { observer } from "mobx-react"
import { Button } from "../../components/common"
import { ReportStore } from "../../stores/reports/ReportStore"

export const ReportsSales = observer(() => {
    const history = useHistory()
    const [reportsStore] = useState(() => new ReportStore())

    useEffect(() => {
        reportsStore.loadSales()
    }, [])

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Report Sales</Text>
            {reportsStore.isLoading && <Text>Loading data...</Text>}
            {!reportsStore.sales?.length && !reportsStore.isLoading && <Text>Empty list</Text>}
            <FlatList
                data={reportsStore.sales}
                renderItem={({ item, index }) => (
                    <View key={index} style={styles.item}>
                        <Text>Total sales: {item.total_sales}</Text>
                        <Text>Net sales: {item.net_sales}</Text>
                        <Text>Average sales: {item.average_sales}</Text>
                        <Text>Total orders: {item.total_orders}</Text>
                        <Text>Total items: {item.total_items}</Text>
                        <Text>Total tax: {item.total_tax}</Text>
                        <Text>Total shipping: {item.total_shipping}</Text>
                        <Text>Total refunds: {item.total_refunds}</Text>
                        <Text>Total discount: {item.total_discount}</Text>
                        <Text>Total grouped by: {item.totals_grouped_by}</Text>
                    </View>
                )}
                keyExtractor={(item, index) => index.toString()}
            />
            <View>
                <Button title="Go back" onPress={() => history.push("/reports")} backgroundColor="#111111" />
            </View>
        </View>
    )
})

const styles = StyleSheet.create({
    container: {
        marginTop: Constants.statusBarHeight,
        padding: 16,
        flex: 1,
    },
    item: {
        borderBottomWidth: 1,
        borderColor: "#000000",
        padding: 8,
    },
    heading: {
        fontSize: 24,
        color: "#111111",
        marginBottom: 16,
    },
})
