import React from 'react';
import moment from 'moment';

interface InfoProps {
  osType: string;
  uptime: number;
  cpuModel: string;
  numsOfCores: number;
  cpuSpeed: number;
}

const Info: React.FC<InfoProps> = ({ osType, uptime, cpuModel, numsOfCores, cpuSpeed }) => {
  return (
    <div className='flex flex-col items-center justify-center bg-gray-100 rounded-lg shadow-lg p-6'>
      <div className='w-full'>
        <div className='flex justify-between items-center bg-white p-4 mb-4 rounded-lg shadow'>
          <h3 className='font-bold text-gray-700'>Operating System:</h3>
          <p className='text-gray-600'>{osType}</p>
        </div>

        <div className='flex justify-between items-center bg-white p-4 mb-4 rounded-lg shadow'>
          <h3 className='font-bold text-gray-700'>Time Online:</h3>
          <p className='text-gray-600'>{moment.duration(uptime, 'seconds').humanize()}</p>
        </div>

        <div className='bg-white p-4 rounded-lg shadow'>
          <h3 className='font-bold text-gray-700 mb-4'>Processor Information</h3>
          <div className='flex justify-between items-center mb-2'>
            <p className='font-semibold text-gray-700'>Type:</p>
            <p className='text-gray-600'>{cpuModel}</p>
          </div>
          <div className='flex justify-between items-center mb-2'>
            <p className='font-semibold text-gray-700'>Number of Cores:</p>
            <p className='text-gray-600'>{numsOfCores}</p>
          </div>
          <div className='flex justify-between items-center'>
            {/* <p className='font-semibold text-gray-700'>Clock Speed:</p> */}
            {/* <p className='text-gray-600'>{cpuSpeed} GHz</p> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Info;
