import React from 'react'
import { useState } from 'react';

const User = ({ user,deleteUser,editUser }) => {
    
  return (
   
 <tr key={user.id}>
                        
                        <td className='text-left px-6 py-4 whitespace-nowrap'>
                            <div className='text-sm text-gray-500'>{user.firstName}</div>
                        </td>
                        <td className='text-left px-6 py-4 whitespace-nowrap'>
                            <div className='text-sm text-gray-500'>{user.lastName}</div>
                        </td>
                        <td className='text-left px-6 py-4 whitespace-nowrap'>
                            <div className='text-sm text-gray-500'>{user.emailId}</div>
                        </td>
                        <td className='text-right px-6 py-4 whitespace-nowrap'>
                            <div className='text-sm text-gray-500'>
                                <button 
                                onClick={(e,id)=> editUser(e,user.id)}
                                className='text-white bg-indigo-500 hover:bg-indigo-800 px-4'>Edit</button>
                                <button 
                                onClick={(e,id)=>deleteUser(e,user.id)}
                                className='bg-red-500 text-white hover:bg-red-800 px-4'>Delete</button>
                            </div>
                        </td>
                    </tr>


  )
}

export default User