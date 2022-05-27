import Tippy from '@tippyjs/react/headless'; // different import path!
import classNames from 'classnames/bind';
import styles from './Menu.module.scss';
import {
    faCircleXmark,
    faEllipsisVertical,
    faMagnifyingGlass,
    faSignIn,
    faSpinner,
} from '@fortawesome/free-solid-svg-icons';
import MenuItem from './MenuItem';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import Header from './Header';
import { useState } from 'react';
const cx = classNames.bind(styles);
const defaultFn = () => {}
function Menu({ children, items = [], onChange = defaultFn }) {
    const [history, setHistory] = useState([{ data: items }])
    // console.log("history",history)
    const current = history[history.length - 1];
    // console.log("current", current)
    const renderItems = () => {
        return current.data.map((item, index) => {
            const isParent = !!item.children;

                
                // !! convert sang booolean
            return <MenuItem key={index} data={item} onClick={() => {
                if (isParent) {
                    // console.log(item.children)
                    setHistory(prev => [...prev, item.children])
                } else {
                    onChange(item)
                }
            }} />
        })
    
    };
    return (
        <Tippy
            interactive
            offset={[12, 8]}
            delay={[0, 700]}
            placement="bottom-end"
            render={(attrs) => (
                <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
                    <PopperWrapper className={cx('menu-popper')}>
                        {history.length > 1 && <Header title={'Language'} onBack={() => {
                            setHistory(prev => prev.slice(0,prev.length - 1))
                        }} />}
                        {renderItems()}
                    </PopperWrapper>
                </div>
            )}
            onHide={() => setHistory(prev => prev.slice(0, 1))}
        >
            {children}
        </Tippy>
    );
}

export default Menu;
