import React, { useEffect, useState } from "react"
import { StyleSheet, Text, View } from "react-native"
import { useHistory, useParams } from "react-router-native"
import Constants from "expo-constants"
import { observer } from "mobx-react"
import { Button } from "../../components/common"
import { CategoriesStore } from "../../stores/categories/CategoriesStore"

export const CategoriesDetails = observer(() => {
    const history = useHistory()
    const params = useParams<{ id: string }>()
    const [categoriesStore] = useState(() => new CategoriesStore())

    useEffect(() => {
        categoriesStore.loadById(params.id)
    }, [])

    const handleDelete = () => {
        categoriesStore.deleteById(params.id, () => history.replace("/categories/list"))
    }

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Category details</Text>
            <View style={styles.content}>
                {!categoriesStore.isDeleting ? (
                    <>
                        {categoriesStore.isLoading && <Text>Loading data...</Text>}
                        {!categoriesStore.category && !categoriesStore.isLoading && <Text>No data</Text>}
                        {categoriesStore.category && (
                            <View>
                                <Text>Id: {categoriesStore.category.id}</Text>
                                <Text>Name: {categoriesStore.category.name}</Text>
                                <Text>Slug: {categoriesStore.category.slug}</Text>
                                <Text style={styles.text}>
                                    Description: {categoriesStore.category.description ? categoriesStore.category.description : "/"}
                                </Text>
                                <Button
                                    title="Edit"
                                    onPress={() => history.push(`/categories/edit/${params.id}`)}
                                    backgroundColor="#FF851B"
                                    marginBottom={8}
                                />
                                <Button title="Delete" onPress={() => handleDelete()} backgroundColor="#FF4136" />
                            </View>
                        )}
                    </>
                ) : (
                    <Text>Deleting category...</Text>
                )}
                {categoriesStore.error && <Text style={styles.error}>{categoriesStore.error.message}</Text>}
            </View>
            <View>
                <Button title="Go back" onPress={() => history.push("/categories/list")} backgroundColor="#111111" />
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
    text: {
        marginBottom: 16,
    },
    error: {
        fontSize: 16,
        color: "#FF4136",
    },
})
