import classNames from 'classnames';

import { forwardRef, useState } from 'react'
// forwardRef dung de truyen ref tu comp nay xuong cho tag img,
// de thz tippy ngoai kia co the use dc ref cua tag img
import images from '~/assets/images';
import styles from './Image.module.scss'
// console.log(images.noImage)
function Image({ src, alt, className,fallback : customFallback = images.noImage, ...props }, ref) {
    const [fallback, setFallback] = useState("");
    const handleError = () => {
        setFallback(customFallback)
    }
    // eslint-disable-next-line jsx-a11y/alt-text
    return <img className={classNames(styles.wrapper , className)} src={fallback || src} alt={alt} {...props} ref={ref}
    onError={handleError}
    />
}
export default forwardRef(Image);