'use client';

import { useEffect, useState } from 'react';

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);
  
  useEffect(() => {
    const media = window.matchMedia(query);
    
    // Update the state with the current value
    const listener = () => setMatches(media.matches);
    
    // Set the initial value
    listener();
    
    // Add the callback as a listener for changes to the media query
    media.addEventListener('change', listener);
    
    // Remove the listener when the hook is cleaned up
    return () => {
      media.removeEventListener('change', listener);
    };
  }, [query]);
  
  return matches;
}