"use client";

import { Popover, PopoverTrigger, PopoverContent, Button } from "@nextui-org/react";
import { MdTune, MdOutlineArrowDropDown, MdOutlineArrowDropUp } from "react-icons/md";
import { useState } from "react";

export default function ReportFilterBtn() {
    const [expandedItems, setExpandedItems] = useState<boolean[]>([false, false, false]);

    const toggleItem = (index: number) => {
        const updatedItems = expandedItems.map((item, i) => (i === index ? !item : item));
        setExpandedItems(updatedItems);
    };

    return (
        <Popover placement="bottom-start" className="w-[90vw] md:w-[70vw] lg:w-[50vw]">
            <PopoverTrigger>
                <Button
                    variant="ghost"
                    className="bg-white shadow-lg rounded-full"
                >
                    <MdTune className="text-3xl" />
                </Button>
            </PopoverTrigger>
            <PopoverContent>
                <div className="w-full bg-white shadow-lg rounded-lg p-4">
                    <div className="accordion flex flex-col gap-7">
                        {/* Item 1 */}
                        <div className="border-b" aria-expanded={expandedItems[0]}>
                            <button
                                onClick={() => toggleItem(0)}
                                className="w-full flex justify-between items-center text-left py-2 text-lg  border-1 border-primary rounded-full p-4"
                            >
                                Especie
                                {expandedItems[0] ? <MdOutlineArrowDropUp className="text-4xl" /> : <MdOutlineArrowDropDown className="text-4xl" />}
                            </button>
                            <div className={`accordion-content ${expandedItems[0] ? 'block' : 'hidden'} p-2`}>
                                {/* Contenido personalizable */}
                                <p className="text-gray-700">Contenido de Especie</p>
                            </div>
                        </div>

                        {/* Item 2 */}
                        <div className="border-b" aria-expanded={expandedItems[1]}>
                            <button
                                onClick={() => toggleItem(1)}
                                className="w-full flex justify-between items-center text-left py-2 text-lg border-1 border-primary rounded-full p-4"
                            >
                                Accordion 2
                                {expandedItems[1] ? <MdOutlineArrowDropUp className="text-4xl" /> : <MdOutlineArrowDropDown className="text-4xl" />}
                            </button>
                            <div className={`accordion-content ${expandedItems[1] ? 'block' : 'hidden'} p-2`}>
                                <p className="text-gray-700">Contenido del Accordion 2</p>
                            </div>
                        </div>

                        {/* Item 3 */}
                        <div className="border-b" aria-expanded={expandedItems[2]}>
                            <button
                                onClick={() => toggleItem(2)}
                                className="w-full flex justify-between items-center text-left py-2 text-lg border-1 border-primary rounded-full p-4"
                            >
                                Accordion 3
                                {expandedItems[2] ? <MdOutlineArrowDropUp className="text-4xl" /> : <MdOutlineArrowDropDown className="text-4xl" />}
                            </button>
                            <div className={`accordion-content ${expandedItems[2] ? 'block' : 'hidden'} p-2`}>
                                <p className="text-gray-700">Contenido del Accordion 3</p>
                            </div>
                        </div>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
}
