/* tslint:disable */

export interface IText_Model {

  localeList: IText_Model_LocaleList;
  multipleChoice: IText_Model_MultipleChoice;
  singleChoice: IText_Model_SingleChoice;
  textList: IText_Model_TextList;
}

export interface IText_Model_TextList {

  advice: () => string;
  label: IText_Model_TextList_Label;
  fruit: IText_Model_TextList_Fruit;
}

export interface IText_Model_TextList_Fruit {

  apple: () => string;
  peach: () => string;
  cherry: () => string;
}

export interface IText_Model_TextList_Label {

  seasons: () => string;
  advice: () => string;
  fruits: () => string;
  welcome: () => string;
  status: () => string;
}

export interface IText_Model_SingleChoice {

  changeByValue: () => string;
  changeByIndex: () => string;
  filter: () => string;
  selectedIndex: () => string;
  selectedValue: () => string;
  selectedText: () => string;
  selectedItem: () => string;
}

export interface IText_Model_MultipleChoice {

  changeByValues: () => string;
  changeByIndexes: () => string;
  selectAll: () => string;
  selectNone: () => string;
  filter: () => string;
  selectedCount: () => string;
  selectedIndexes: () => string;
  selectedValues: () => string;
  selectedTexts: () => string;
  selectedItems: () => string;
}

export interface IText_Model_LocaleList {

  changeByCode: () => string;
  changeByIndex: () => string;
  selectedIndex: () => string;
  selectedCode: () => string;
  selectedName: () => string;
  selectedItem: () => string;
}
