import React from 'react';

const AddTask = ({ addTaskToggleModal }) => (
    <div className="z-50 addTaskModal opacity-0 pointer-events-none fixed w-full h-full top-0 left-0 flex items-center justify-center">
    <div
        onClick={(event) => addTaskToggleModal(event, null)}
        className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"
    ></div>
    <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
        <div className="modal-content text-left">
            <div className="flex justify-between items-center py-4 px-6 bg-primaryOrange mb-3 text-white">
                <p className="text-md font-semibold">
                    Add Task
        </p>
                <div
                    onClick={(event) => addTaskToggleModal(event, null)}
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
            <form className="text-center">
                <input className="p-2 md:p-3 bg-gray-200 w-full mt-2 md:mt-4" type="text" placeholder="Title"/>
                <textarea className="p-2 md:p-3 bg-gray-200 w-full mt-2 md:mt-4" type="text" placeholder="Description"/>
                <button className="bg-primaryOrange w-full py-2 text-center text-white mt-3 md:text-lg hover:bg-orange-600">Add Task</button>
            </form>
            </div>
        </div>
    </div>
</div>
)

export default AddTask;