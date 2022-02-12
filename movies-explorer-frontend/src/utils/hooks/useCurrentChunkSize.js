import { useEffect, useState } from 'react';

const getChunkSize = () => {
   // eslint-disable-next-line no-unused-vars
  let chunkSize

  if (window.innerWidth >= 768) {
    return chunkSize = 7
  } else if (window.innerWidth < 768 && window.innerWidth >=320 ){
    return chunkSize = 6
  } else {
    return chunkSize = 5
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