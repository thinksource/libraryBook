import React, {useRef, useEffect,  ReactNode} from 'react'
import {createPortal} from 'react-dom';

export const Portal: React.FC<{ children: ReactNode }> = (props: { children: ReactNode }) => {

    let containerRef = useRef<HTMLDivElement | null>(null);
  
    if (!containerRef.current) {
      containerRef.current = document.createElement("div");
      document.body.appendChild(containerRef.current);
    }
  
    useEffect(() => {
      return function cleanup() {
        if (containerRef.current) {
          document.body.removeChild(containerRef.current);
        }
      };
    }, []);
  
    return createPortal(props.children, containerRef.current);
  };
