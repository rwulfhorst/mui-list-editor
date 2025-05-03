
import withListEditor from '../src/mui-list-editor'
import React from 'react';
const DEFAULT_VALUE = {name:'',age:null}
const showAsAccordion = false
import {PersonEditor} from './PersonEditor'


      
const PersonListEditor = withListEditor(PersonEditor,DEFAULT_VALUE,showAsAccordion,'New Item')

const defaultList=[
    {name:'1 João',age:20},
    {name:'2 Maria',age:25},
    {name:'3 José',age:30},
    {name:'4 Rpdp;fp',age:20}]

export function Home() {
    const [personListInfo, setPersonListInfo] = React.useState(defaultList)
    return (
            <PersonListEditor
            value={personListInfo}
            onChange={(newValue) => { setPersonListInfo(newValue) }}
            sx={{ padding: 1 }} />
    );
  }
  