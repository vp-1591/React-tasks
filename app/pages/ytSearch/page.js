'use client'
import { useState, useRef } from "react"

export default function YoutubeSearch() {
  const [searchText, setSearchText] = useState("")
  const [results, setResults] = useState([])

  const [timeout, setCustomTimeout] = useState(null)

  const abortControllerRef = useRef(null);

  const sendAPIRequest = async () => {

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;

    const url = `https://youtube138.p.rapidapi.com/search/?q=${encodeURIComponent(searchText)}&hl=en&gl=US`; // Replace with your actual URL
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': '5a4c52ea68msh7be89b7a18a70e1p107a1bjsnb98c824e43d5', // Replace with your key
          'X-RapidAPI-Host': 'youtube138.p.rapidapi.com' // Replace with your host, e.g. 'youtube-search-and-download.p.rapidapi.com'
        },
        signal: controller.signal 
      });
      console.log("Sending request")
      const data = await response.json();
      const videoResults = (data.contents || []).filter(item => item.video);
      setResults(videoResults);
    } catch (err) {
      if (err.name === "AbortError") {
        // Запит було скасовано — це нормальна поведінка
        console.log("Previous request aborted");
      } else {
        console.error("Fetch error:", err);
      }
    }
  }
  
  function debounce(fn, delay) { // send repeated API requests at limited rate
    return (...args) => {
      [!timeout || clearTimeout(timeout)]
      setCustomTimeout(setTimeout(() => fn(...args), delay))
    };
  }

  const debouncedSendAPIRequest = debounce(sendAPIRequest,500)

  return (
    <div className="mt-[5vh]">
      <h1 className="font-mono text-red-600">YOUTUBE API</h1>
      <input
          type="text"
          value={searchText}
          onChange={e => {
            setSearchText(e.target.value)
            debouncedSendAPIRequest()
          }
          }
          placeholder="React tutorial"
          className="w-[300px] px-3 py-2 border rounded-lg mr-[20px]"
      />
      <div className="mt-6">
        {results.map((item, idx) => (
          <div key={idx} className="mb-4">
            <div className="font-bold">Title: {item.video.title}</div>
            <div>Author: {item.video.author.title}</div>
          </div>
        ))}
      </div>
    </div>
  )
}