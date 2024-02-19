import React, {FC, useEffect, useState} from "react";
import {Input} from "@material-tailwind/react";

type propsType = typeof Input["defaultProps"] & {
    onDone: (value: string) => any
}
export const  InputOnBlur = React.forwardRef(({ onDone, ...props }: propsType, ref ) => {
    const [value, setValue] = useState<string>(props.value+"" || "")

    useEffect(() => {
        console.log(value)
        // props.onSubmit()
    }, [value]);

    return (
        <Input
            {...props}
            value={value}
            onInput={(e) => setValue( e.currentTarget.value ) }
            onBlur={() => onDone(value) }
            crossOrigin={undefined}
        />
    )
})