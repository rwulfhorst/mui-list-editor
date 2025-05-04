
declare module "mui-list-editor" {
    import {ElementType} from "react";

    export interface ListEditorProps<T> {
        value: T[];
        onChange: (value: T[]) => void;

    }


    type BoolAutoValue = "auto" | boolean | null | undefined;
    type CallbackAccordionContent = (val: unknown, ndx: number) => void;
    type GenericObject = { [key: string]: unknown };
    type ValueObject = GenericObject;
    type DefaultValueFn = () => ValueObject;
    type DefaultValue = ValueObject | DefaultValueFn | null | undefined;
    type ValueIdKeyFn = () => string;
    export default function withListEditor<T>(
        //Component: React.ComponentType<{ value: T; onChange: (value: ValueObject) => void}>,
        //Component: React.ElementType<{ value: T; onChange: (value: ValueObject) => void}>,
        Component: ElementType,
        defaultValue: DefaultValue,
        useAccordion: BoolAutoValue,
        newItemText: string,
        cbAccordionContent : CallbackAccordionContent,
        valueIdKey: string | ValueIdKeyFn
    ): React.ComponentType<ListEditorProps<T>>;

}
