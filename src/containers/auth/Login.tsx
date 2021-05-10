import React, { useState } from "react"
import { StyleSheet, Text, View } from "react-native"
import Constants from "expo-constants"
import { observer } from "mobx-react"
import { Button, Input } from "../../components/common"
import { LoginStore } from "../../stores/auth/LoginStore"

export const Login = observer(() => {
    const [loginStore] = useState(() => new LoginStore())

    const handleLogin = async () => {
        await loginStore.login()
    }

    return (
        <View style={styles.container}>
            <View style={styles.headingWrapper}>
                <Text style={styles.heading}>Log in</Text>
            </View>
            <Input value={loginStore.user.username} onChange={(value) => loginStore.setValue("username", value)} placeholder="Username" />
            <Input
                value={loginStore.user.password}
                onChange={(value) => loginStore.setValue("password", value)}
                placeholder="Password"
                isPassword={true}
            />
            <Button title="Log in" onPress={() => handleLogin()} backgroundColor="#111111" />
            {loginStore.error && <Text style={styles.error}>{loginStore.error.message}</Text>}
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
    headingWrapper: {
        alignSelf: "flex-start",
    },
    heading: {
        fontSize: 24,
        color: "#111111",
        marginBottom: 16,
    },
    error: {
        fontSize: 16,
        color: "#FF4136",
    },
})
