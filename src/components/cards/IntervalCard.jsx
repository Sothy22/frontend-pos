import { useState, useEffect } from "react"

export default function IntervalCard() {

    const [count, setCount] = useState(0);

    useEffect(() => {
        // const interval = setInterval(() => {
        //     setCount((c) => c + 1);
        // }, 1000);

        // return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <h1>Interval Card</h1>
            <div>Count: {count}</div>
        </div>
    )
}
