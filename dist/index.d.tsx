
declare module "mui-list-editor" {
    import React, { ElementType } from "react";

    export interface ListEditorProps<T> {
        value: T[];
        onChange: (value: T[]) => void;

    }


    type BoolAutoValue = "auto" | boolean | null | undefined;
    type CallbackAccordionContent = (val: unknown, ndx: number) => void;
    type GenericObject = { [key: string]: unknown };
    type ValueObject = GenericObject;

    export default function withListEditor<T>(
        //Component: React.ComponentType<{ value: T; onChange: (value: ValueObject) => void}>,
        //Component: React.ElementType<{ value: T; onChange: (value: ValueObject) => void}>,
        Component: ElementType,
        defaultValue: ValueObject,
        useAccordion: BoolAutoValue,
        newItemText: string,
        cbAccordionContent : CallbackAccordionContent
    ): React.ComponentType<ListEditorProps<T>>;

}
