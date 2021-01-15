import React, { Component } from 'react';
import Header from '../common/Header';
import AddTask from './AddTask';

class Tasks extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    addTaskToggleModal = (event, id) => {
        if (id) {
            this.setState(() => ({ id }));
        }
        let modal = document.querySelector('.addTaskModal');
        modal.classList.toggle('opacity-0');
        modal.classList.toggle('pointer-events-none');
    };

    render() {
        return (
            <div>
                <Header
                    location={this.props.location}
                />
                <div className="pt-24 md:pt-32 px-10 md:px-16 xl:px-32">
                    <div className="block md:flex">
                        <div className="flex-1 tasks md:mr-4 p-2 md:p-8 mb-8 md:mb-0">
                            <div className="p-4 bg-red-600 text-white">TO-DO</div>
                            <div className="rounded-lg shadow-lg p-6 mb-4">
                                <h3 className="text-2xl">Title</h3>
                                <p className="text-sm">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                                <div className="relative w-full mt-2">
                                <select
                              className="block appearance-none w-full bg-red-600 text-white border border-gray-400 cursor-pointer py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-red-600 focus:border-gray-500"
                              id="grid-state"
                            >
                              <option className="font-medium">TO-DO</option>
                              <option className="font-medium">DONE</option>
                            </select>
                            <div className="pointer-events-none absolute right-0 flex inset-y-0 items-center px-2 text-white">
                              <svg
                                className="fill-current h-4 w-4"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                              </svg>
                            </div>
                                </div>
                            </div>
                            <div className="rounded-lg shadow-lg p-6 mb-4">
                                <h3 className="text-2xl">Title</h3>
                                <p className="text-sm">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                                <div className="relative w-full mt-2">
                                <select
                              className="block appearance-none w-full bg-red-600 text-white border border-gray-400 cursor-pointer py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-red-600 focus:border-gray-500"
                              id="grid-state"
                            >
                              <option className="font-medium">TO-DO</option>
                              <option className="font-medium">DONE</option>
                            </select>
                            <div className="pointer-events-none absolute right-0 flex inset-y-0 items-center px-2 text-white">
                              <svg
                                className="fill-current h-4 w-4"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                              </svg>
                            </div>
                                </div>
                            </div>

                        </div>
                        <div className="flex-1 tasks p-2 md:p-8">
                        <div className="p-4 bg-green-600 text-white">DONE</div>
                        <div className="rounded-lg shadow-lg p-6 mb-4">
                                <h3 className="text-2xl">Title</h3>
                                <p className="text-sm">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                                <div className="relative w-full mt-2">
                                <select
                              className="block appearance-none w-full bg-green-600 text-white border border-gray-400 cursor-pointer py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-green-800 focus:border-gray-500"
                              id="grid-state"
                              value="done"
                            >
                              <option className="font-medium" id="to-do" value="to-do">TO-DO</option>
                              <option className="font-medium" id="done" value="done">DONE</option>
                            </select>
                            <div className="pointer-events-none absolute right-0 flex inset-y-0 items-center px-2 text-white">
                              <svg
                                className="fill-current h-4 w-4"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                              </svg>
                            </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="plus rounded-full bg-primaryOrange w-16 h-16 ml-auto mr-8 md:mr-12 xl:mr-20 flex items-center cursor-pointer shadow-lg" onClick={(event) =>
                    this.addTaskToggleModal(event)
                }>
                    <p className="font-bold text-2xl text-white m-auto">+</p>
                </div>

                <AddTask
                addTaskToggleModal={this.addTaskToggleModal}
                />

            </div>

        )
    }
}

export default Tasks