"use client";
import React, { useEffect, useState, useRef } from "react";
import { Scrollbars } from 'react-custom-scrollbars';
import { useStyles, NavigationInner, NavigationInner2} from "./style";
import ReceiveFundsPopup from "../ReceiveFunds/ReceiveFunds";
import axios from "axios";
import "../../css/sidebar.css";


interface Props {
    namefromApp: string;
};
const Sidebar: React.FC<Props>=({namefromApp})=>{
    const classes = useStyles();
    const [activeNav, setActiveNav] = useState<string>(namefromApp);

    const handleNavigation =(name: string)=> {
        if(name === 'bills-link'){
            if(activeNav === 'pay-bills' || activeNav === 'manage-bills'){
                document.getElementById('bills-link-dropdown')!.classList.toggle('show_second');
            }else{
                document.getElementById('bills-link')!.classList.toggle('linkWidthAfter');
                document.getElementById('bills-link')!.classList.toggle('linkWidthAfter2');
    
                document.getElementById('bills-link-dropdown')!.classList.toggle('show_second');
            };


        }else if(name === 'savings-link'){
            if(activeNav === 'savings-goal' || activeNav === 'emergency-savings' || activeNav === 'spend-and-save'){
                document.getElementById('savings-link-dropdown')!.classList.toggle('show_second');
            }else{

                document.getElementById('savings-link')!.classList.toggle('linkWidthAfter');
                document.getElementById('savings-link')!.classList.toggle('linkWidthAfter2');
    
                document.getElementById('savings-link-dropdown')!.classList.toggle('show_second');
            };
        }else if(name === 'finance-link'){
            if(activeNav === 'transaction-history' || activeNav === 'account-statement'){
                document.getElementById('finance-link-dropdown')!.classList.toggle('show_second');
            }else{

                document.getElementById('finance-link')!.classList.toggle('linkWidthAfter');
                document.getElementById('finance-link')!.classList.toggle('linkWidthAfter2');
    
                document.getElementById('finance-link-dropdown')!.classList.toggle('show_second');
            };
        }
        else{
            setActiveNav(name);
        };
    };
    const handleTopupOpen =()=>{
        const sidebarEl = document.getElementById('sidebar-wrapper-receive-funds');
        sidebarEl?.classList.add('show');
    };
    const handleLogout =()=>{
        const sessionToken = JSON.stringify(localStorage.getItem("session-token"));
        const url = process.env.NEXT_PUBLIC_CLOSE_SESSION || "";
        const homepageRedirect = process.env.NEXT_PUBLIC_WEBSITE_DOMAIN || "";
    
        const newFormData = new FormData();
        newFormData.append("token", sessionToken);
    
        axios
          .post(url, newFormData, { withCredentials: true })
          .then((response) => {
            localStorage.removeItem("session-token")
            window.location.replace(homepageRedirect);
          })
          .catch((error) => {
            console.error(error);
            localStorage.removeItem("session-token");
            window.location.replace(homepageRedirect);
          });
    }
    useEffect(()=>{
        switch (window.location.pathname) {
            case '/dashboard':
                setActiveNav('home')
                break;
            case '/dashboard/transfer-funds':
                setActiveNav('send-money')
                break;
            case '/dashboard/investments':
                setActiveNav('invest')
                break;
            case '/dashboard/investments/new':
                setActiveNav('invest')
                break;
            case '/dashboard/beneficiaries':
                setActiveNav('beneficiaries')
                break;
            case '/dashboard/transaction-history':
                setActiveNav('transaction-history')
                break;
            case '/dashboard/account-statement':
                setActiveNav('account-statement')
                break;
            case '/dashboard/manage-bills':
                setActiveNav('manage-bills')
                break;
            case '/dashboard/pay-bills':
                setActiveNav('pay-bills')
                break;
            case '/dashboard/account-settings':
                setActiveNav('settings')
                break;
        
            default:
                break;
        }
    });


const navRef = useRef<HTMLElement | null>(null);
const navOverlayRef = useRef<HTMLDivElement | null>(null);


      useEffect(() => {
        const checkWidth = () => {
          if (navRef.current && navOverlayRef.current) {
            if (window.innerWidth <= 650) {
              navRef.current.classList.add('active');
              navOverlayRef.current.classList.add('active');

            } else {
              navRef.current.classList.remove('active');
              navOverlayRef.current.classList.remove('active');

            }
          }
        };

        // Initial check
        checkWidth();

        // Add listener on resize
        window.addEventListener('resize', checkWidth);

        // Cleanup
        return () => {
          window.removeEventListener('resize', checkWidth);
        };
      }, []);

// Call this when user clicks overlay or close button
const closeSmallNav = () => {
  if (navRef.current) navRef.current.classList.add('active');
  if (navOverlayRef.current) navOverlayRef.current.classList.add('active');
};

// Call this to open sidebar (like from a menu button)
const openSmallNav = () => {
  if (window.innerWidth <= 650) {
    if (navRef.current) navRef.current.classList.remove('active');
    if (navOverlayRef.current) navOverlayRef.current.classList.remove('active');
  }
};



    return (
        <> 
            
            <div id="small-nav-overlay" ref={navOverlayRef} onClick={closeSmallNav}></div>

                <nav id="sidebar" ref={navRef} style={{overflow: 'visible'}} onClick={(e) => e.stopPropagation()}>
                        <NavigationInner >
                            <Scrollbars 
                                style={{transform: 'translateZ(-100px)'}}
                                autoHide
                                autoHideTimeout={1000}
                                autoHideDuration={200}>
                                <NavigationInner2>
                                    <div className={classes.imgHolder} style={{paddingBottom: '0'}}>
                                        <img src="/imgs/altlogo.png" alt="" style={{width: '70%'}}/>
                                    </div>


                                    <ul className={classes.ul}>

                                        <li className={classes.li} onClick={()=> handleNavigation('home')}>
                                            <a href="/" className={activeNav === 'home' ? classes.link : classes.linkWidthNoAfter}>
                                                <span style={{mask: 'url(/imgs/nav-icons/home.svg) no-repeat center left'}} className={activeNav === 'home' ? classes.linkSpanImg :  classes.linkSpanImgUnActive}></span>
                                                <span className={activeNav === 'home' ? classes.linkSpanText :  classes.linkSpanTextUnActive}>Home</span>
                                            </a>
                                        </li>
                                        


                                        <li className={classes.li} onClick={()=> handleNavigation('bills-link')}>
                                            <span id="bills-link" className={ activeNav === 'pay-bills' || activeNav === 'manage-bills' ? classes.link : 'linkWidthAfter'}>
                                                <span style={{mask: 'url(/imgs/nav-icons/bills.svg) no-repeat center left'}} className={activeNav === 'pay-bills' || activeNav === 'manage-bills' ? classes.linkSpanImg :  classes.linkSpanImgUnActive}></span>
                                                <span className={activeNav === 'pay-bills' || activeNav === 'manage-bills' ? classes.linkSpanText :  classes.linkSpanTextUnActive}>Bills</span>
                                            </span>
                                            <div id="bills-link-dropdown" className='dropdownMenu'>
                                                <form>
                                                    <a onClick={()=> handleNavigation('pay-bills')} className={activeNav === 'pay-bills' ? classes.dropdownItemActive : classes.dropdownItem} href="/elite-bank-app/pay-bills">Pay Bills</a>
                                                    <a onClick={()=> handleNavigation('manage-bills')} className={activeNav === 'manage-bills' ? classes.dropdownItemActive : classes.dropdownItem} href="/elite-bank-app/manage-bills">Manage Bills</a>
                                                </form>
                                            </div>
                                        </li>
                                        

                                        <li className={classes.li} onClick={handleTopupOpen}>
                                            <span className={activeNav === 'top-up' ? classes.link :  classes.linkWidthNoAfter}>
                                                <span style={{mask: 'url(/imgs/nav-icons/top-up.svg) no-repeat center left'}} className={activeNav === 'top-up' ? classes.linkSpanImg : classes.linkSpanImgUnActive}></span>
                                                <span className={activeNav === 'top-up' ? classes.linkSpanText : classes.linkSpanTextUnActive}>Receive Funds</span>
                                            </span>
                                        </li>


                                        <li className={classes.li} onClick={()=> handleNavigation('send-money')}>
                                            <a href="/elite-bank-app/transfer-funds" className={activeNav === 'send-money' ? classes.link : classes.linkWidthNoAfter}>
                                                <span style={{mask: 'url(/imgs/nav-icons/send.svg) no-repeat center left'}} className={activeNav === 'send-money' ? classes.linkSpanImg :  classes.linkSpanImgUnActive}></span>
                                                <span className={activeNav === 'send-money' ? classes.linkSpanText :  classes.linkSpanTextUnActive}>Send Money</span>
                                            </a>
                                        </li>


                                        <li className={classes.li} onClick={()=> handleNavigation('invest')}>
                                            <a href="/elite-bank-app/investments" className={activeNav === 'invest' || activeNav === 'invest-new' ? classes.link : classes.linkWidthNoAfter}>
                                                <span style={{mask: 'url(/imgs/nav-icons/invest.svg) no-repeat center left'}} className={activeNav === 'invest' || activeNav === 'invest-new' ? classes.linkSpanImg :  classes.linkSpanImgUnActive}></span>
                                                <span className={activeNav === 'invest' || activeNav === 'invest-new' ? classes.linkSpanText :  classes.linkSpanTextUnActive}>Investments</span>
                                            </a>
                                        </li>


                                        <li className={classes.li} onClick={()=> handleNavigation('beneficiaries')}>
                                            <a href="/elite-bank-app/beneficiaries" className={activeNav === 'beneficiaries' ? classes.link : classes.linkWidthNoAfter}>
                                                <span style={{mask: 'url(/imgs/nav-icons/beneficiaries.svg) no-repeat center left'}} className={activeNav === 'beneficiaries' ? classes.linkSpanImg :  classes.linkSpanImgUnActive}></span>
                                                <span className={activeNav === 'beneficiaries' ? classes.linkSpanText :  classes.linkSpanTextUnActive}>Beneficiaries</span>
                                            </a>
                                        </li>


                                        <li className={classes.li} onClick={()=> handleNavigation('finance-link')}>
                                            <span id="finance-link" className={ activeNav === 'transaction-history' || activeNav === 'account-statement' ? classes.link : 'linkWidthAfter'}>
                                                <span style={{mask: 'url(/imgs/nav-icons/bills.svg) no-repeat center left'}} className={activeNav === 'transaction-history' || activeNav === 'account-statement' ? classes.linkSpanImg :  classes.linkSpanImgUnActive}></span>
                                                <span className={activeNav === 'transaction-history' || activeNav === 'account-statement' ? classes.linkSpanText :  classes.linkSpanTextUnActive}>Finance</span>
                                            </span>
                                            <div id="finance-link-dropdown" className='dropdownMenu'>
                                                <form>
                                                    <a onClick={()=> handleNavigation('transaction-history')} className={activeNav === 'transaction-history' ? classes.dropdownItemActive : classes.dropdownItem} href="/elite-bank-app/transaction-history">Transaction History</a>
                                                    <a onClick={()=> handleNavigation('account-statement')} className={activeNav === 'account-statement' ? classes.dropdownItemActive : classes.dropdownItem} href="/elite-bank-app/account-statement">Account Statement</a>
                                                </form>
                                            </div>
                                        </li>
                                        

                                        <li className={classes.li} onClick={()=> handleNavigation('settings')}>
                                            <a href="/elite-bank-app/settings/account-setting" className={activeNav === 'settings' ? classes.link : classes.linkWidthNoAfter}>
                                                <span style={{mask: 'url(/imgs/nav-icons/settings.svg) no-repeat center left'}} className={activeNav === 'settings' ? classes.linkSpanImg :  classes.linkSpanImgUnActive}></span>
                                                <span className={activeNav === 'settings' ? classes.linkSpanText :  classes.linkSpanTextUnActive}>Settings</span>
                                            </a>
                                        </li>

                                        <hr />
                                        
                                        <li className={classes.li} style={{marginBottom: '0'}}>
                                            <a onClick={handleLogout} className={classes.linkWidthNoAfter}>
                                                <span style={{mask: 'url(/imgs/nav-icons/logout.svg) no-repeat center left'}} className={classes.linkSpanImgUnActive}></span>
                                                <span className={classes.linkSpanTextUnActive}>Log out</span>
                                            </a>
                                        </li>

                                    </ul>

                                </NavigationInner2> 
                            </Scrollbars>
                        </NavigationInner>
                    
                </nav>

            <ReceiveFundsPopup />
        </>
    )
};

export default Sidebar;