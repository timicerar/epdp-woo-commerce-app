import React from "react"
import { StyleSheet, Text, View } from "react-native"
import { useHistory } from "react-router-native"
import Constants from "expo-constants"
import { observer } from "mobx-react"
import { Button } from "../../components/common"

export const Categories = observer(() => {
    const history = useHistory()

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Product Categories</Text>
            <Button
                title="List all"
                onPress={() => history.push("/categories/list")}
                backgroundColor="#FFFFFF"
                color="#111111"
                marginBottom={8}
                borderColor="#111111"
            />
            <Button
                title="Add category"
                onPress={() => history.push("/categories/add")}
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
