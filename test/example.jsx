import withListEditor from "../src/mui-list-editor";
import React from "react";
const DEFAULT_VALUE = { name: "", age: null };
const showAsAccordion = false;
import { PersonEditor } from "./PersonEditor";
import { v4 as uuidv4 } from "uuid";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const getDefaultValue = () => ({ ...DEFAULT_VALUE, id: uuidv4() });
const getValueIdKey = (val) => val.id;
const PersonListEditor = withListEditor(
  PersonEditor,
  getDefaultValue,
  showAsAccordion,
  "New Item",
  null,
  getValueIdKey,
  'itemListEditor1'
);

const PersonListEditor2 = withListEditor(
  PersonEditor,
  getDefaultValue,
  showAsAccordion,
  "New Item",
  null,
  getValueIdKey,
  'itemListEditor2'
);
const defaultList = [
  { name: "1 João", age: 20, id: '1Joao'},
  { name: "2 Maria", age: 25, id: '2Maria' },
  { name: "3 José", age: 30, id: '3Jose'},
  { name: "4 Rpdp;fp", age: 20, id: '4Rdoolfo' }
];

export function Home() {
  const [personListInfo, setPersonListInfo] = React.useState(defaultList);
  const [personListInfo2, setPersonListInfo2] = React.useState(defaultList);
  return (
    <DndProvider backend={HTML5Backend}>
    <div style={{ maxWidth: 400 }}>
      {/*JSON.stringify(personListInfo)*/}
      <PersonListEditor
        value={personListInfo}
        onChange={(newValue) => {
          setPersonListInfo(newValue);
        }}
        sx={{ padding: 1 }}
      />
    </div>
    <br/>
    <br/>
    <div style={{ maxWidth: 400 }}>
    {/*JSON.stringify(personListInfo)*/}
    <PersonListEditor2
      value={personListInfo2}
      onChange={(newValue) => {
        setPersonListInfo2(newValue);
      }}
      sx={{ padding: 1 }}
    />
  </div>
    </DndProvider>
  );
}
