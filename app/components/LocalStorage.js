'use client';
import { useEffect, useState } from 'react';

export default function LocalStorage() {
    const [counter, setCounter] = useState(0);

    // Завантаження з localStorage при запуску
    useEffect(() => {
        const stored = localStorage.getItem('sharedCounter');
        if (stored !== null) {
        setCounter(parseInt(stored, 10));
        }
    }, []);

    // Слухати зміни в localStorage з інших вкладок
    useEffect(() => {
        const handleStorage = (e) => {
        if (e.key === 'sharedCounter') {
            setCounter(parseInt(e.newValue, 10));
        }
        };
        window.addEventListener('storage', handleStorage);
        return () => window.removeEventListener('storage', handleStorage);
    }, []);

    // Інкремент
    const increment = () => {
        const newValue = counter + 1;
        localStorage.setItem('sharedCounter', newValue);
        setCounter(newValue);
    }
    return(
        <div>
            <div className="text-2xl">{counter}</div>
            <button
                onClick={increment}
                className="cursor-pointer px-6 py-2 bg-gradient-to-r from-sky-500 via-blue-600
                to-indigo-500 text-white rounded-xl shadow-md hover:from-sky-400 hover:to-indigo-600 
                transition-colors duration-300"
                >
                +1
            </button>
        </div>
    )
}