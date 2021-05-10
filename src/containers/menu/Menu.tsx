import React, { useState } from "react"
import { StyleSheet, Text, View } from "react-native"
import { useHistory } from "react-router-native"
import Constants from "expo-constants"
import { observer } from "mobx-react"
import { Button } from "../../components/common"
import { LogoutStore } from "../../stores/auth/LogoutStore"

export const Menu = observer(() => {
    const history = useHistory()
    const [logoutStore] = useState(() => new LogoutStore())

    const handleLogout = async () => {
        await logoutStore.logout()
    }

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Menu</Text>
            <Button
                title="Product categories"
                onPress={() => history.push("/categories")}
                backgroundColor="#FFFFFF"
                color="#111111"
                marginBottom={8}
                borderColor="#111111"
            />
            <Button
                title="Reports"
                onPress={() => history.push("/reports")}
                backgroundColor="#FFFFFF"
                color="#111111"
                marginBottom={8}
                borderColor="#111111"
            />
            <Button title="Log out" onPress={() => handleLogout()} backgroundColor="#111111" />
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
