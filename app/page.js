'use client';

import Modal from './components/Modal';
import emitter from './lib/emitter';
import Container from './components/Container';
import LocalStorage from './components/LocalStorage';
import IframeCache from './components/IframeCache';
import Broadcast from './components/Broadcast';
import Link from 'next/link';

export default function HomePage() {
  
  return (
    <div className='max-w-xs sm:max-w-md mx-auto'>
      <Container title="Modal Box">
        <button className="cursor-pointer px-6 py-3 bg-gradient-to-r from-cyan-400 to-emerald-300 text-white font-semibold rounded-xl shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-300" 
          onClick={() => emitter.emit('openModal')}>
          Open Modal
        </button>
        <Modal emitter={emitter}/>
      </Container>
      
      <Container title="Iframe/Parent">
        <IframeCache></IframeCache>
      </Container>

      <Container title="Broadcast messages">
        <Broadcast></Broadcast>
      </Container>

      <Container title="localStorage">
        <LocalStorage></LocalStorage>
      </Container>

      <Container title="Youtube search API">
        <Link className='underline' href="pages/ytSearch">Youtube search page</Link>
      </Container>
    </div>
  );
}