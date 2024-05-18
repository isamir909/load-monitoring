
// import React, { useEffect, useRef } from 'react';
// import drawCircle from './canvasLoadAnimation';

// interface MemProps {
//      memoryUsage: number;
//     freeMem: number;
//     totalMem: number;
//     usedMem: number;
// }

// const Mem: React.FC<MemProps> = ({ memoryUsage,freeMem, totalMem,usedMem}) => {
//   const canvasRef = useRef<HTMLCanvasElement>(null);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (canvas) {
//       try {
//         drawCircle(canvas, memoryUsage);
//       } catch (error) {
//         console.error("Error drawing Memory load:", error);
//       }
//     }
//   }, [memoryUsage]);
  

//   return (
//     <div className='col-sm-3 cpu mb-3'>
//       <h3>Memory Usage</h3>
//       <div className='canvas-wrapper relative flex items-center justify-center'>
//         <canvas ref={canvasRef} className='memCanvas'></canvas>
//         <div
//           className='absolute text-lg font-bold text-black flex items-center justify-center'
//           style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
//         >
//           {memoryUsage} %
//         </div>
//       </div>
//       <div className='flex justify-between  flex-col gap-1 ml-5'>
//         <div>
//         <span>Total Memory: {((totalMem / 1024) / 1024 / 1024).toFixed(2)}</span> GB
//         </div>
//         <div>
//         <span>Free Memory: {((usedMem / 1024) / 1024 / 1024).toFixed(2)}</span> GB
//         </div>
//     </div>
//     </div>
//   );
// }

// export default Mem;

import React, { useEffect, useRef } from 'react';
import drawCircle from '../utils/canvasLoadAnimation';

interface MemProps {
  memoryUsage: number;
  freeMem: number;
  totalMem: number;
  usedMem: number;
}

const Mem: React.FC<MemProps> = ({ memoryUsage, freeMem, totalMem, usedMem }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') { // Check if running in the browser
      const canvas = canvasRef.current;
      if (canvas) {
        try {
          drawCircle(canvas, memoryUsage);
        } catch (error) {
          console.error("Error drawing Memory load:", error);
        }
      }
    }
  }, [memoryUsage]);

  return (
    <div className='col-sm-3 cpu mb-3 flex flex-col items-center mr-5'>
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
      <div className='flex justify-between flex-col gap-1 ml-5'>
        <div>
          <span>Total Memory: {((totalMem / 1024 / 1024 / 1024).toFixed(2))}</span> GB
        </div>
      
        <div>
          <span>Used Memory: {((usedMem / 1024 / 1024 / 1024).toFixed(2))}</span> GB
        </div>
      </div>
    </div>
  );
}

export default Mem;
