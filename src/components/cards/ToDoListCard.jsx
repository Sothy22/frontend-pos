import { useState } from "react";

export default function ToDoListCard() {
    const [data, setData] = useState(["Apple", "Banana", "Mengo"]);

    return (
        <div>
            <h1>To Do List</h1>
            <input type="text" />
            <ul>
                {data.map((item, index) => {
                    <li key={index}>{item}</li>
                })}
            </ul>
        </div>
    )
}