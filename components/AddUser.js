import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import UserList from './UserList'

export default function AddUser() {
  const USER_API_BASE_URL="http://localhost:8080/api/v1/users";
  let [isOpen, setIsOpen] = useState(false)
  const [responseUser, setresponseUser] = useState({
    id:"",
    firstName:"",
    lastName:"",
    emailId:"",
  });
  const [user, setuser] = useState({
    id:"",
    firstName:"",
    lastName:"",
    emailId:"",
  });

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

  const saveUser = async (e)=>{
    e.preventDefault();
    const response= await fetch(USER_API_BASE_URL,{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
      },
      body: JSON.stringify(user),
    });
    if(!response.ok){
      throw new Error("SOmething went wrong");
    }
    const _user = response.json();
    setresponseUser(_user)
    resetForm(e);

  }

  const resetForm = (e)=>{
    e.preventDefault();
    setuser({
      
        id:"",
        firstName:"",
        lastName:"",
        emailId:"",
      
    });
    setIsOpen(false);
  }

  return (
    <>
    <div className="container mx-auto my-8">
      <div className="h-12">
        <button
          type="button"
          onClick={openModal}
          className="rounded bg-slate-600 text-white px-8 py-2"
        >
          Add New User
        </button>
      </div>

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
                        <input type="text" name="firstName" value={user.false}
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
                      onClick={saveUser}
                    >
                      Save
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
      <UserList user={responseUser} />
    </div>
    </>
  )
}
