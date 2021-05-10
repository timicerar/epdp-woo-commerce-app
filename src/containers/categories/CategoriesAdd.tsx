import React, { useState } from "react"
import { ScrollView, StyleSheet, Text, View } from "react-native"
import { useHistory } from "react-router-native"
import Constants from "expo-constants"
import { observer } from "mobx-react"
import { Button, Input } from "../../components/common"
import { CategoriesAddStore } from "../../stores/categories/CategoriesAddStore"

export const CategoriesAdd = observer(() => {
    const history = useHistory()
    const [categoryStore] = useState(() => new CategoriesAddStore())

    const handleAdd = async () => {
        await categoryStore.add(() => history.push("/categories/list"))
    }

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Category Add</Text>
            <ScrollView style={styles.content}>
                {!categoryStore.isLoading ? (
                    <>
                        <Input value={categoryStore.category.name} onChange={(value) => categoryStore.setValue("name", value)} placeholder="Name" />
                        <Input value={categoryStore.category.slug} onChange={(value) => categoryStore.setValue("slug", value)} placeholder="Slug" />
                        <Input
                            value={categoryStore.category.description}
                            onChange={(value) => categoryStore.setValue("description", value)}
                            placeholder="Description"
                        />
                        <Button title="Save" onPress={() => handleAdd()} backgroundColor="#2ECC40" />
                    </>
                ) : (
                    <Text>Saving...</Text>
                )}

                {categoryStore.error && <Text style={styles.error}>{categoryStore.error.message}</Text>}
            </ScrollView>
            <View>
                <Button title="Go back" onPress={() => history.push("/categories")} backgroundColor="#111111" />
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
    content: {
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
    error: {
        fontSize: 16,
        color: "#FF4136",
    },
})
