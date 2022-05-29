import axios from 'axios'
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
import { useDebounce } from '~/hooks';
import * as searchServices from '~/apiServices/searchServices';
const cx = classNames.bind(styles)

function Search() {
    const [searchValue, setSearchValue] = useState('')
    const [searchResult, setSearchResult] = useState([]);

    const [showResult, setShowResult] = useState(true)
    const [loading, setLoading] = useState(false)

        // lần 1: debounced là chuỗi rỗng ""
        // lần 2: h
     // lần 3: ho
     // khi đang gõ thì bị delay nên nó chưa kịp set value mới, vẫn
    // trả về chuỗi rỗng ở lần init đầu tiên

    const debounced = useDebounce(searchValue, 800);

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
        // go dau cach gui request thi return; luon
        // encodeURIComponent : ma hoa ki tu gay nham lan
        // nho dung sudo khi cai dat package

        if (!debounced.trim()) {
            setSearchResult([])
            return;
        }
        setLoading(true)
        // gọi api-----------------------
        searchServices.search(debounced)
            .then((res) => {
                setSearchResult(res)
                setLoading(false)
        } )
        // --------------------------end gọi api----------------
        // fetch(`https://tiktok.fullstack.edu.vn/api/users/search?q=${ encodeURIComponent( debounced)}&type=less`)
        //     .then(res => res.json())
        //     .then(res => {
        //         setSearchResult(res.data)
        //         setLoading(false)
        //     })
        //     .catch(() => {
        //     setLoading(false)
        // })
    }, [debounced]);
    return (
        <>
         <HeadlessTippy
                    interactive
                    visible={showResult && searchResult.length > 0}
                    render={(attrs) => (
                        <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                            <PopperWrapper>
                                <h4 className={cx('search-title')}>Accounts</h4>
                                {searchResult.map((result, index) => (
                                    <AccountItem key={ result.id} data={result} />

                                ))}
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
                    {/*  */}
                     {
                        !!searchValue && !loading && 
                        (
                            <button className={cx('clear')}
                                onClick={handleClear}
                            >
                                {/* {clear } */}
                                
                                     <FontAwesomeIcon icon={faCircleXmark} />
                                </button>
                        )} 
                    
                       
                    {/* loading */}
                    
                       {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}

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