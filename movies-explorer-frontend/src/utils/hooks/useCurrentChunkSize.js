import { useEffect, useState } from 'react';
import { TABLET_BREAKPOINT, MOBILE_BREAKPOINT, DESKTOP_MOVIES_COUNT, TABLET_MOVIES_COUNT, MOBILE_MOVIES_COUNT } from '../constants';

const getChunkSize = () => {
   // eslint-disable-next-line no-unused-vars
  let chunkSize


  if (window.innerWidth >= TABLET_BREAKPOINT) {
    return chunkSize = DESKTOP_MOVIES_COUNT
  } else if (window.innerWidth < TABLET_BREAKPOINT && window.innerWidth >=MOBILE_BREAKPOINT){
    return chunkSize = TABLET_MOVIES_COUNT
  } else {
    return chunkSize = MOBILE_MOVIES_COUNT
  }
}

export default function useCurrentChunkSize () {

  let [chunkSize, setChunkSize] = useState(getChunkSize());

  useEffect(() => {

    let timeout = null;

    const resizeListener = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => setChunkSize(getChunkSize()), 150);
    };
    window.addEventListener('resize', resizeListener);
    return () => {
      window.removeEventListener('resize', resizeListener);
    }
  }, [])

  return chunkSize;
}