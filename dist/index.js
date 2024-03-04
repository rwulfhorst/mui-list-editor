/**
 * Higher-Order-Component react-list-editor
 * Transforms a controlled component with value=value and onChange(newValue) properties  into
 * componente editor de Lista com propriedades value=[value] e onChange([newValue])
 */

import React from 'react';
import { Button, IconButton, Accordion, AccordionSummary, Typography, AccordionDetails } from '@mui/material';
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
import { Fragment as _Fragment } from "react/jsx-runtime";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const iconFontSize = '0';
const iconContainerStyle = {
  display: 'flex',
  flexFlow: 'column'
};
const OptionalAccordion = ({
  title = "Titulo",
  visible = true,
  children,
  summaryControl
}) => {
  if (!visible) return /*#__PURE__*/_jsx(_Fragment, {
    children: children
  });
  return /*#__PURE__*/_jsxs(Accordion, {
    defaultExpanded: true,
    children: [/*#__PURE__*/_jsxs(AccordionSummary, {
      expandIcon: /*#__PURE__*/_jsx(ExpandMore, {}),
      children: [/*#__PURE__*/_jsx(Typography, {
        children: title
      }), summaryControl ? summaryControl : null]
    }), /*#__PURE__*/_jsx(AccordionDetails, {
      children: children
    })]
  });
};
const ItemControls = ({
  ndx,
  onAdd,
  onUp,
  onDelete,
  prevText,
  addText,
  deleteText = "Excluir"
}) => {
  return /*#__PURE__*/_jsxs("div", {
    style: iconContainerStyle,
    children: [/*#__PURE__*/_jsx(IconButton, {
      disabled: ndx === 0,
      title: prevText,
      onClick: onUp,
      size: "small",
      children: /*#__PURE__*/_jsx(ArrowCircleUp, {
        fontSize: iconFontSize
      })
    }), /*#__PURE__*/_jsx(IconButton, {
      title: deleteText,
      onClick: onDelete,
      size: "small",
      children: /*#__PURE__*/_jsx(Delete, {
        fontSize: iconFontSize
      })
    })]
  });
};
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
const withListEditor = (ValueEditorComponent, defaultValue = null, useAccordion = 'auto', newItemText = 'Inserir Item', cbAccordionContent = null) => {
  return ({
    value = [],
    onChange = null,
    ...otherProps
  }) => {
    const handleAdd = () => {
      if (onChange) {
        var newJoinList = [...value];
        newJoinList.push(defaultValue);
        onChange(newJoinList);
      }
    };
    const handleDelete = ndx => {
      if (onChange) {
        var newJoinList = [...value];
        newJoinList.splice(ndx, 1);
        onChange(newJoinList);
      }
    };
    const handleSwap = (ndx1, ndx2) => {
      if (onChange && ndx1 >= 0 && ndx2 >= 0 && ndx1 < value.length && ndx2 < value.length && ndx1 !== ndx2) {
        var newJoinList = [...value];
        const temp = newJoinList[ndx1];
        newJoinList[ndx1] = newJoinList[ndx2];
        newJoinList[ndx2] = temp;
        onChange(newJoinList);
      }
    };
    if (!(value instanceof Array)) throw new Error('Value should be an Array');
    return /*#__PURE__*/_jsxs(_Fragment, {
      children: [value.map((val, ndx) => /*#__PURE__*/_jsxs("div", {
        style: {
          display: 'flex',
          width: '100%'
        },
        children: [/*#__PURE__*/_jsx("div", {
          style: {
            flexGrow: 1,
            flexShrink: 1
          },
          children: /*#__PURE__*/_jsx(OptionalAccordion, {
            visible: useAccordion === `auto` ? value.length > 1 : !!useAccordion,
            title: cbAccordionContent ? cbAccordionContent(val, ndx) : `Item ${ndx + 1}`,
            children: /*#__PURE__*/_jsx(ValueEditorComponent, {
              value: val,
              onChange: val => {
                var newValues = [...value];
                newValues[ndx] = val;
                onChange(newValues);
              },
              ...otherProps
            }, ndx)
          })
        }), /*#__PURE__*/_jsx(ItemControls, {
          ndx: ndx,
          onUp: () => {
            handleSwap(ndx, ndx - 1);
          },
          onAdd: () => {
            handleAdd();
          },
          onDelete: () => {
            handleDelete(ndx);
          },
          addText: newItemText
        })]
      }, ndx)), /*#__PURE__*/_jsxs(Button, {
        onClick: () => {
          handleAdd();
        },
        size: "small",
        children: [/*#__PURE__*/_jsx(Add, {
          fontSize: iconFontSize
        }), newItemText]
      })]
    });
  };
  //Wrapped Component deve ter atributos: value=[] e onChnge
};
export default withListEditor;