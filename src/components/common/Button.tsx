import React from "react"
import { StyleSheet, Text, TouchableOpacity } from "react-native"

class ButtonStyleSheetFactory {
    static getStyleSheet = (props: ButtonProps) => {
        return StyleSheet.create({
            text: {
                fontSize: 16,
                color: props.color ?? "#FFFFFF",
            },
            button: {
                alignItems: "center",
                backgroundColor: props.backgroundColor ?? "#0074D9",
                padding: 12,
                borderWidth: props.borderColor ? 1 : 0,
                borderColor: props.borderColor,
                width: "100%",
                borderRadius: 4,
                marginBottom: props.marginBottom,
            },
        })
    }
}

type ButtonProps = {
    title: string
    onPress: () => void
    color?: string
    backgroundColor?: string
    marginBottom?: number
    borderColor?: string
    disabled?: boolean
}

export const Button = ({ ...props }: ButtonProps) => {
    const styles = ButtonStyleSheetFactory.getStyleSheet(props)
    return (
        <TouchableOpacity style={styles.button} disabled={props.disabled} onPress={props.onPress}>
            <Text style={styles.text}>{props.title}</Text>
        </TouchableOpacity>
    )
}
