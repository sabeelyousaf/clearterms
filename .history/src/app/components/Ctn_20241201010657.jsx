import React from 'react'

export default function Ctn() {
  return (
    <div>
       <div className="bg-white shadow rounded-lg p-6 mb-8 w-100">
              <div className="flex flex-row items-center flex-wrap">
                <div className='w-full md:w/16 lg:w-1/6 '>
                <img className="mb-5 mob-center d-block m-auto me-3" 
  src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Google_Chrome_icon_%28February_2022%29.svg/768px-Google_Chrome_icon_%28February_2022%29.svg.png" 
  width="60" 
  alt="" 
/>

               </div>
               <div className="w-full md:w-3/5 lg:w-3/5 ms-3">
               <h2 className="text-xl font-semibold text-gray-700 mb-0">
               Clear terms for Google Chrome
                </h2>
                <p >Clear Terms google chrome extension offers text simplication, summarisation and translation directly on the web without uploading documents.</p>
               </div>
               <div className='w-full mt-5 lg:mt-0 md:mt-0 md:w-1/6 lg:w-1/6'>
               <button
            type="submit"
            className="px-5 ms-3 bg-indigo-600 text-white p-3 rounded-lg font-bold hover:bg-indigo-500 flex items-center  justify-center"
          >Install Extension For Free</button>
               </div>
              </div>
            </div>
    </div>
  )
}
