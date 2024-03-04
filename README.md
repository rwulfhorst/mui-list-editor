# mui-list-editor

This package delivers the withListEditor higher-order component (HOC) that transforms your React Component into a list editor.


## Get Started

```bash
npm i mui-list-editor
# or
yarn add react-chartjs-2 chart.js
```

Let's say, you have a controlled editor, like

```jsx


function PersonEditor({ value, onChange }) {
  const lbStyle = {display: 'inline-block', width: '150px', textAlign: 'right'};

  return (<>
    <div>
      <label style={lbStyle}>Name</label>
      <input value={value?.name} onChange={(e) => { onChange({ ...value, name: e.target.value }) }} />
    </div>
    <div>
      <label style={lbStyle}>Age</label>
      <input value={value?.age}
        onChange={(e) => { onChange({ ...value, age: e.target.value }) }} type="number"  />
    </div>

  </>)
}

```
It's easy to create a list editor for PersonEditor.

```jsx

import withListEditor from 'mui-list-editor'

....

const DEFAULT_VALUE = {name:'',age:null}
const showAsAccordion = false
const PersonListEditor = withListEditor(PersonEditor,DEFAULT_VALUE,showAsAccordion,'New Item')

```

If you prefer editing as an Accordion:

```jsx
import withListEditor from 'mui-list-editor'

....

const DEFAULT_VALUE = {name:'',age:null}
const showAsAccordion = true
function cbGetAccordionHeader(value,ndx) {return `#${ndx+1}: ${value?.name||'(empty)'}`}

const PersonListEditor = withListEditor(PersonEditor,DEFAULT_VALUE,showAsAccordion,'New Item',cbGetAccordionHeader)

```

Finally replace the original component, keeping in mind that the component value is now a list (array).
```jsx
import React from 'react'

.....

 function Home() {
  const [personListInfo, setPersonListInfo] = React.useState([])
  return (
          <PersonListEditor
          value={personListInfo}
          onChange={(newValue) => { setPersonListInfo(newValue) }}
          sx={{ padding: 1 }} />
  );
}
```



## Requirements

- The original controlled  component must be based on the properties:
      value={}
      onChange={(newValue) => {}} 









