/**
 * Higher-Order-Component react-list-editor
 * Transforms a controlled component with value=value and onChange(newValue) properties  into
 * componente editor de Lista com propriedades value=[value] e onChange([newValue])
 */

import React from "react";
import {
  Button,
  IconButton,
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  Divider,
} from "@mui/material";
import {
  ArrowCircleUp,
  Delete,
  Add,
  ExpandMore,
  Menu,
} from "@mui/icons-material";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
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
const DND_TYPE = "itemListEditor";
const iconFontSize = "0";
const iconContainerStyle = { display: "flex", flexFlow: "column" };

const DroppableItem = ({ ndx, children, style = {} }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: DND_TYPE,
    drop: (item) => {
      console.log("drop" + JSON.stringify(item));
      return { ndx: ndx };
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
    hover: (item, monitor) => {
      console.log(
        "hover" + JSON.stringify(item) + "esta sobre" + JSON.stringify(ndx)
      );
    },
  }));

  return (
    <div style={{ marginBottom: isOver ? "0px" : "0px" }} ref={drop}>{ndx}
      {isOver ? <Divider color="primary" sx={{ margin: "0px" }} /> : null}
      {children}
    </div>
  );
};
const OptionalAccordion = ({
  title = "Titulo",
  visible = true,
  children,
  summaryControl,
}) => {
  if (!visible) return <>{children}</>;

  return (
    <Accordion
      defaultExpanded={true}
      slotProps={{ transition: { unmountOnExit: true } }}
    >
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography>{title}</Typography>
        {summaryControl ? summaryControl : null}
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
};

const DraggableItem = ({ ndx, onMove, children }) => {
  const [{ opacity, isDragging }, drag, dragPreview] = useDrag(() => ({
    type: DND_TYPE,
    item: { id: ndx },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
      opacity: monitor.isDragging() ? 0.4 : 1,
    }),
    end: (item, monitor) => {
      if (!monitor.didDrop()) {
        console.log("not dropped");
        return;
      }
      console.log("dropped");
      console.log("endDrag" + JSON.stringify(item));
      console.log(`Arrastado ${ndx} sobre ${monitor.getDropResult()?.ndx}`);
      onMove(ndx, monitor.getDropResult()?.ndx);
    },
  }));

  return (
    <>
      {isDragging ? (
        <>
          <div ref={dragPreview} style={{}}></div>
        </>
      ) : (
        <div
          ref={drag}
          style={{
            opactity: opacity,
            cursor: "hand",
            display: "flex",
            flexFlow: "row",
            flexWrap: "nowrap",
          }}
        >
          <div style={{ flexGrow: 1 }}>{children}</div>
          <div style={{ flexGrow: 0, cursor: "hand" }}>
            <Menu />
          </div>
        </div>
      )}
    </>
  );
};

function DroppableDelete() {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: DND_TYPE,
    drop: (item) => {
      console.log("drop" + JSON.stringify(item));
      //      onDelete(item.id);
      return { ndx: "delete" };
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
    hover: (item, monitor) => {
      console.log("hover" + JSON.stringify(item) + "esta sobre delete");
    },
  }));

  return (
    <div ref={drop}>
      <Delete color="secondary" />
    </div>
  );
}
const ItemControls = ({
  ndx,
  onAdd,
  onUp,
  onDelete,
  prevText,
  addText,
  deleteText = "Excluir",
  onSwap,
  onMove,
}) => {
  return (
    <div style={iconContainerStyle}>
      <DraggerItem ndx={ndx} onSwap={onMove} />
      {onUp && (
        <IconButton
          disabled={ndx === 0}
          title={prevText}
          onClick={onUp}
          size="small"
        >
          <ArrowCircleUp fontSize={iconFontSize} />
        </IconButton>
      )}
      {onDelete && (
        <IconButton title={deleteText} onClick={onDelete} size="small">
          <Delete fontSize={iconFontSize} />
        </IconButton>
      )}
    </div>
  );
};
/**
 * withListEditor: Transforms a single editor into list editor based on MUI-Library
 *
 * @param {Element} ValuedEditorComponent A component with value and onChange((newValue)=>{}) props
 * @param {Object || Function} defaultValue A JSON Object that initializes new Items, or a function that returns a JSON Object with new value
 * @param {bool|string} useAccordion: true, false, 'auto'. 'auto' show as Accordion if more than 1 element
 * @param {string} newItemText: (options) Text show on Button thaht Inserts New Items
 * @param {function} cbAccordionContent: (optional) function, should return Accordion Content cbAccordoinContent((value,ndx)=>())
 * @param {function} cbAccordionContent: (optional) function, should return Accordion Content cbAccordoinContent((value,ndx)=>())
 * @param {string || Function:string}  key that contains unique ID of object Or a function that returns it
* @returns
 */
