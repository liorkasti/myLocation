import React, { useState, useEffect } from "react";
import { View, StyleSheet, StatusBar, Dimensions, Image, TouchableOpacity, Text, ScrollView, SafeAreaView, Constants } from "react-native"
import { useHistory } from "react-router-dom";

import MyLocationController from "../placesController/MyLocationController";
import Category from "../screens/Category";
import Location from "../screens/Location";

import HeaderBar from "../components/HeaderBar";

const components = { MyLocationController, Category, Location };

const CurrentComponentRouter = (props) => {
    const CurrentComponent = props.currentComponent;
    if (!CurrentComponent) return <View />

    return (
        <CurrentComponent
            props={props}
        />)
};

export default function Index(props) {

    const [componentIndex, setComponentIndex] = useState(0);
    const [categoriesList, setCategoriesList] = useState([]);
    const [currentCategories, setCurrentCategories] = useState("");

    const [isAddMode, setIsAddMode] = useState(false);
    const [isCancelMode, setIsCancelMode] = useState(false);

    const [dialogOpen, setDialogOpen] = useState(false);
    const [showBack, setShowBack] = useState(false);

    const componentKeys = ["MyLocationController", "Category", "Location"];
    const headers = { MyLocationController: "My Locations", Category: "Category", Location: "Location" };


    useEffect(() => {
        console.warn("Component Index: ", componentIndex);

        if (componentIndex > componentKeys.length - 1) {
            history.push("/");
        }

        if (currentCategories) {
            console.warn("Current Category:", currentCategories);

        }
        
        if (componentIndex < 0) {
            setShowBack(false);
        }
        if (componentIndex > 0) {
            setShowBack(true);
        }

        // todo: add to set 2 dimantions containet to hold the category item item(id,name, locations list {name, address, coordinates, and category}).
        // if (categoriesList.length) {
        //     setCategoriesList(currentCategories => [
        //         ...currentCategories,
        //         { id: Math.random().toString(), name: categoryTitle }
        //     ]);
        // }
    }, [componentIndex])

    let history = useHistory();

    const onCreate = (name) => {

        categories(name)
    }
    useEffect(() => {
        console.warn("dialog open", dialogOpen)
    }, [dialogOpen])

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="rgba(0,88,155,1)" />

            <HeaderBar
                componentIndex={componentIndex}
                // currentCategories={setCurrentCategories(currentCategories)}
                currentCategories={currentCategories}

                header={headers[componentKeys[componentIndex]]}
                onBack={() => { setComponentIndex(componentIndex - 1) }}

                setDialogOpen={() => { setDialogOpen(!dialogOpen); }}
                dialogOpen={dialogOpen}

                style={styles.header}

            />

            <ScrollView style={styles.scrollView}>
                <CurrentComponentRouter
                    currentComponent={components[componentKeys[componentIndex]]}
                    componentIndex={componentIndex}

                    categoriesList={categoriesList}

                    // currentCategories={setCurrentCategories(currentCategories)}
                    currentCategories={currentCategories}


                    showBack={showBack}
                    onBack={() => { setComponentIndex(componentIndex - 1) }}
                    onNext={() => { setComponentIndex(componentIndex + 1) }}

                    dialogOpen={dialogOpen}
                    setDialogOpen={() => { setDialogOpen(!dialogOpen); }}

                    onDismiss={() => { setDialogOpen(false); }}
                    style={styles.componentStyle}
                />

            </ScrollView>
        </View>
    );
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
    },
    header: {
        zIndex: 100,
        paddingBottom: 15
    },
    scrollView: {
        zIndex: 1,
    },
});