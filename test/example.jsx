import withListEditor from "../src/mui-list-editor";
import React from "react";
const DEFAULT_VALUE = { name: "", age: null };
const showAsAccordion = false;
import { PersonEditor } from "./PersonEditor";
import { v4 as uuidv4 } from "uuid";

const getDefaultValue = () => ({ ...DEFAULT_VALUE, id: uuidv4() });
const getValueIdKey = (val) => val.id;
const PersonListEditor = withListEditor(
  PersonEditor,
  getDefaultValue,
  showAsAccordion,
  "New Item",
  null,
  getValueIdKey
);

const defaultList = [
  { name: "1 João", age: 20, id: '1Joao'},
  { name: "2 Maria", age: 25, id: '2Maria' },
  { name: "3 José", age: 30, id: '3Jose'},
  { name: "4 Rpdp;fp", age: 20, id: '4Rdoolfo' }
];

export function Home() {
  const [personListInfo, setPersonListInfo] = React.useState(defaultList);
  return (
    <div style={{ maxWidth: 400 }}>
      {JSON.stringify(personListInfo)}
      <PersonListEditor
        value={personListInfo}
        onChange={(newValue) => {
          setPersonListInfo(newValue);
        }}
        sx={{ padding: 1 }}
      />
    </div>
  );
}