const withListEditor = (
  ValueEditorComponent,
  defaultValue = null,
  useAccordion = "auto",
  newItemText = "Inserir Item",
  cbAccordionContent = null,
  valueIdKey = 'id'
) => {
  return ({ value = [], onChange = null, ...otherProps }) => {
    const handleAdd = () => {
      if (onChange) {
        var newJoinList = [...value];
        newJoinList.push(typeof defaultValue == "function" ? defaultValue() : defaultValue);
        onChange(newJoinList);
      }
    };
    const handleDelete = (ndx) => {
      if (onChange) {
        var newJoinList = [...value];
        newJoinList.splice(ndx, 1);
        onChange(newJoinList);
      }
    };
    const handleSwap = (ndx1, ndx2) => {
      if (
        onChange &&
        ndx1 >= 0 &&
        ndx2 >= 0 &&
        ndx1 < value.length &&
        ndx2 < value.length &&
        ndx1 !== ndx2
      ) {
        var newJoinList = [...value];
        const temp = newJoinList[ndx1];
        newJoinList[ndx1] = newJoinList[ndx2];
        newJoinList[ndx2] = temp;
        onChange(newJoinList);
      }
    };
    const handleMove = (ndx1, ndx2) => {
      if (ndx2 === "delete") {
        handleDelete(ndx1);
        return;
      }
      if (ndx1 < ndx2 && ndx2 >= 0) ndx2--;
      console.log("Movemdno" + ndx1 + "para" + ndx2);
      let list = value.splice(ndx1, 1);
      if (list.length) value.splice(ndx2, 0, list[0]);
      value = [...value];
      if (onChange) {
        onChange(value);
      }
    };
    const getKey = (val, ndx) => {
      const res = 
      ((typeof valueIdKey == "string")?val[valueIdKey]:
      (typeof valueIdKey == "function")?valueIdKey(val, ndx):null);

    if (!res) throw new Error("Can't find key in value. Make sure valueIdKey is set correctly.");
    return res;
    }

    if (!(value instanceof Array)) throw new Error("Value should be an Array");
    return (
      <>
        <DndProvider backend={HTML5Backend}>
          {value.map((val, ndx) => (
            <DroppableItem
              key={getKey(val, ndx)}
              ndx={ndx}
              style={{ display: "flex", width: "100%" }}
            >
              <DraggableItem key={ndx} ndx={ndx} onMove={handleMove}>
                <div style={{ flexGrow: 1, flexShrink: 1 }}>{ndx}
                  <OptionalAccordion
                    visible={
                      useAccordion === `auto`
                        ? value.length > 1
                        : !!useAccordion
                    }
                    title={
                      cbAccordionContent
                        ? cbAccordionContent(val, ndx)
                        : `Item ${ndx + 1}`
                    }
                  >
                    <ValueEditorComponent
                      key={ndx}
                      value={val}
                      onChange={(val) => {
                        var newValues = [...value];
                        newValues[ndx] = val;
                        onChange(newValues);
                      }}
                      {...otherProps}
                    />
                  </OptionalAccordion>
                </div>
              </DraggableItem>
            </DroppableItem>
          ))}

          <Button
            onClick={() => {
              handleAdd();
            }}
            size="small"
          >
            <Add fontSize={iconFontSize} />
            {newItemText}
          </Button>
          <DroppableDelete />
        </DndProvider>
      </>
    );
  };
  //Wrapped Component deve ter atributos: value=[] e onChnge
};
export default withListEditor;
