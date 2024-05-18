// import React from 'react'
import moment from 'moment'

// const Info = ({info}:{info:{osType:string,uptime:number,cpuModel:string,numsOfCores:number,cpuSpeed:number}}) => {
//   const {osType,uptime,cpuModel,numsOfCores,cpuSpeed} = info
//   const formattedUptime =moment.duration(uptime, 'seconds').humanize();

//   console.log(formattedUptime);
//   return (
//     <div>
//       <div>
//         <h3>
//           Operating System
//         </h3>
//         <div>
//           {osType}
//         </div>
//       </div>
//       <div>
//         <h3>
//           Time Online 
//         </h3>
//         <div>
//           {formattedUptime}
//         </div>
//       </div>
//       <div>
//         <h3>
//           Processor Information
//         </h3>
//         <div>
//           Type: {cpuModel}
//         </div>
//         <div>
//           Number of Cores: {numsOfCores}
//         </div>
//         <div>
//           Clock Speed: {cpuSpeed}
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Info

import React, { useEffect, useRef } from 'react';

interface InfoProps {
  osType:string,uptime:number,cpuModel:string,numsOfCores:number,cpuSpeed:number
}

const Cpu: React.FC<InfoProps> = ({ osType,uptime,cpuModel,numsOfCores,cpuSpeed }) => {
  
      return (
    <div className='flex flex-col items-center '>
      <div>
        <h3>
          Operating System
        </h3>
        <div>
          {osType}
        </div>
      </div>

      <div>
        <h3>
          Time Online 
        </h3>
        <div>
          {moment.duration(uptime, 'seconds').humanize()}
        </div>
      </div>

      <div>
        <h3>
          Processor Information
        </h3>
        <div>
          Type: {cpuModel}
        </div>
        <div>
          Number of Cores: {numsOfCores}
        </div>
        <div>
          Clock Speed: {cpuSpeed}
        </div>
      </div>
      <div>

      </div>
    </div>
  )

  
}

export default Cpu;
