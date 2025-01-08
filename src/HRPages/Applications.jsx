import * as React from 'react';
import ApplicationCard from '../Components/ApplicationCard';



function Applications() {

    

  return (
    <div>
            <div className='border-2 border-green-500 rounded-xl bg-white m-4 w-[455px] '>
                <input type="search" className='w-96'/>
                <label htmlFor="Search" className='text-green-700'>Search</label>
            </div>

            <div className=''>
                <ApplicationCard/>
            </div>
        
    </div>
  )
}

export default Applications