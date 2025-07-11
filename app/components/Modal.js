'use client';
import { useEffect, useState } from 'react';
import emitter from '../lib/emitter';

export default function Modal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const show = () => setOpen(true);
    const hide = () => setOpen(false);
    emitter.on('openModal', show);
    emitter.on('closeModal', hide);
    return () => {
      emitter.off('openModal', show);
      emitter.off('closeModal', hide);
    };
  }, []);

  if (!open) return null;

  return (
    <div className="fixed inset-0 w-screen h-screen bg-black/50 flex justify-center items-start">
      <div className="p-5 bg-white rounded-2xl mt-[3vh]">
        <p className='p-5 min-w-[150px] flex justify-center'>Modal tab</p>
        <button className='bg-red-400 border-1 p-2 w-full rounded-2xl' onClick={() => emitter.emit('closeModal')}>Close</button>
      </div>
    </div>
  );
}
