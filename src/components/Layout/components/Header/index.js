import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import images from '~/assets/images';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCircleQuestion,
    faCircleXmark,
    faCloudUpload,
    faCoins,
    faEarthAsia,
    faEllipsisVertical,
    faGear,
    faKeyboard,
    faMagnifyingGlass,
    faMessage,
    faSignIn,
    faSignOut,
    faSpinner,
    faUser,
} from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react'; // different import path!
import HeadlessTippy from '@tippyjs/react/headless'; // different import path!
import 'tippy.js/dist/tippy.css';

import { Wrapper as PopperWrapper } from '~/components/Popper';
import AccountItem from '~/components/AccountItem';
import Button from '~/components/Button';
import Menu from '~/components/Popper/Menu';
const cx = classNames.bind(styles);
// console.log(images);
const MENU_ITEMS = [
    {
        icon: <FontAwesomeIcon icon={faEarthAsia} />,
        title: 'English',
        children: {
            title: 'Language',
            data: [
                {
                    type: 'language', code: 'en', title: 'English'
                },
                {
                    type: 'language',
                    code: 'vi', title: 'Vietnamese',
                    //gia su co them cap 3
                    // children: {
                    //     title: 'Language',
                    //     data: [
                    //         {code: 'en', title: 'English'},
                    //         {code: 'vi', title: 'Vietnamese'},
                    //     ]
                    // }
                },
            ]
        }
    },
    {
        icon: <FontAwesomeIcon icon={faCircleQuestion} />,
        title: 'Feedback and Help',
        to: '/feedback',
    },
    {
        icon: <FontAwesomeIcon icon={faKeyboard} />,
        title: 'Keyboard Shortcuts',
    },
];
const userMenu = [
     {
        icon: <FontAwesomeIcon icon={faUser} />,
        title: 'View profile',
        to: '/@hoaa',
    },
      {
        icon: <FontAwesomeIcon icon={faCoins} />,
        title: 'Get coins',
        to: '/coin',
    },
      {
        icon: <FontAwesomeIcon icon={faGear} />,
        title: 'Settings',
        to: '/settings',
    },
    ...MENU_ITEMS,
     {
        icon: <FontAwesomeIcon icon={faSignOut} />,
        title: 'Log out',
         to: '/logout',
        separate: true
    }
]
function Header() {
    const [searchResult, setSearchResult] = useState([]);
    // useEffect(() => {
    //     setTimeout(() => {
    //         setSearchResult([1, 2, 3]);
    //     }, 3000);
    // }, []);
    const handleMenuChange = (menuItem) => {
        // console.log(menuItem)
    }
    const currentUser = true;
    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                {/* logo */}
                <div className={cx('logo')}>
                    <img src={images.logo} alt="tiktok" />
                </div>
                {/* search */}
                <HeadlessTippy
                    interactive
                    visible={searchResult.length > 0}
                    render={(attrs) => (
                        <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                            <PopperWrapper>
                                <h4 className={cx('search-title')}>Accounts</h4>
                                <AccountItem />
                                <AccountItem />
                                <AccountItem />
                            </PopperWrapper>
                        </div>
                    )}
                >
                    <div className={cx('search')}>
                        <input placeholder="Search accounts and videos" spellCheck="false" />
                        <button className={cx('clear')}>
                            {/* {clear } */}
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                        {/* loading */}
                        <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />

                        <button className={cx('search-btn')}>
                            {/* search */}
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </button>
                    </div>
                </HeadlessTippy>
                <div className={cx('actions')}>
                    {currentUser ? (
                        <>
                            <Tippy content="Upload video"
                                placement='bottom'
                                delay={[0,200]}
                            >
                                <button className={cx('action-btn')}>
                                    <FontAwesomeIcon icon={faCloudUpload}/>
                                </button>
                           </Tippy>
                            {/* <button className={cx('action-btn')}>
                                <FontAwesomeIcon icon={faMessage}/>
                            </button> */}
                        </>
                    ): (
                        <>
                             {/* children chinh la noi dung o giua 2 the <Button></Button> */}
                        {/* <Button href="https://www.tiktok.com/" primary target="_blank">
                            Login
                        </Button> */}
                        <Button text>Upload</Button>

                        <Button primary>Login</Button>
                            </>
                ) }
                    <Menu items={currentUser ? userMenu : MENU_ITEMS} onChange={handleMenuChange}>
                        {currentUser ? (
                            <img src='https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-giso/ea0854578085ab26effc2c7b8cefa270~c5_100x100.jpeg?x-expires=1653804000&x-signature=CGQadWk%2FMpIcneS2FdFxb2GY6oM%3D' className={ cx('user-avatar')} alt="dao le phuong hoa" />
                        ): (
                            

                            <button className={cx('more-btn')}>
                            <FontAwesomeIcon icon={faEllipsisVertical} />
                            </button>
                            )}
                        </Menu>
                </div>
            </div>
        </header>
    );
}

export default Header;
