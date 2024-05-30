// import Image from 'next/image'
// import React from 'react'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUser } from '@fortawesome/free-solid-svg-icons';
// import { faGithub } from '@fortawesome/free-brands-svg-icons';

// const Header = () => {
//   return (
//     <div className='border-b-2 border-white h-16 flex justify-between items-center px-6'>
//     <div className='flex items-center'>
//       <Image
//         src="/logo.png"
//         alt="logo"
//         priority
//         width={100}
//         height={100}
//         className="object-cover scale-150 ml-12"
//       />
//     </div>
//     <div>

//       <ul className='flex gap-10 mr-12'>
//         <li>
//           <a href="mailto:your-email@example.com" className='flex  gap-4 items-center justify-center'>
//             <FontAwesomeIcon icon={faUser} className='mr-2' />
//             <span>About Me</span>
//           </a>
//         </li>
//         <li>
//           <a href="https://www.example.com" className='flex items-center'>
//             <FontAwesomeIcon icon={faGithub} className='mr-2' />Source Code 
//           </a>
//         </li>
//       </ul>
//     </div>
//   </div>
//   )
// }

// export default Header



// import Image from 'next/image';
// import React from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUser } from '@fortawesome/free-solid-svg-icons';
// import { faGithub } from '@fortawesome/free-brands-svg-icons';

// const Header = () => {
//   return (
//     <div className='border-b-2 border-white h-16 flex justify-between items-center px-6'>
//       <div className='flex items-center'>
//         <Image
//           src="/logo.png"
//           alt="logo"
//           priority
//           width={100}
//           height={100}
//           className="object-cover scale-150 ml-12"
//         />
//       </div>
//       <div>
//         <ul className='flex gap-10 mr-12'>
//           <li>
//             <a href="mailto:your-email@example.com" target="_blank" rel="noopener noreferrer" className='flex gap-4 items-center justify-center'>
//               <FontAwesomeIcon icon={faUser} className='mr-2' />
//               <span>About Me</span>
//             </a>
//           </li>
//           <li>
//             <a href="https://www.example.com" target="_blank" rel="noopener noreferrer" className='flex items-center'>
//               <FontAwesomeIcon icon={faGithub} className='mr-2' />Source Code 
//             </a>
//           </li>
//         </ul>
//       </div>
//     </div>
//   );
// }

// export default Header;


import Image from 'next/image';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

const Header = () => {
  return (
    <div className='border-b-2 border-white h-16 flex justify-between items-center px-6'>
      <div className='flex items-center'>
        <Image
          src="/logo.png"
          alt="logo"
          priority
          width={100}
          height={100}
          className="object-cover scale-150 ml-12"
        />
      </div>
      <div>
        <ul className='flex gap-10 mr-12 items-center justify-center'>
          <li>
            <a href="https://samirlohiya.netlify.app/" target="_blank" rel="noopener noreferrer" className='flex gap-4 items-center justify-center'>
              <FontAwesomeIcon icon={faUser} className='mr-2 h-6 w-6' />
              <span className='whitespace-nowrap'>About Me</span>
            </a>
          </li>
          <li>
            <a href="https://github.com/isamir909/load-monitoring" target="_blank" rel="noopener noreferrer" className=' flex '>
              <FontAwesomeIcon icon={faGithub} className='h-7 w-7 mr-2' />
              <span className='whitespace-nowrap'>
              Source Code 
                </span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Header;
