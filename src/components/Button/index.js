import React from 'react';
import classNames from 'classnames/bind';
import styles from './Button.module.scss';
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles);
function Button({
    to,
    href,
    primary = false,
    outline = false,
    text = false,
    small = false,
    large = false,
    rounded = false,
    onClick,
    disabled,
    children,
    className,
    leftIcon,
    ...passProps
}) {
    let Comp = 'button';
    // neu co class primary , truyen them vao css module
    const classes = cx('wrapper', {
        primary,
        outline,
        small,
        large,
        text,
        disabled,
        rounded,
        [className]: className,
    });
    const props = {
        onClick,
        ...passProps,
    };
    // remove event listener when is disabled
    if (disabled) {
        // delete props.onClick;
        Object.keys(props).forEach((key) => {
            // console.log(key);
            if (key.startsWith('on') && typeof props[key] === 'function') {
                delete props[key];
            }
        });
    }
    // xử lí trường hợp nếu button là link nội bộ thì dùng router dom
    //  còn nếu là link đến trang khác thì dùng thẻ a
    if (to) {
        props.to = to;
        Comp = Link;
    } else if (href) {
        props.href = href;
        Comp = 'a';
    }
    return (
        <Comp className={classes} {...props}>
            {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
            <span className={cx('title')}>{children}</span>
        </Comp>
    );
}

export default Button;
