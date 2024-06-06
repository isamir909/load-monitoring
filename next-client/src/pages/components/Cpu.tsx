import React, { useEffect, useRef } from 'react';
import drawCircle from '../utils/canvasLoadAnimation';

interface CpuProps {
  cpuLoad: number;
}

const Cpu: React.FC<CpuProps> = ({ cpuLoad }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') { // Check if running in the browser
      const canvas = canvasRef.current;
      if (canvas) {
        try {
          drawCircle(canvas, cpuLoad);
        } catch (error) {
          console.error("Error drawing CPU load:", error);
        }
      }
    }
  }, [cpuLoad]);

  return (
    <div className='col-sm-3 cpu mb-3 flex flex-col items-center mr-5 p-6'>
      <h3>CPU Load</h3>
      <div className='canvas-wrapper relative'>
        <canvas ref={canvasRef} className='canva'></canvas>
        <div
          className='absolute inset-0 flex items-center justify-center text-lg font-bold text-black'
        >
          {cpuLoad} %
        </div>
      </div>
    </div>
  );
}

export default Cpu;
