// import React, { useEffect, useRef } from 'react';
// import drawCircle from '../utils/canvasLoadAnimation';

// interface MemProps {
//   mem: {
//     memoryUsage: number;
//     freeMem: number;
//     totalMem: number;
//     usedMem: number;
//   };
// }

// const Mem: React.FC<MemProps> = ({ mem }) => {
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const { memoryUsage, freeMem, totalMem, usedMem } = mem;
//   const memoryUsageGB = ((usedMem / 1024) / 1024 / 1024).toFixed(2);
//   const totalMemoryGB = ((totalMem / 1024) / 1024 / 1024).toFixed(2);
//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (canvas) {
//       drawCircle(canvas, memoryUsage);
//     }
//   }, [memoryUsage]);

//   return (
//     <div>
//     <h3>Memory Usage</h3>
//     <div className='canvas-wrapper relative'>
//       <canvas ref={canvasRef} className='memCanvas'></canvas>
//       <div
//         className='text-lg font-bold text-black'
//       >
//         {memoryUsage} %
//       </div>
//       <div className=''>
//         <span>Total Memory: {totalMemoryGB} gb</span>
//         <span>Free Memory: {memoryUsageGB} gb</span>
//       </div>
//     </div>
//   </div>
  
//   );
// }

// export default Mem;

import React, { useEffect, useRef } from 'react';
import drawCircle from './canvasLoadAnimation';

interface MemoryInfo {
    memoryUsage: number;
    freeMem: number;
    totalMem: number;
    usedMem: number;
  }
  
  interface MemProps {
    mem?: MemoryInfo; // Make mem prop optional
  }
  

const Mem: React.FC<MemProps> = ({ mem }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  if (!mem) {
    return <div>Loading...</div>; // Handle the case where mem is undefined
  }

  const { memoryUsage, freeMem, totalMem, usedMem } = mem;
  const memoryUsageGB = ((usedMem / 1024) / 1024 / 1024).toFixed(2);
  const totalMemoryGB = ((totalMem / 1024) / 1024 / 1024).toFixed(2);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      drawCircle(canvas, memoryUsage);
    }
  }, [memoryUsage]);

  return (
    <div>
      <h3>Memory Usage</h3>
      <div className='canvas-wrapper relative flex items-center justify-center'>
        <canvas ref={canvasRef} className='memCanvas'></canvas>
        <div
          className='absolute text-lg font-bold text-black flex items-center justify-center'
          style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
        >
          {memoryUsage} %
        </div>
      </div>
      <div className='flex justify-between  flex-col gap-1 ml-5'>
        <div>
        <span>Total Memory: {totalMemoryGB}</span> GB
        </div>
        <div>
        <span>Free Memory: {memoryUsageGB}</span> GB
        </div>
      </div>
    </div>
  );
}

export default Mem;

