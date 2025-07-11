'use client';
import { useRef, useState } from 'react';

export default function IframeCache() {
    const iframeRef = useRef(null);
    const [iframeMessage, setIframeMessage] = useState('');
    const acc = useRef("")
    const n = useRef(1)

    // Send to iframe
    const sendMessageToIframe = () => {
        iframeRef.current?.contentWindow.postMessage(
        { type: 'FROM_PARENT', text: iframeMessage },
        '*'
        );
    };

    // Receive from iframe
    if (typeof window !== 'undefined') {
        window.onmessage = (event) => {
        if (event.data?.type === 'FROM_IFRAME') {
            acc.current += `${n.current}. ${event.data.text}`+"<br>"
            n.current+=1
            document.getElementById("list").innerHTML = acc.current
        }
        };
    }

    return(
        <div>
            <input
                type="text"
                value={iframeMessage}
                onChange={e => setIframeMessage(e.target.value)}
                placeholder="Write text to save"
                className="px-3 py-2 border rounded-lg mr-5"
            />
            <button 
                className="cursor-pointer px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300" 
                onClick={sendMessageToIframe}>
                Save to Cache
            </button>
            <p id="list" className='max-w-[400px] mt-5 overflow-auto'></p>
            <iframe
                ref={iframeRef}
                src="Iframe.html"
                className="w-[400px] h-fit border border-black mt-5"
            />
        </div>
    )
}