import React, { useState, useEffect } from "react";
import { View, StyleSheet, StatusBar, Dimensions, Alert, Image, TouchableOpacity, Text, ScrollView, SafeAreaView, Constants } from "react-native"
import { useHistory } from "react-router-dom";
// import AsyncStorage from '@react-native-community/async-storage';

// import { KEYS, setItem, getItem, clearAll } from '../utils/myLocationsStorage';
// import { KEYS, storeData, setItem, getItem, multiSet, multiGet, getMyStringValue, getMyObject, getAllKeys, clearAll } from '../utils/myLocationsStorage';
import { addCategory, addLocations, addLocation, appendCategory, appendLocation, updateCategory, removeCategory } from '../action/modifyActions';
import Categories from "../screens/Categories";
import Category from "../screens/Category";
import Location from "../screens/Location";

import HeaderBar from "../components/HeaderBar";

const components = { Categories, Category, Location };

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
    const [renderedCategory, setRenderedCategory] = useState([]);
    const [renderedCategories, setRenderedCategories] = useState([]);
    const [renderedLocation, setRenderedLocation] = useState([]);
    const [renderedLocations, setRenderedLocations] = useState([]);

    const [storageItem, setStoreItem] = useState([]);
    const [storageItems, setStoreItems] = useState([]);

    const componentKeys = ["Categories", "Category", "Location"];
    const headers = { Categories: "Categories", Category: renderedCategory, Location: renderedLocation };

    const [dialogOpen, setDialogOpen] = useState(false);
    const [locationDialogOpen, setLocationDialogOpen] = useState(false);
    const [updateOpen, setUpdateOpen] = useState(false);
    const [showBack, setShowBack] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [logout, setLogout] = useState(false);


    // load from storage
    // let item = getItem(KEYS.CATEGORY) || [];
    // let items = getItem(KEYS.CATEGORIES) || [];

    useEffect(() => {
        // // console.log("Storage Rendered Category: ", item);
        console.log("Root Current Category: ", renderedCategory);
        // // console.log('Storage Rendered Categories: : ', items);
        console.log("Root Current Categories: ", renderedCategories);
        // console.log("Root Current Location: ", renderedLocation);
        // console.log("Root Current Locations: ", renderedLocations);
        // console.log("Index props: ", props)

        if (componentIndex < 0) {
            setShowBack(false);
            if (updateOpen) setUpdateOpen(false)
            initStorage();
        }
        if (componentIndex > 0) {
            setShowBack(true);
            if (updateOpen) setUpdateOpen(false)
            initStorage();
        }
        // todo: add to set 2 dimantions containet to hold the category item item(id,name, locations list {name, address, coordinates, and category}).

        // console.log('showMenu props: ' + showMenu);
        // clearAll();        
        //TODO: add logout button to top menu when async
        if (logout) {
            clearAll();
            setComponentIndex(componentIndex - 1);
            console.log('logout: ' + logout + 'componentIndex: ' + componentIndex);
            setLogout(false);
        }
        // return clearAll()

        // }, [])
    }, [renderedCategory, renderedLocations, componentIndex])

    let history = useHistory();

    // set current category
    const renderedCategoryHandler = async (categoryName) => {
        console.log('I am HERE NOW: ', renderedCategoryHandler);

        setRenderedCategory(categoryName);
        // TODO: Asynch Storage
        // item = setItem(KEYS.CATEGORIES, JSON.stringify(categoryNode))
        // item = getItem(KEYS.CATEGORIES, JSON.stringify(categoryNode))
    }

    // update the categories list
    const renderedCategoriesHandler = async (categoryName) => {
        if (addCategory(renderedCategories, categoryName) !== categoryName) {
            setRenderedCategories(addCategory(renderedCategories, categoryName, renderedLocations));
        } else {
            Alert.alert("The category '" + categoryName + "' already exist!");
        }
        // TODO: Asynch Storage
        // items = multiSet(KEYS.CATEGORIES, item)
        // const result = setItem(KEYS.CATEGORIES, JSON.stringify(renderedCategories));
        // console.warn("SET ITEMS", result)
    }

    // update the location list
    const renderedLocationHandler = async (locationNode) => {
        setRenderedLocation(locationNode);
    }

    // update current location 
    const appendLocationHandler = (categories, category, location) => {
        console.warn("SET appendLocationHandler", categories, category, locations)

        appendLocation();
    };

    // update the locations list
    const renderedLocationsHandler = async (locationsListNode) => {
        // console.warn("SET renderedLocationsHandler", locationsListNode)
        console.warn("exist? ", addLocation(renderedLocations, locationsListNode))
        if (addLocation(renderedLocations, locationsListNode) !== locationsListNode) {
            setRenderedLocations(addLocation(renderedLocations, locationsListNode));
        } else {
            Alert.alert("The location '" + locationsListNode.locationName + "' already exist!");
        }
        appendLocationHandler(renderedCategories, renderedCategory, renderedLocations);
    }



    const onUpdateHandler = (renderedCategories, renderedCategory, editCategory) => {
        // Alert.alert("Update Category", "Are you sure you want to update to '" + editCategory + "'?");
        // TODO: confirmationAlert cancelable
        // confirmation = confirmationAlert("Delete Category", "Are you sure you want to delete");
        // if (confirmation) {
        setRenderedCategories(updateCategory(renderedCategories, renderedCategory, editCategory));
        // setComponentIndex(componentIndex - 1);
        if (updateOpen) setUpdateOpen(false)
        // if (showMenu) setShowMenu(false);
        // removeValue(deleteItem);
        console.log("updateOpen: ", updateOpen)
    };

    const onDeleteHandler = deleteItem => {
        Alert.alert("Delete Category", "Are you sure you want to delete '" + deleteItem + "'?");
        // TODO: confirmationAlert cancelable
        // confirmation = confirmationAlert("Delete Category", "Are you sure you want to delete");
        // if (confirmation) {
        setRenderedCategories(removeCategory(renderedCategories, deleteItem), renderedLocations);
        setComponentIndex(componentIndex - 1);
    };


    const initStorage = () => {
        // setRenderedCategory(getItem(KEYS.CATEGORY) || []);
        // setRenderedCategories(getItem(KEYS.CATEGORIES) || []);
        // setRenderedCategories(multiGet(getItem(KEYS.CATEGORIES)) || []);
        setRenderedCategory(renderedCategory);
        setRenderedCategories(renderedCategories);
    }


    const menuBarActionHandler = (action, backHistory) => {
        console.log("Action Handler Action SET: ", action)
        switch (action) {
            case "addLocation":
                setLocationDialogOpen(true);
                break;
            case "editCategory":
                setUpdateOpen(true);
                // onUpdateHandler(action);
                setShowMenu(false);
                break;
            case "deleteCategory":
                console.log('action: ' + action);
                onDeleteHandler(renderedCategory);
                setShowMenu(false);
                break;
            case "resetCategories":
                console.log('action: ' + action);
                setLogout(true);
                break;
            case "onOpenLocation":
                setComponentIndex(componentIndex + 1)
                break;
            default:
                return next(action);
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="rgba(0,88,155,1)" />

            <HeaderBar
                componentIndex={componentIndex}

                handleMenu={(subroute, _, action = _) => {
                    menuBarActionHandler(subroute, action);
                }}
                onActionMenu={(action) => { menuBarActionHandler(action); }}

                header={headers[componentKeys[componentIndex]]}
                onBack={() => {
                    if (showMenu) setShowMenu(false);
                    setComponentIndex(componentIndex - 1);
                }}

                onNext={() => {
                    if (showMenu) setShowMenu(false);
                    setComponentIndex(componentIndex + 1)
                }}

                renderedCategories={renderedCategories}
                onUpdateCategories={renderedCategoriesHandler}

                renderedCategory={renderedCategory}
                onUpdateCategory={renderedCategoryHandler}

                renderedLocation={renderedLocation}
                onUpdateLocation={renderedLocationHandler}

                renderedLocations={renderedLocations}
                onUpdateLocations={renderedLocationsHandler}

                // onActionMenu={menuBarActionHandler}
                showMenu={showMenu}
                setShowMenu={() => { setShowMenu(!showMenu); }}

                onDelete={onDeleteHandler}
                onLogout={setLogout}

                dialogOpen={dialogOpen}
                setDialogOpen={() => { setDialogOpen(!dialogOpen); }}

                locationDialogOpen={locationDialogOpen}
                setLocationDialogOpen={() => { setLocationDialogOpen(!locationDialogOpen); }}

                updateOpen={updateOpen}
                setUpdateOpen={() => { setUpdateOpen(!updateOpen); }}

                style={styles.header}
            />

            {/* <ScrollView style={styles.scrollView}> */}
            {/* {componentKeys[componentIndex] === "Categories" && */}
            <CurrentComponentRouter
                // <Categories
                currentComponent={components[componentKeys[componentIndex]]}
                componentIndex={componentIndex}

                showMenu={showMenu}
                setShowMenu={() => { setShowMenu(!showMenu); }}
                onActionMenu={(_action) => { handleAction(action); }}

                showBack={showBack}
                onBack={() => { setComponentIndex(componentIndex - 1) }}
                onNext={() => { setComponentIndex(componentIndex + 1) }}

                renderedCategories={renderedCategories}
                onUpdateCategories={renderedCategoriesHandler}

                renderedCategory={renderedCategory}
                onUpdateCategory={renderedCategoryHandler}

                renderedLocation={renderedLocation}
                onUpdateLocation={renderedLocationHandler}

                renderedLocations={renderedLocations}
                onUpdateLocations={renderedLocationsHandler}

                showMenu={showMenu}
                setShowMenu={() => { setShowMenu(!showMenu); }}
                handleMenu={(subroute, _, action = _) => {
                    menuBarActionHandler(subroute, action);
                }}
                onActionMenu={(_action) => { handleAction(action); }}

                showBack={showBack}
                onBack={() => { setComponentIndex(componentIndex - 1) }}
                onNext={() => { setComponentIndex(componentIndex + 1) }}

                dialogOpen={dialogOpen}
                setDialogOpen={() => { setDialogOpen(!dialogOpen); }}

                locationDialogOpen={locationDialogOpen}
                setLocationDialogOpen={() => { setLocationDialogOpen(!locationDialogOpen); }}

                onUpdateHandler={onUpdateHandler}

                updateOpen={updateOpen}
                setUpdateOpen={() => { setUpdateOpen(!dialogOpen); }}

                onDismiss={() => {
                    setDialogOpen(false);
                    setUpdateOpen(false);
                    setLocationDialogOpen(false);
                }}

                style={styles.componentStyle}
            />
            {/* } */}
            {/* 
            {componentKeys[componentIndex] === "Category" &&
                // <CurrentComponentRouter
                <Category
                    currentComponent={components[componentKeys[componentIndex]]}
                    componentIndex={componentIndex}

                    showMenu={showMenu}
                    setShowMenu={() => { setShowMenu(!showMenu); }}
                    onActionMenu={(_action) => { handleAction(action); }}

                    showBack={showBack}
                    onBack={() => { setComponentIndex(componentIndex - 1) }}
                    onNext={() => { setComponentIndex(componentIndex + 1) }}

                    renderedCategories={renderedCategories}
                    onUpdateCategories={renderedCategoriesHandler}

                    renderedCategory={renderedCategory}
                    onUpdateCategory={renderedCategoryHandler}

                    renderedLocation={renderedLocation}
                    onUpdateLocation={renderedLocationHandler}

                    renderedLocations={renderedLocations}
                    onUpdateLocations={renderedLocationsHandler}

                    showMenu={showMenu}
                    setShowMenu={() => { setShowMenu(!showMenu); }}
                    onActionMenu={(_action) => { handleAction(action); }}

                    showBack={showBack}
                    onBack={() => { setComponentIndex(componentIndex - 1) }}
                    onNext={() => { setComponentIndex(componentIndex + 1) }}

                    dialogOpen={dialogOpen}
                    setDialogOpen={() => { setDialogOpen(!dialogOpen); }}

                    locationDialogOpen={locationDialogOpen}
                    setLocationDialogOpen={() => { setLocationDialogOpen(!locationDialogOpen); }}

                    onUpdateHandler={onUpdateHandler}

                    updateOpen={updateOpen}
                    setUpdateOpen={() => { setUpdateOpen(!dialogOpen); }}

                    onDismiss={() => {
                        setDialogOpen(false);
                        setUpdateOpen(false);
                        setLocationDialogOpen(false);
                    }}

                    style={styles.componentStyle}
                />
            } 
            */}
            {/* </ScrollView> */}
        </View>
    );
}

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