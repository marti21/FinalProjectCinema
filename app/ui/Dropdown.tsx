'use client'

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion"; 
import Link from "next/link";
import {Switch} from "@nextui-org/react";
import { userLogout } from "@/firebase/client";
import MenuIconSvg from "./MenuIconSvg";
import { useTheme } from 'next-themes'
import useUser from "@/hooks/useUser";

export default function Dropdown(){
    const [isOpen, setIsOpen] = useState(false)
    const [isSelected, setIsSelected] = useState(false)
    const dropdown = useRef<HTMLDivElement>(null)
    const { resolvedTheme, setTheme } = useTheme()
    const user = useUser()

    const manejarClicExterno = (event: MouseEvent) => {
        if (dropdown.current && !dropdown.current.contains(event.target as Node) && isOpen) {
            setIsOpen(false);
        } 
    };
    
    useEffect(() => {
        document.addEventListener('click', manejarClicExterno);

        return () => {
            document.removeEventListener('click', manejarClicExterno);
        };
    }, [isOpen]);


    useEffect(() => {
        if(resolvedTheme === 'dark'){
            setIsSelected(false)
        }
        else {
            setIsSelected(true)
        }
    },[resolvedTheme])

    function changeTheme(value:boolean){
        value ? setTheme('light') : setTheme('dark')
    }
    
    return (
        <div className="relative w-fit h-full flex items-center">
            <button onClick={() => setIsOpen(!isOpen)}><MenuIconSvg></MenuIconSvg></button>
            
            { isOpen &&
                <motion.div className="h-[260px] w-[200px] absolute top-[80%] left-[-240%] border rounded-md bg-black border-gray-500 pl-3 font-thin text-base text-gray-300 z-50" ref={dropdown}
                    initial={{ scale: 0, opacity: 0}}
                    animate={{ scale: 1, opacity: 1}}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                >
                    <div className="w-full h-full flex flex-col gap-3 justify-center items-start ">
                        <Link href="/" className="w-[90%] flex justify-between items-center hover:bg-gray-800 pl-2 rounded h-[30px] hover:text-white"> 
                            Mi cuenta
                        </Link>
                        
                        <div className="w-[90%] flex justify-between items-center pl-2 rounded h-[30px]">
                            <span className="text-sm">Dark Mode</span>
                            <Switch isSelected={isSelected} onValueChange={(value) => changeTheme(value)}/>
                        </div>

                        <Link href="/" className="w-[90%] flex justify-between items-center hover:bg-gray-800 pl-2 rounded h-[30px] hover:text-white"> 
                            Mi cuenta
                        </Link>
                        <Link href="/" className="w-[90%] flex justify-between items-center hover:bg-gray-800 pl-2 rounded h-[30px] hover:text-white"> 
                            Mi cuenta
                        </Link>
                        <div className="border-b border-gray-600 h-[0.5px] w-[80%] rounded pt-1"></div>
                        <button className="w-[90%] flex justify-between items-center hover:bg-gray-800 pl-2 rounded h-[30px] hover:text-white" onClick={() => userLogout()}>Log Out</button>
                    </div>
                </motion.div>
            }
        </div>
    )
}