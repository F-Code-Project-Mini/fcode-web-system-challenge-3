import { useEffect, useState } from "react";

const useIsMobile = (breakpoint = 768) => {
    const [isMobile, setIsMobile] = useState(() => {
        // đây là css media query (giống css mà đưa vô js thôi)
        return window.matchMedia(`(max-width: ${breakpoint - 1}px)`).matches;
    });

    // theo dõi mỗi lần màn hình thay đổi kích thước
    useEffect(() => {
        const handleChange = (e: MediaQueryListEvent) => {
            setIsMobile(e.matches);
        };
        const mql = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);

        mql.addEventListener("change", handleChange);
        return () => {
            mql.removeEventListener("change", handleChange);
        };
    }, [breakpoint]);
    
    return isMobile;
};
export default useIsMobile;
