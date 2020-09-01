import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity, TextInput, ScrollView, FlatList, Modal, Dimensions } from "react-native";
import FontAwesomeIcon from "react-native-vector-icons/MaterialCommunityIcons";
import Dialog, { DialogFooter, DialogButton, SlideAnimation, DialogContent } from 'react-native-popup-dialog';
import toastMaker from '../utils/feedbackGenerator';

import { KEY } from '../router/index';
import CardItem from '../components/CardItem';
import ModifyCategory from '../action/ModifyCategory';
import DialogComponent from '../components/DialogComponent';

export default function Categories({ props }) {

  const [categoryList, setCategoryList] = useState([]);
  const [currentCategory, setCurrentCategory] = useState([]);

  const [isAddMode, setIsAddMode] = useState(false);
  const [isCancelMode, setIsCancelMode] = useState(false);

  useEffect(() => {
    if (isAddMode) {
      reloadStorage()
      // console.log("The Current Category: ", currentCategory);
      // console.log("The Category List: ", categoryList);
    }
    // return {  };
  }, [])

  const addCategoryHandler = categoryName => {

    if (isAddMode) setIsAddMode(true);
    updateStorage(categoryName);
    //TODO: set the line below to active before production.
    // props.setDialogOpen(false)
  };

  // call for local storing 
  const updateStorage = (newListItem) => {
    props.onUpdateCategory(newListItem)
    props.onUpdateCategories(newListItem)
  };

  const reloadStorage = () => {
    setCurrentCategory(props.renderedCategory);
    setCategoryList(props.renderedCategories);
    setIsAddMode(false);
  }

  const cancelCategoryHandler = () => {
    setIsCancelMode(true);
    props.setDialogOpen(false)
  };

  const removeCategoryHandler = categoryId => {

  };

  return (
    <View style={styles.container}>
      <ScrollView style={{ zIndex: 1, width: windowWidth * .7, height: windowHeight * .95 }}>

        <View style={styles.textContainer}>
          {
            (categoryList.length || props.renderedCategories.length) ?
              <>
                <Text style={styles.textPrompt}>Your Categories List</Text>

                <FlatList
                  keyExtractor={(item, index) => item.id}
                  data={props.renderedCategories}
                  renderItem={itemData => (
                    <CardItem
                      id={itemData.item.id}
                      onSelectedCategory={props.onUpdateCategory}
                      // onDelete={removeCategoryHandler}
                      onPress={props.onNext}
                      title={itemData.item.name}
                      style={styles.categoryItem}
                    />
                  )}
                />
              </>
              :
              <View style={styles.welcomeContainer}>
                <Text style={styles.textPrompt}>Please add your{"\n"}places categories</Text>
                <FontAwesomeIcon name="map-marker" style={styles.icon} />
              </View>
          }
        </View>

        < Dialog
          visible={() => { visible = true }}
          visible={props.dialogOpen}
          onTouchOutside={() => { props.onDismiss(); }}
          // onTouchOutside={() => { visible = (!visible) }}
          dialogAnimation={
            new SlideAnimation({
              slideFrom: 'bottom',
            })
          }
          dialogStyle={styles.dialog}
        >
          <DialogContent>
            <View style={styles.welcomeContainer}>
              <ModifyCategory
                initialValue=""
                visible={props.dialogOpen}
                dialogOpen={props.dialogOpen}

                onAdd={addCategoryHandler}
                // onUpdate={onUpdateHandler}

                onCancel={cancelCategoryHandler}
                onDismiss={() => { props.setDialogOpen() }}

                reloadStorage={reloadStorage}
                renderedCategory={props.renderedCategory}
                onUpdateCategories={props.onUpdateCategories}

                windowWidth={windowWidth}
                windowHeight={windowHeight}
              />
            </View>
          </DialogContent>
        </Dialog>
      </ScrollView>
    </View >
  );
}


const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxHeight: "98%"
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
    // width: '80%',
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
    textAlign: 'center'
  },
  icon: {
    color: "rgba(0,88,155,1)",
    fontSize: 120,
  }
});