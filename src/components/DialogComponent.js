import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity, TextInput, FlatList, ScrollView, Dimensions, Picker } from "react-native";
import FontAwesomeIcon from "react-native-vector-icons/MaterialIcons";
import Dialog, { DialogFooter, DialogTitle, DialogButton, SlideAnimation, PopupDialog, DialogContent } from 'react-native-popup-dialog';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { addCategory, addLocations, addLocation, updateCategory, removeCategory } from '../action/modifyActions';

import ModifyLocation from '../action/ModifyLocation';
import ModifyCategory from '../action/ModifyCategory';

export default function DialogComponent(props) {

    useEffect(() => {

        // const _props = JSON.stringify({ props });
        // console.log('DialogComponent._props: ' + _props);
        // props = JSON.parse(props);
        // console.log('DialogComponent.props: ' + props);
        // console.log('locationDialogOpen: ' + locationDialogOpen);

        // console.log('LocationList: ' + JSON.stringify(locationList));
        // console.log('LocationList: ' + JSON.stringify(locationList));
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                < Dialog
                    visible={props.locationDialogOpen}
                    onTouchOutside={() => { (props.onDismiss()) }}
                    dialogAnimation={new SlideAnimation({ slideFrom: 'bottom', })}
                    dialogStyle={styles.locationDialog}
                >
                    <DialogContent>
                        <View style={styles.welcomeContainer}>
                            <ModifyLocation
                                initialValue=""
                                visible={props.locationDialogOpen}
                                locationDialogOpen={props.locationDialogOpen}
                                setLocationDialogOpen={props.setLocationDialogOpen}                                

                                onSaveLocation={props.onSaveLocation}
                                onUpdate={props.onUpdate}
                                onAdd={props.addLocationHandler}
                                reloadStorage={props.reloadStorage}

                                myLocationList={props.myLocationList}

                                onCancel={props.onCancel}
                                onDismiss={props.onDismiss}

                                locationDialogOpen={props.locationDialogOpen}
                                setLocationDialogOpen={props.setLocationDialogOpen}

                                showMediumMap={props.showMediumMap}
                                setShowMediumMap={props.setShowMediumMap}

                                isAddLocationMode={props.isAddLocationMode}
                                setIsAddLocationMode={props.setIsAddLocationMode}


                                showMenu={props.showMenu}
                                setShowMenu={props.setShowMenu}

                                windowWidth={props.windowWidth}
                                windowHeight={props.windowHeight}
                            />
                        </View>
                    </DialogContent>
                </Dialog>

                < Dialog
                    visible={props.updateOpen}
                    onTouchOutside={() => { props.onDismiss() }}
                    dialogAnimation={new SlideAnimation({ slideFrom: 'bottom', })}
                    dialogStyle={styles.dialog}
                >
                    <DialogContent>
                        <View style={styles.welcomeContainer}>
                            <ModifyCategory
                                initialValue=""
                                visible={props.updateOpen}
                                updateOpen={props.updateOpen}
                                setUpdateOpen={props.setUpdateOpen}

                                onUpdate={props.onUpdate}
                                reloadStorage={props.reloadStorage}

                                myLocationList={props.myLocationList}
                                onUpdateCategories={props.onUpdateCategories}

                                onCancel={props.onCancel}
                                onDismiss={props.onDismiss}

                                setIsUpdateMode={props.setIsUpdateMode}
                                isUpdateMode={props.isUpdateMode}

                                windowWidth={windowWidth}
                                windowHeight={windowHeight}
                            />
                        </View>
                    </DialogContent>
                </Dialog>
            </View>
        </View>

    );
}


const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    // container: {
    //   flexGrow: 1,
    //   // flex: 1,
    //   height: 1600,
    //   width: windowWidth,
    // },
    container: {
        flex: 1,
        maxHeight: "98%",
        zIndex: 10,
        alignContent: "center",
        justifyContent: 'center',
    },
    textDialog: {
        padding: 20,
        fontSize: 20,
        textAlign: 'center'
    },
    dialog: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 260,
        width: '90%',
        padding: 20,
    },
    dialogTitle: {
        justifyContent: 'center',
        alignItems: 'center',
        // height: 60,
        paddingTop: 20,
        marginTop: 20,
        padding: 20,
        fontSize: 20,
        textAlign: 'center'
        // width: '90%',
        // padding: 20,
    },
    locationDialog: {
        alignItems: 'center',
        // height: windowHeight * .8,
        height: 500,
        width: '90%',
        padding: 20,
    },
    boxContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    textContainer: {
        alignItems: 'center',
    },
    categoryItem: {
        alignItems: 'center',
        width: '80%',
    },
    welcomeContainer: {
        // flex: 1,
        alignItems: 'center',
        padding: 20,
    },
    textPrompt: {
        paddingHorizontal: 10,
        paddingVertical: 40,
        fontSize: 20,
        textAlign: 'center',
        zIndex: 1
    },
    icon: {
        color: "#4287f5",
        fontSize: 120,
        zIndex: 1
    },
});