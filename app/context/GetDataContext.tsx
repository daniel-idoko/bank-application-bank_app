'use client'
import { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";


interface UserDashBoardData {
    email: string;
    firstname: string;
    lastname: string;
    middlename: string;
    accountnumber: number;
    balance: number;
    hidebalance: boolean;
    accounttype: string;
    message: string;
    messagecode: number;

    phonenumber: string;
    gender: string;
    dateofbirth: string;
    bvn: string;

}
interface UserProviderProps {
    children: ReactNode;
}
interface ContextProps {
    dashboardData: UserDashBoardData; 
    pageLoading: boolean;
    setPageLoading: any;
    setDashBoardData: any;
}

const GetDataContext = createContext<ContextProps | undefined>(undefined);


export function GetDataProvider({ children }: UserProviderProps) {
    const router = useRouter();
    const [dashboardData, setDashBoardData] = useState<UserDashBoardData>({
      email: 'johndoe@gmail.com', 
      firstname: 'John', 
      lastname: 'Doe', 
      middlename: 'Q', 
      accountnumber: 1234567890, 
      balance: 200000, 
      hidebalance: false, 
      accounttype: 'saving', 
      message: 'Kindly visit the bank as soon as possible', 
      messagecode: 1, 
      phonenumber: '1109283729', 
      gender: 'male', 
      dateofbirth: '02-04-2002', 
      bvn: '9128889128919289'});
      const [pageLoading, setPageLoading] = useState(true);


        useEffect(() => {
            const timeout = setTimeout(() => {
              setPageLoading(false);
            }, 2000); // 3 seconds

            return () => clearTimeout(timeout); // cleanup if component unmounts
          }, []);


    return(
        <GetDataContext.Provider value={{dashboardData, pageLoading, setPageLoading, setDashBoardData}}>
            {children}
        </GetDataContext.Provider>
    )
};

export function useGetData() {
    const context = useContext(GetDataContext);

    if (!context) {
        throw new Error('Empty data context');
    }
    return context;
};