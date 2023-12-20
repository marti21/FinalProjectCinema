'use client'

import { createUserWithEmailAndPassword, loginWithCredentials, loginWithGitHub } from "@/firebase/client"
import useUser from "@/hooks/useUser"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Input } from "@nextui-org/react";
import { EyeFilledIcon } from "@/app/ui/login/EyeFilledIcon";
import { EyeSlashFilledIcon } from "@/app/ui/login/EyeSlashFilledIcon";
import { motion } from 'framer-motion';
import { notoSans } from '@/app/ui/fonts'
import {useTranslations} from 'next-intl';

export default function Home(){
    //loginWithCredentials('asdasd@gmail.com', '123456')
    //createUserWithEmailAndPassword('asdasd@gmail.com', '123456')
    const user = useUser()
    const router = useRouter()
    const [isVisible, setIsVisible] = useState(false);
    const [isVisible2, setIsVisible2] = useState(false);
    const [passwordsMessageError, setPasswordsMessageError] = useState('');
    const [open, setOpen] = useState(true);
    const [login, setLogin] = useState(true);

    const t = useTranslations('LoginRegister');

    const toggleVisibility = () => setIsVisible(!isVisible);
    const toggleVisibility2 = () => setIsVisible2(!isVisible2);

    function loginwithGitHub() {
        loginWithGitHub()
    }

    useEffect(() =>{
        user && router.replace('/dashboard')
    },[user])

    function comparePasswords(password1:string, password2:string){
        return password1 === password2
    }

    useEffect(() => {
        setIsVisible(false)
        setIsVisible2(false)
    },[login])

    const formLogin = (event:any) => {
        event.preventDefault();

        if(login){
            const email = event.target[0].value;
            const password = event.target[1].value;
            console.log(email, password)
            loginWithCredentials(email, password)
        }
        else{
            if(comparePasswords(event.target[1].value, event.target[3].value)){
                createUserWithEmailAndPassword(event.target[0].value, event.target[1].value)
            }
            else{
                setPasswordsMessageError("Passwords don't match")
            }
        }
    }

    return(
        <div className="min-h-screen min-y-screen flex items-center justify-center bg-white dark:bg-black">
            <motion.div className="w-[90%] h-[55vh] sm:w-[500px] sm:h-[500px] border-[0.5px] border-gray-300 rounded shadow-xl flex flex-col"
                key={login ? 'login' : 'register'}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
            >
                <div className="h-[25%] flex items-center justify-center">
                    {login ? <h1 className={`${notoSans.className} text-xl`}>{t('titleLogin')}</h1> : <h1 className="text-xl">{t('titleRegister')}</h1>}
                </div>
                <form onSubmit={formLogin} className="h-[55%] flex flex-col items-center justify-center w-full h-full gap-4">
                    <Input key='loginEmail' radius='sm' type="email" label={t('Email')} placeholder="" defaultValue="" labelPlacement='inside' className="text-black w-[80%]" />
                    <Input key='loginPwd' radius='sm' label={t('Password')} placeholder="" defaultValue="" labelPlacement='inside'  className="text-black w-[80%]" endContent={
                        <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                        {isVisible ? (
                            <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                ) : (
                                    <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                    )}
                                    </button>
                                }
                                type={isVisible ? "text" : "password"}
                            />

                    { !login &&
                        <Input key='registerPwd2' radius='sm' label={t('ConfirmPassword')} placeholder="" defaultValue="" labelPlacement='inside'  className="text-black w-[80%]" endContent={
                            <button className="focus:outline-none" type="button" onClick={toggleVisibility2}>
                            {isVisible2 ? (
                                <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                    ) : (
                                        <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                        )}
                                        </button>
                                    }
                            type={isVisible2 ? "text" : "password"}
                        />
                    }

                    <button type="submit" className="w-[80%] h-[30px] bg-red-200 rounded hover:bg-green-200">{t('Accept')}</button>
                    {login && <button onClick={loginwithGitHub}>GitHub</button>}
                </form>
                <div className="h-[20%] flex items-center justify-center">
                    {passwordsMessageError && <p>{passwordsMessageError}</p>}
                    { login ? <p className="text-sm">{t('HaventAccount')}</p> : <p className="text-sm">{t('HaveAccount')}</p>}
                    <a className="text-blue-200 cursor-pointer pl-1 text-sm" onClick={() => setLogin(!login)}>{t('Here')}</a>
                </div>
            </motion.div>
        </div>
    )
}