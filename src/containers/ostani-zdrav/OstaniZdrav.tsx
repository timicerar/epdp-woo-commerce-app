import React, { useEffect, useState } from "react"
import { FlatList, StyleSheet, Text, View } from "react-native"
import { useHistory } from "react-router-native"
import Constants from "expo-constants"
import { observer } from "mobx-react"
import { Button } from "../../components/common"
import { OstaniZdravStore } from "../../stores/ostani-zdrav/OstaniZdravStore"

export const OstaniZdrav = observer(() => {
    const history = useHistory()
    const [ostaniZdravStore] = useState(() => new OstaniZdravStore())

    useEffect(() => {
        ostaniZdravStore.loadStatistics()
    }, [])

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>#OstaniZdrav statistika</Text>
            {ostaniZdravStore.isLoading && <Text>Loading data...</Text>}
            {!ostaniZdravStore.statistics?.length && !ostaniZdravStore.isLoading && <Text>No data</Text>}
            <FlatList
                data={ostaniZdravStore.statistics}
                renderItem={({ item, index }) => (
                    <View key={index} style={styles.item}>
                        <Text>Date: {item.effective_date}</Text>
                        <Text>App downloads daily: {item.app_downloads_daily}</Text>
                        <Text>App downloads in last 7 days: {item.app_downloads_7days_sum}</Text>
                        <Text>Persons who shared keys daily: {item.persons_who_shared_keys_daily}</Text>
                        <Text>Tests total daily: {item.tests_total_daily}</Text>
                        <Text>Infections effective daily: {item.infections_effective_daily}</Text>
                    </View>
                )}
                keyExtractor={(item, index) => index.toString()}
            />
            <View>
                <Button title="Go back" onPress={() => history.push("/menu")} backgroundColor="#111111" />
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
