import React, {ReactNode, useRef} from 'react'
import { createPortal } from 'react-dom';

export const Portal: React.FC<{children: ReactNode}> = ({ children }) => {
    let containerRef = useRef<HTMLDivElement | null>(document.querySelector("#root"));

    if (!containerRef.current) {
        containerRef.current = document.createElement("div");
        document.body.appendChild(containerRef.current);
    }
  
    // 当组件销毁时，移除 container 节点
    // useEffect(() => {
    //   return function cleanup() {

    //     if (containerRef.current) {
    //       containerRef.current.remove();
    //     }
    //   };
    // }, []);

    return createPortal(children, containerRef.current);
  };
  