import React, { useEffect, useState } from "react"
import { FlatList, StyleSheet, Text, View } from "react-native"
import { useHistory } from "react-router-native"
import Constants from "expo-constants"
import { observer } from "mobx-react"
import { Button } from "../../components/common"
import { ReportStore } from "../../stores/reports/ReportStore"

export const ReportsReviews = observer(() => {
    const history = useHistory()
    const [reportsStore] = useState(() => new ReportStore())

    useEffect(() => {
        reportsStore.loadReviews()
    }, [])

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Report Reviews Totals</Text>
            {reportsStore.isLoading && <Text>Loading data...</Text>}
            {!reportsStore.reviews?.length && !reportsStore.isLoading && <Text>Empty list</Text>}
            <FlatList
                data={reportsStore.reviews}
                renderItem={({ item, index }) => (
                    <View key={index} style={styles.item}>
                        <Text>Name: {item.name}</Text>
                        <Text>Slug: {item.slug}</Text>
                        <Text>Total: {item.total}</Text>
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
