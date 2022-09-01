import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import images from '~/assets/images';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCircleQuestion,
    faCoins,
    faEarthAsia,
    faEllipsisVertical,
    faGear,
    faKeyboard,
    faSignOut,
    faUser,
} from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react'; // different import path!
import 'tippy.js/dist/tippy.css';
import { Link } from 'react-router-dom';

import routesConfig from '~/config/routes'

import Button from '~/components/Button';
import Menu from '~/components/Popper/Menu';
import { InboxIcon, MessageIcon, UploadIcon } from '~/components/Icons';
import Image from '~/components/Image';
import Search from '../Search';
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
                {
                    type: 'language', code: 'en', title: 'English'
                },
                {
                    type: 'language', code: 'en', title: 'English'
                },
                {
                    type: 'language', code: 'en', title: 'English'
                },
                {
                    type: 'language', code: 'en', title: 'English'
                },
                {
                    type: 'language', code: 'en', title: 'English'
                },
                {
                    type: 'language', code: 'en', title: 'English'
                },
                {
                    type: 'language', code: 'en', title: 'English'
                },
                {
                    type: 'language', code: 'en', title: 'English'
                },
                {
                    type: 'language', code: 'en', title: 'English'
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
    
    const handleMenuChange = (menuItem) => {
        // console.log(menuItem)
    }
    const currentUser = true;
    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                {/* logo */}
                <Link to={routesConfig.home} className={cx('logo-link')}>
                    <img src={images.logo} alt="tiktok" />
                </Link>
                {/* search */}
               <Search />
                <div className={cx('actions')}>
                    {currentUser ? (
                        <>
                            <Tippy content="Upload video"
                                placement='bottom'
                                delay={[0,50]}
                            >
                                <button className={cx('action-btn')}>
                                    <UploadIcon />
                                </button>
                           </Tippy>
                            {/* <button className={cx('action-btn')}>
                                <FontAwesomeIcon icon={faMessage}/>
                            </button> */}
                             <Tippy delay={[0, 50]} content="Message" placement="bottom">
                                <button className={cx('action-btn')}>
                                    <MessageIcon />
                                </button>
                            </Tippy>
                            <Tippy delay={[0, 50]} content="Inbox" placement="bottom">
                                <button className={cx('action-btn')}>
                                    <InboxIcon />
                                    <span className={cx('badge')}>12</span>
                                </button>
                            </Tippy>
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
                            // https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-giso/ea0854578085ab26effc2c7b8cefa270~c5_100x100.jpeg?x-expires=1653804000&x-signature=CGQadWk%2FMpIcneS2FdFxb2GY6oM%3D
                            <Image src='https://files.fullstack.edu.vn/f8-prod/user_avatars/1/623d4b2d95cec.png' className={cx('user-avatar')} alt="dao le phuong hoa"
                           
                            />
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
