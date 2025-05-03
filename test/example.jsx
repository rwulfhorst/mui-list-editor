
import withListEditor from '../src/mui-list-editor'

const DEFAULT_VALUE = {name:'',age:null}
const showAsAccordion = false
const PersonListEditor = withListEditor(PersonEditor,DEFAULT_VALUE,showAsAccordion,'New Item')


function Home() {
    const [personListInfo, setPersonListInfo] = React.useState([])
    return (
            <PersonListEditor
            value={personListInfo}
            onChange={(newValue) => { setPersonListInfo(newValue) }}
            sx={{ padding: 1 }} />
    );
  }
  