import React from 'react';

const DeleteUser = ({ toggleModal, disableBtn }) => (
    <div className="z-50 deleteModal opacity-0 pointer-events-none fixed w-full h-full top-0 left-0 flex items-center justify-center">
        <div
            onClick={(event) => toggleModal(event, null)}
            className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"
        ></div>
        <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
            <div className="modal-content text-left">
                <div className="flex justify-between items-center py-4 px-6 bg-red-500 mb-3 text-white">
                    <p className="text-md font-semibold">
                        Delete User
        </p>
                    <div
                        onClick={(event) => toggleModal(event, null)}
                        className="modal-close cursor-pointer z-50"
                    >
                        <svg
                            className="text-white fill-current text-black"
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            viewBox="0 0 18 18"
                        >
                            <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
                        </svg>
                    </div>
                </div>
                <div className="px-6 py-6">
                    <p className="mb-6 item-center">
                        Are you sure you want to delete this User?
        </p>
                    <div className="flex">
                        <div className="flex-1 mr-4">
                            <button
                                className={`${disableBtn
                                    ? 'opacity-50 cursor-not-allowed py-2 px-4 w-full rounded bg-red-500 text-white focus:outline-none'
                                    : 'py-2 px-4 w-full rounded bg-red-500 text-white focus:outline-none'
                                    }`}

                            >
                                Yes
              </button>
                        </div>
                        <div className="flex-1">
                            <button
                                className="text-black py-2 px-4 w-full rounded bg-gray-200 focus:outline-none"
                                onClick={(event) => toggleModal(event, null)}
                            >
                                No
            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

)

export default DeleteUser;