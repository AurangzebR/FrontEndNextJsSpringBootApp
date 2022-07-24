import React from 'react'
import User from './User'
import { useState,useEffect } from 'react';
import EditUser from './EditUser';

const UserList = ({user}) => {
    const USER_API_BASE_URL="http://localhost:8080/api/v1/users";
   const [myUser, setmyUser] = useState(null);
    const [loading, setloading] = useState(true);

    const [userId, setuserId] = useState(null);
    const [responsedUser, setresponsedUser] = useState(null)

    useEffect(() => {
       const fetchData= async ()=>{
        setloading(true)
        try {
            const response = await fetch(USER_API_BASE_URL,{
                method:"GET",
                headers:{
                    "Content-Type":"application/json",
                },
            })
            const myUsers = await response.json();
            setmyUser(myUsers);
            
        } catch (error) {
            console.log(error)
            
        }
        setloading(false);
       };
       fetchData();
    }, [user,responsedUser]);

    const deleteUser = (e,id)=>{
        e.preventDefault();
        fetch(USER_API_BASE_URL+'/'+id,{
            method:"DELETE"
        }).then((res)=>{
            if(myUser){
                setmyUser((prevElemet)=>{return prevElemet.filter((user)=>user.id !==id)}
                    );
            }
        }
        )
    }

    const editUser = (e,id)=>{
        e.preventDefault();
        setuserId(id); }
    
  return (
    <>
    <div className='container mx-auto my-8 '>
        <div className='flex shadow border-b'>
            <table className='min-w-full'>
                <thead className='bg-gray-50'>
                    <tr>
                        <th className='text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-6'>First Name</th>
                        <th className='text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-6'>Last Name</th>
                        <th className='text-left font-medium text-gray-500 uppercase tracking-wide py-3 px-6'>Email Id</th>
                        <th className='text-right font-medium text-gray-500 uppercase tracking-wide py-3 px-6'>Actions</th>
                    </tr>
                </thead>
               
               {!loading && (
                <tbody>
                  {myUser?.map((user)=>(
                    <User user={user} key={user.id} deleteUser={deleteUser} editUser={editUser} />
                  ))}
                </tbody>
               )}       
                
                
            </table>
        </div>
    </div>
    <EditUser userId={userId} setresponseUser={setresponsedUser} />
    </>
  )
                  }

export default UserList