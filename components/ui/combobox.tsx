"use client";

import { PropsWithChildren, useState } from "react";
import { CommandEmpty, CommandGroup, CommandItem, Command as CommandPrimitive } from "cmdk"
import { Popover } from "./popover";
import { PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { Command } from "./command";
import { CommandInput } from "cmdk";
import { Button } from "./button";

interface ComboboxProps<T> extends React.ComponentProps<typeof CommandPrimitive.Input> {
    itemList: Item<T>[];
    renderItem: ( item: Item<T> ) => React.ReactNode;

    onChange?: ( value: Item<T> ) => void;
    emptyMessage?: string;
}

type Item<T> = {
    value: string;
} & T;

export default function Combobox<T>(props: PropsWithChildren<ComboboxProps<T>>) {
    const { itemList, emptyMessage = "", renderItem, ...inputProps } = props;

    const [open, setOpen] = useState(false);

    return <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
            <Button></Button>
        </PopoverTrigger>
        <PopoverContent>
            <Command>
                <CommandInput {...inputProps}  />
                <CommandEmpty>{emptyMessage}</CommandEmpty>
                <CommandGroup>
                    {itemList.map((item, index) => 
                        <CommandItem
                            key={index}
                            value={item.value}
                            onSelect={(currentValue) => {
                                setOpen(false);
                                props.onChange?.(item);
                            }}
                        >
                            {renderItem(item)}
                        </CommandItem>
                    )}
                </CommandGroup>
            </Command>
        </PopoverContent>
    </Popover>;
}