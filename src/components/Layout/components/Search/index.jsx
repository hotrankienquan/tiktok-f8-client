import { useEffect, useState } from 'react';

import {
    faCircleXmark,
    faSpinner
} from '@fortawesome/free-solid-svg-icons';
import HeadlessTippy from '@tippyjs/react/headless'; // different import path!
import { Wrapper as PopperWrapper } from '~/components/Popper';
import AccountItem from '~/components/AccountItem';
import { SearchIcon } from '~/components/Icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import classNames from 'classnames/bind';
import styles from './Search.module.scss'
import { useRef } from 'react';
const cx = classNames.bind(styles)

function Search() {
    const [searchValue, setSearchValue] = useState('')
    const [searchResult, setSearchResult] = useState([]);

    const [showResult, setShowResult] = useState(true)

    const inputRef = useRef();
    const handleClear = () => {
        setSearchValue('')
        setSearchResult([])
        inputRef.current.focus()
    }
    const handleHideResult = () => {
        setShowResult(false)
    }
    useEffect(() => {
        setTimeout(() => {
            setSearchResult([1]);
        }, 3000);
    }, []);
    return (
        <>
         <HeadlessTippy
                    interactive
                    visible={showResult && searchResult.length > 0}
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
                onClickOutside={handleHideResult}
                >
                    <div className={cx('search')}>
                    <input
                    ref={inputRef}
                        placeholder="Search accounts and videos" spellCheck="false"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        onFocus={() => setShowResult(true)}
                    />
                        {!!searchValue && 
                        <button className={cx('clear')}
                            onClick={handleClear}
                        >
                            {/* {clear } */}
                            
                                <FontAwesomeIcon icon={faCircleXmark} />
                            </button>
                        }
                        {/* loading */}
                        {/* <FontAwesomeIcon className={cx('loading')} icon={faSpinner} /> */}

                        <button className={cx('search-btn')}>
                            {/* search */}
                            <SearchIcon />
                        </button>
                    </div>
                </HeadlessTippy>
        </>
      );
}

export default Search;