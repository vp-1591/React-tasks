'use client';
import { useEffect, useState } from 'react';

export default function Broadcast() {
    const [messages, setMessages] = useState([]);
    const [channel] = useState(() => new BroadcastChannel('my_channel'));
    const [broadcastMessage, setBroadcastMessage] = useState("")

    useEffect(() => {
        const handler = (event) => {
        setMessages((prev) => [...prev, "(Anon) " + event.data]);
        };
        channel.addEventListener('message', handler);
        return () => channel.close();
    }, [channel]);

    const sendMessage = () => {
        channel.postMessage(broadcastMessage);
        setMessages((prev) => [...prev, '(You) ' + broadcastMessage]);
    }

    return(
        <div className="flex flex-col items-center justify-center h-fit gap-4 mt-5">
            <div>
                <input
                    type="text"
                    value={broadcastMessage}
                    onChange={e => setBroadcastMessage(e.target.value)}
                    placeholder="Message my_channel"
                    className="w-[300px] px-3 py-2 border rounded-lg mr-[20px]"
                />
                <button
                    onClick={sendMessage}
                    className="cursor-pointer w-[80px] px-6 py-2 bg-gradient-to-bl from-green-300 to-emerald-500 
                    hover:from-green-400 hover:to-emerald-600
                    transition-colors duration-300 text-white rounded"
                >
                    Send
                </button>
            </div>
            <div className="w-[400px] h-[200px] border border-black mt-5 p-2 overflow-auto">
                {messages.map((msg, i) => (
                <p key={i} className="text-sm">
                    {msg}
                </p>
                ))}
            </div>
        </div>
    )
}