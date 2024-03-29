
/**
 * Higher-Order-Component react-list-editor
 * Transforms a controlled component with value=value and onChange(newValue) properties  into
 * componente editor de Lista com propriedades value=[value] e onChange([newValue])
 */

import React from 'react'
import { Button, IconButton, Accordion, AccordionSummary, Typography, AccordionDetails } from '@mui/material'
import { ArrowCircleUp, Delete, Add, ExpandMore } from '@mui/icons-material';

/*Para Memoizar o Item, usa a função sobre o componente antes de usar com withListEditor.
Ex:

const MemoizedKanbanColumn=memoizeEditor(KanbanColumn);
const KanbanColumns = withListEditor(MemoizedKanbanColumn,
    {
        title: '',
        color: '',
        summary: {
            dataSource: '',
            countField: '',
            totalField: '',
            totalTitle: ''

        },
        card: {}
    })

*/

/*export const memoizeEditor = (Component) => {

    return React.memo(Component,
        (prevProps, nextProps) => {        
            const res = isEqual(prevProps.value, nextProps.value)
            return res;
        }
    )

}
*/
const iconFontSize = '0'
const iconContainerStyle = { display: 'flex', flexFlow: 'column' }
const OptionalAccordion = ({ title = "Titulo", visible = true, children, summaryControl }) => {
    if (!visible)
        return <>{children}</>

    return <Accordion  defaultExpanded={true}
            slotProps={{ transition: { unmountOnExit: true } }}>
        <AccordionSummary expandIcon={<ExpandMore /> } >
            <Typography>{title}</Typography>
            {summaryControl ? summaryControl : null}
        </AccordionSummary>
        <AccordionDetails >
            {children}

        </AccordionDetails>
    </Accordion>

}


const ItemControls = ({ ndx, onAdd, onUp, onDelete, prevText, addText, deleteText = "Excluir" }) => {
    return (<div style={iconContainerStyle}>
        <IconButton disabled={ndx === 0} title={prevText} onClick={onUp} size="small">
            <ArrowCircleUp fontSize={iconFontSize} />
        </IconButton>
        <IconButton title={deleteText} onClick={onDelete} size="small">
            <Delete fontSize={iconFontSize} />
        </IconButton>
    </div>

    )
}
/**
 * withListEditor: Transforms a single editor into list editor based on MUI-Library 
 * 
 * @param {Element} ValuedEditorComponent A component with value and onChange((newValue)=>{}) props
 * @param {Object} defaultValue A JSON Object that initializes new Items 
 * @param {bool|string} useAccordion: true, false, 'auto'. 'auto' show as Accordion if more than 1 element
 * @param {string} newItemText: (options) Text show on Button thaht Inserts New Items
 * @param {function} cbAccordionContent: (optional) function, should return Accordion Content cbAccordoinContent((value,ndx)=>()) 
 * @returns 
 */
const withListEditor = (ValueEditorComponent, defaultValue = null, useAccordion = 'auto', newItemText = 'Inserir Item', cbAccordionContent=null) => {
    return ({ value = [], onChange = null, ...otherProps }) => {
        const handleAdd = () => {
            if (onChange) {
                var newJoinList = [...value];
                newJoinList.push(defaultValue)
                onChange(newJoinList)
            }
        }
        const handleDelete = (ndx) => {
            if (onChange) {
                var newJoinList = [...value];
                newJoinList.splice(ndx, 1)
                onChange(newJoinList)
            }
        }
        const handleSwap = (ndx1, ndx2) => {
            if (onChange && ndx1 >= 0 && ndx2 >= 0 && ndx1 < value.length && ndx2 < value.length && ndx1 !== ndx2) {

                var newJoinList = [...value];
                const temp = newJoinList[ndx1];
                newJoinList[ndx1] = newJoinList[ndx2]
                newJoinList[ndx2] = temp
                onChange(newJoinList)
            }

        }

        if (!(value instanceof Array))
            throw new Error('Value should be an Array')

        return <>


            {value.map((val, ndx) => (
                <div key={ndx} style={{ display: 'flex', width: '100%' }}>
                    <div style={{ flexGrow: 1, flexShrink: 1 }}>
                        <OptionalAccordion visible={useAccordion === `auto` ? value.length > 1 : !!useAccordion} title={
                            cbAccordionContent?cbAccordionContent(val,ndx):
                            `Item ${ndx + 1}`}>
                            <ValueEditorComponent
                                key={ndx}
                                value={val}
                                onChange={(val) => {
                                    var newValues = [...value];
                                    newValues[ndx] = val
                                    onChange(newValues)
                                }}
                                {...otherProps}
                            />
                        </OptionalAccordion>

                    </div>
                    <ItemControls
                        ndx={ndx}
                        onUp={() => { handleSwap(ndx, ndx - 1) }}
                        onAdd={() => { handleAdd() }}
                        onDelete={() => { handleDelete(ndx) }}
                        addText={newItemText}
                    />
                </div>))}

            <Button onClick={() => { handleAdd() }} size="small">
                <Add fontSize={iconFontSize} />{newItemText}
            </Button>
        </>;

    };
    //Wrapped Component deve ter atributos: value=[] e onChnge

}
export default withListEditor