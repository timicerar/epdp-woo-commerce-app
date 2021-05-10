import React, { useEffect, useState } from "react"
import { StyleSheet, Text, View } from "react-native"
import { useHistory, useParams } from "react-router-native"
import Constants from "expo-constants"
import { observer } from "mobx-react"
import { Button, Input } from "../../components/common"
import { CategoriesEditStore } from "../../stores/categories/CategoriesEditStore"

export const CategoriesEdit = observer(() => {
    const history = useHistory()
    const params = useParams<{ id: string }>()
    const [categoryStore] = useState(() => new CategoriesEditStore())

    useEffect(() => {
        categoryStore.loadById(params.id)
    }, [])

    const handleEdit = async () => {
        await categoryStore.edit(params.id, () => history.push(`/categories/details/${params.id}`))
    }

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Category Edit</Text>
            <View style={styles.content}>
                {categoryStore.isLoading && <Text>Loading data...</Text>}
                {!categoryStore.isEditing && categoryStore.category ? (
                    <>
                        <Input value={categoryStore.category.name} onChange={(value) => categoryStore.setValue("name", value)} placeholder="Name" />
                        <Input value={categoryStore.category.slug} onChange={(value) => categoryStore.setValue("slug", value)} placeholder="Slug" />
                        <Input
                            value={categoryStore.category.description}
                            onChange={(value) => categoryStore.setValue("description", value)}
                            placeholder="Description"
                        />
                        <Button title="Edit" onPress={() => handleEdit()} backgroundColor="#FF851B" />
                    </>
                ) : (
                    categoryStore.isEditing && <Text>Product category editing...</Text>
                )}

                {categoryStore.error && <Text style={styles.error}>{categoryStore.error.message}</Text>}
            </View>
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
