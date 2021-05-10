import React, { useEffect, useState } from "react"
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { useHistory } from "react-router-native"
import Constants from "expo-constants"
import { observer } from "mobx-react"
import { Button } from "../../components/common"
import { CategoriesStore } from "../../stores/categories/CategoriesStore"

export const CategoriesList = observer(() => {
    const history = useHistory()
    const [categoriesStore] = useState(() => new CategoriesStore())

    useEffect(() => {
        categoriesStore.loadProductCategories()
    }, [])

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Product Categories</Text>
            {categoriesStore.isLoading && <Text>Loading data...</Text>}
            {!categoriesStore.categories?.length && !categoriesStore.isLoading && <Text>Empty list</Text>}
            <FlatList
                data={categoriesStore.categories}
                renderItem={({ item, index }) => (
                    <TouchableOpacity key={index} style={styles.item} onPress={() => history.push(`/categories/details/${item.id}`)}>
                        <Text>Id: {item.id}</Text>
                        <Text>Name: {item.name}</Text>
                        <Text>Slug: {item.slug}</Text>
                        <Text>Description: {item.description ? item.description : "/"}</Text>
                    </TouchableOpacity>
                )}
                keyExtractor={(item, index) => index.toString()}
            />
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
