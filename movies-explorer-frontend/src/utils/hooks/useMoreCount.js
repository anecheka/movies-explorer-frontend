import { useEffect, useState } from 'react';
import { 
          TABLET_BREAKPOINT, 
          MOBILE_BREAKPOINT, 
          DESKTOP_MORE_COUNT,
          TABLET_MORE_COUNT,
          MOBILE_MORE_COUNT
       } from '../constants';

const getMoreCount = () => {
   // eslint-disable-next-line no-unused-vars
  let moreCount

  if (window.innerWidth >= TABLET_BREAKPOINT) {
    return moreCount = DESKTOP_MORE_COUNT
  } else if (window.innerWidth < TABLET_BREAKPOINT && window.innerWidth >=MOBILE_BREAKPOINT){
    return moreCount = TABLET_MORE_COUNT
  } else {
    return moreCount = MOBILE_MORE_COUNT
  }
}

export default function useMoreCount () {

  let [moreCount, setMoreCount] = useState(getMoreCount());

  useEffect(() => {

    let timeout = null;

    const resizeListener = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => setMoreCount(getMoreCount()), 150);
    };
    window.addEventListener('resize', resizeListener);
    return () => {
      window.removeEventListener('resize', resizeListener);
    }
  }, [])

  return moreCount;
}