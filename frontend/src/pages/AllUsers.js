import React, { useEffect, useState } from 'react'
import SummaryAPI from '../common'
import { toast } from 'react-toastify'
import moment from 'moment'
import { MdEdit } from "react-icons/md";
import ChangeUserRole from '../components/ChangeUserRole';

const AllUsers = () => {
  const [openUpdateRole, setOpenUpdateRole] = useState(false)

  const [allUsers, setAllUsers] = useState([])

  const [updateUserDetails, setUpdateUserDetails] = useState({
    name: "",
    email: "",
    role: "",
    _id: "",
  })

  const fetchAllUsers = async () => {
    const fetchData = await fetch(SummaryAPI.allUsers.url, {
      method: SummaryAPI.allUsers.method,
      credentials: "include",
    })

    const dataResponse = await fetchData.json()

    if (dataResponse.success) {
      setAllUsers(dataResponse.data)
    }

    if (dataResponse.error) {
      toast.error(dataResponse.message)
    }

    console.log(dataResponse)

  }

  useEffect(() => {
    fetchAllUsers()
  }, [])

  return (
    <div className='bg-white pb-4'>

      <table className='w-full userTable'>

        <thead>
          <tr className='bg-black text-white'>
            <th>Sr No.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Created Date</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody className=''>
          {
            allUsers?.map((user, index) =>{
              return (
                <tr>
                  <td>{index + 1}</td>
                  <td>{user?.name}</td>
                  <td>{user?.email}</td>
                  <td>{user?.role}</td>

                  {/* <td>{new Date(user.createdAt).toLocaleDateString()}</td> */}
                  <td>{moment(user?.createdAt).format('LLL')}</td>

                  <td>
                    <button className='bg-green-100 p-2 rounded-full cursor-pointer hover:bg-green-400 hover:text-white' 
                      onClick={() => {
                        setUpdateUserDetails(user)
                        setOpenUpdateRole(true)
                      }}
                    >
                      <MdEdit />
                    </button>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>

      {
        openUpdateRole && 
        <ChangeUserRole
          onClose={() => setOpenUpdateRole(false)} 
          name={updateUserDetails.name} 
          email={updateUserDetails.email} 
          role={updateUserDetails.role}
          userId={updateUserDetails._id}
          callFunction={fetchAllUsers}
        />
      }

    </div>
    
  )
}

export default AllUsers