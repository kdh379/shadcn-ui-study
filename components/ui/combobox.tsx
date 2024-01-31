"use client";

import { PropsWithChildren, useState } from "react";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import * as PopoverPrimitive from "@radix-ui/react-popover"
import { Command as CommandPrimitive } from "cmdk"

interface ComboboxProps<T> extends 
    React.ComponentProps<typeof CommandPrimitive.Input>,
    Pick<PopoverPrimitive.PopoverContentProps, "side" | "align">{
    itemList: Item<T>[];
    renderItem: ( item: Item<T>, active: boolean ) => React.ReactNode;

    className?: string;
    emptyMessage?: string;
    onChange?: ( item: Item<T> ) => void;
}

type Item<T> = {
    value: string;
} & T;

export default function Combobox<T>(props: PropsWithChildren<ComboboxProps<T>>) {
    const {
        itemList,
        className,
        children,
        emptyMessage = "",
        side = "bottom",
        align = "start",
        renderItem,
        ...inputProps } = props;

    const [open, setOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<Item<T> | null>(null);

    return <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
            {children}
        </PopoverTrigger>
        <PopoverContent className={className}  side={side} align={align}>
            <Command>
                <CommandInput {...inputProps}  />
                <CommandEmpty>{emptyMessage}</CommandEmpty>
                <CommandGroup>
                    {itemList.map((item, index) => 
                        <CommandItem
                            key={index}
                            value={item.value}
                            onSelect={() => {
                                setOpen(false);
                                setSelectedItem(item);
                                props.onChange?.(item);
                            }}
                        >
                            {renderItem(item, selectedItem === item)}
                        </CommandItem>
                    )}
                </CommandGroup>
            </Command>
        </PopoverContent>
    </Popover>;
}