import React from 'react';

const UpdateUser = ({
  editToggleModal,
  onUpdate,
  validationRes,
  onFocus,
  userUpdate,
  onChangeUpdate,
  error
}) => (
  <div className="z-50 editModal opacity-0 pointer-events-none fixed w-full h-full top-0 left-0 flex items-center justify-center">
    <div
      onClick={(event) => editToggleModal(event, null)}
      className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"
    ></div>
    <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
      <div className="modal-content text-left">
        <div className="flex justify-between items-center py-4 px-6 bg-primaryBlue mb-3 text-white">
          <p className="text-xl">
            Update User
                        </p>
          <div
            onClick={(event) => editToggleModal(event, null)}
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
        <div className="px-8 pb-6">
          <form className="text-center" onSubmit={onUpdate}>
            <input
              className="p-2 md:p-3 bg-gray-200 w-full mt-2 md:mt-4"
              type="text"
              placeholder="Full Name"
              name="name"
              defaultValue={userUpdate && userUpdate.name && userUpdate.name}
              onChange={onChangeUpdate}
              onFocus={onFocus}
            />
            {validationRes && validationRes.name ? (
              <p className="text-red-500 text-left text-sm italic mt-2">
                {validationRes.name}
              </p>
            ) : null}
            <input 
              className="p-2 md:p-3 bg-gray-200 w-full mt-2 md:mt-4" 
              type="text" 
              placeholder="Email" 
              name="email"
              defaultValue={userUpdate && userUpdate.email && userUpdate.email}
              onChange={onChangeUpdate}
              onFocus={onFocus}
            />
            {validationRes && validationRes.email ? (
              <p className="text-red-500 text-left text-sm italic mt-2">
                {validationRes.email}
              </p>
            ) : null}
            {error ? (
              <p className="text-red-500 text-left text-sm italic mt-2">
                {error}
              </p>
            ) : null}
            <button className="bg-primaryBlue w-full py-2 text-center text-white mt-3 md:text-lg hover:bg-blue-600">Update</button>
          </form>
        </div>
      </div>
    </div>
  </div>
)

export default UpdateUser;