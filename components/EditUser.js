import React from 'react'

import { useState,useEffect,Fragment } from 'react';
import { Transition,Dialog } from '@headlessui/react';

const EditUser = ({userId, setresponseUser}) => {

    const USER_API_BASE_URL="http://localhost:8080/api/v1/users";
    let [isOpen, setIsOpen] = useState(false)

    function closeModal() {
        setIsOpen(false)
      }
    
      function openModal() {
        setIsOpen(true)
      }
    
      const handleChange= (event)=>{
        const value = event.target.value;
        setuser({...user,[event.target.name]:value})
      }
    
      const [user, setuser] = useState({
        id:"",
        firstName:"",
        lastName:"",
        emailId:"",
      });

      useEffect(() => {
    
       const fetchData = async ()=>{
        
        try {
            const res = await fetch(USER_API_BASE_URL+"/"+userId,{
                method:"GET",
                headers:{
                    "Content-Type":"application/json",
                },
            });
            const _user= await res.json();
       setuser(_user);
       setIsOpen(true);
       
        } catch (error) {
            console.log(error)
            
        }}
       if(userId){
        fetchData();
    }
       
       
      }, [userId]);

      const resetForm = (e)=>{
        e.preventDefault();
          setIsOpen(false)
      }

      const updateUser= async (e)=>{
        e.preventDefault();
       
       
        const res = await fetch(USER_API_BASE_URL+"/"+userId,{
            method:"PUT",
            headers:{
                "Content-Type":"application/json",
            },body: JSON.stringify(user),
        });
        if(!res.ok){
            throw new Error("somethong went wrong;")
        }
const _user = await res.json();
setresponseUser(_user);
resetForm(e);
       
      }


  return (
   
    <Transition appear show={isOpen} as={Fragment}>
    <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={closeModal}>
     
      <div className="fixed inset-0 overflow-y-auto ">
        <div className="flex min-h-full items-center justify-center p-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 "
            enterTo="opacity-100 "
            leave="ease-in duration-200"
            leaveFrom="opacity-100 "
            leaveTo="opacity-0"
          >
            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
              <Dialog.Title
                as="h3"
                className="text-lg font-medium leading-6 text-gray-900"
              >
                Add new User
              </Dialog.Title>
              <div className="flex max-w-md max-auto">
                <div className="py-2">
                  <div className="h-14 my-4">
                    <label className="block text-gray-600 text-sm font-normal">First Name</label>
                    <input type="text" name="firstName" value={user.firstName}
                    onChange={ (e)=> handleChange(e)}
                    className="h-10 w-96 border mt-2 px-2 py-2"></input>
                    </div> 
                    <div className="h-14 my-4">
                    <label className="block text-gray-600 text-sm font-normal">Last Name</label>
                    <input type="text" name="lastName" value={user.lastName} 
                    onChange={ (e)=> handleChange(e)}
                    className="h-10 w-96 border mt-2 px-2 py-2"></input>
                    </div> 
                    <div className="h-14 my-4">
                    <label className="block text-gray-600 text-sm font-normal">Email Id</label>
                    <input type="text" name="emailId" value={user.emailId} 
                    onChange={ (e)=> handleChange(e)}
                    className="h-10 w-96 border mt-2 px-2 py-2"></input>
                    </div> 
                </div>
                
              </div>

              <div className="h-14 my-4 space-x-4 pt-4 ">
                <button
                  type="button"
                  className="inline-flex justify-center rounded-md border border-transparent bg-green-400 text-sm font-medium text-white hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 px-6 py-3"
                  onClick={updateUser}
                >
                  Update
                </button>
                <button
                  type="button"
                  className="inline-flex justify-center rounded-md border border-transparent bg-red-400 text-sm font-medium text-white hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 px-6 py-3"
                  onClick={resetForm}
                >
                  Cancel
                </button>
              </div>
              
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </div>
    </Dialog>
  </Transition>
  )
}

export default EditUser