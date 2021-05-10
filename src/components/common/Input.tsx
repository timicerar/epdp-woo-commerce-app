import React from "react"
import { StyleSheet, TextInput } from "react-native"
import { observer } from "mobx-react"

type TextInputProps = {
    value: string
    onChange: (value: string) => void
    isPassword?: boolean
    placeholder?: string
    disabled?: boolean
}

export const Input = observer(({ ...props }: TextInputProps) => {
    const handleOnBlur = () => {
        props.value.trim()
    }

    return (
        <TextInput
            style={styles.input}
            value={props.value}
            onChangeText={props.onChange}
            onBlur={() => handleOnBlur()}
            editable={props.disabled}
            placeholder={props.placeholder}
            secureTextEntry={props.isPassword}
        />
    )
})

const styles = StyleSheet.create({
    input: {
        fontSize: 16,
        borderWidth: 1,
        borderColor: "#111111",
        borderRadius: 4,
        padding: 8,
        marginBottom: 8,
        width: "100%",
    },
})
