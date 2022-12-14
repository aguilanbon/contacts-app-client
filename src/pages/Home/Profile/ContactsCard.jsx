import React from 'react'
import { useContext } from 'react'
import ContactContext from '../../../helpers/ContactContext'
import ModalContext from '../../../helpers/ModalContext'
import axios from 'axios'
import toast from 'react-hot-toast'

function ContactsCard({ contact }) {

    const { setOpenModalType, setCurrentContactId } = useContext(ModalContext)
    const { dispatch } = useContext(ContactContext)

    const uId = localStorage.getItem('uId')

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:4000/api/contacts/${id}`, { data: { uId: uId } })
            dispatch({ type: 'DELETE_CONTACT', payload: response.data })
            toast.success('Contact deleted!')
        } catch (error) {
            toast.error(error.response.data.mss)
        }
    }

    const handleEditModal = (id) => {
        setOpenModalType('edit')
        setCurrentContactId(id)
    }

    const handleShareModal = (id) => {
        setOpenModalType('share')
        setCurrentContactId(id)
    }

    return (
        <div className='w-full flex'>
            <div className='w-full flex flex-col'>
                <div className='w-auto flex flex-row items-center p-2 bg-white hover:bg-slate-200 border-b border-slate-200 justify-evenly'>
                    <div className='w-full flex items-center'>
                        <img src={contact.contactImage === 'avatar' ? `http://localhost:4000/uploads/profile.png` : `http://localhost:4000/uploads/${contact?.contactImage}`} alt="" className='w-10 h-10 rounded-full object-cover' />
                        <div className='flex flex-col ml-2'>
                            <p className='text-sm font-semibold'>{contact.fName} {contact.lName}</p>
                        </div>
                    </div>
                    <div className='w-full flex flex-col  items-start ml-2'>
                        <div className='flex'>
                            <p className='text-xs w-full'>{contact.email}</p>
                        </div>
                        <div className='flex'>
                            <p className='text-xs w-full'>{contact.phone}</p>
                        </div>
                    </div>
                    <div className='w-full sm:flex hidden flex-col  items-start'>
                        <div className='flex'>
                            <p className='text-xs w-full'>{contact.bday?.slice(0, 10)}</p>
                        </div>
                        <div className='flex'>
                            <p className='text-xs w-full'>{contact.address}</p>
                        </div>
                    </div>
                    <div className='w-auto flex sm:flex-row flex-col justify-end items-center'>
                        {contact.createdBy?._id === uId ?
                            <div className='w-20 flex justify-end'>
                                <div className='p-2 hover:bg-yellow-50 rounded-full' onClick={() => handleEditModal(contact._id)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-500 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                </div>
                            </div>
                            :
                            <div className='py-2 px-2 rounded-full w-20 text-gray-500'>
                                <p className='text-xs font-bold italic before:content-["fr:"] before:font-light before:mr-1'>{contact.createdBy?.fName}</p>
                            </div>
                        }
                        <div className='p-2 hover:bg-red-50 rounded-full' onClick={() => handleDelete(contact._id)}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-700 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </div>
                        <div className='p-2 hover:bg-blue-50 rounded-full' onClick={() => handleShareModal(contact._id)}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContactsCard