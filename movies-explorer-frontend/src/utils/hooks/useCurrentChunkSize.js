import { useEffect, useState } from 'react';
import { tabletBreakpoint, mobileBreakpoint, desktopMoviesCount, tabletMoviesCount, mobileMoviesCount } from '../constants';

const getChunkSize = () => {
   // eslint-disable-next-line no-unused-vars
  let chunkSize


  if (window.innerWidth >= tabletBreakpoint) {
    return chunkSize = desktopMoviesCount
  } else if (window.innerWidth < tabletBreakpoint && window.innerWidth >=mobileBreakpoint){
    return chunkSize = tabletMoviesCount
  } else {
    return chunkSize = mobileBreakpoint
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