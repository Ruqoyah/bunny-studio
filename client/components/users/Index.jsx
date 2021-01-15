import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../common/Header';
import Paginate from '../common/Paginate';
import AddUser from './AddUser';
import UpdateUser from './UpdateUser';
import DeleteUser from './DeleteUser';

class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    toggleModal = (event, id) => {
        if (id) {
            this.setState(() => ({ id }));
        }
        let modal = document.querySelector('.deleteModal');
        modal.classList.toggle('opacity-0');
        modal.classList.toggle('pointer-events-none');
    };

    editToggleModal = (event, id) => {
        if (id) {
            this.setState(() => ({ id }));
        }
        let modal = document.querySelector('.editModal');
        modal.classList.toggle('opacity-0');
        modal.classList.toggle('pointer-events-none');
    };

    addUserToggleModal = (event, id) => {
        if (id) {
            this.setState(() => ({ id }));
        }
        let modal = document.querySelector('.addUserModal');
        modal.classList.toggle('opacity-0');
        modal.classList.toggle('pointer-events-none');
    };

    render() {
        const { disableBtn } = this.state;
        return (
            <div>
                <Header
                    location={this.props.location}
                />
                <div className="pt-24 md:pt-32 px-10 md:px-16 xl:px-32">
                    <div className="md:flex font-bold text-lg bg-primaryBlue text-white py-4 px-4 hidden">
                        <div className="flex-initial w-1/4">Name</div>
                        <div className="flex-initial w-1/3">Email</div>
                        <div className="flex-initial w-5/12">Action</div>
                    </div>
                    <div className="block md:flex border rounded p-4 mt-4 shadow-lg items-center">
                        <label className="font-bold block md:hidden">Name:</label>
                        <div className="flex-initial w-full md:w-1/4 break-words mb-3 md:mb-0">Rukayat Odukoya</div>
                        <label className="font-bold block md:hidden">Email:</label>
                        <div className="flex-initial w-full md:w-1/3 break-words mb-3 md:mb-0">rukayatodukoya123@gmail.com</div>
                        <div className="flex-initial w-full md:w-5/12 text-sm md:text-base">
                            <button className="bg-primaryBlue text-white rounded-full py-2 md:px-4 cursor-pointer w-16 md:w-24 focus:outline-none mr-2"
                                onClick={(event) =>
                                    this.editToggleModal(event)
                                }>Update</button>
                            <button className="bg-red-600 text-white rounded-full py-2 md:px-4 cursor-pointer w-16 md:w-24 focus:outline-none mr-2 mt-2 lg:mt-0"
                                onClick={(event) =>
                                    this.toggleModal(event)
                                }>Delete</button>
                            <Link to="/tasks">
                            <button className="bg-primaryOrange text-white rounded-full py-2 md:px-4 cursor-pointer w-16 md:w-24 focus:outline-none mt-2 lg:mt-0">Task(s)</button>
                            </Link>
                        </div>
                    </div>
                    <div className="block md:flex border rounded p-4 mt-4 shadow-lg items-center">
                        <label className="font-bold block md:hidden">Name:</label>
                        <div className="flex-initial w-full md:w-1/4 break-words mb-3 md:mb-0">Rukayat Odukoya</div>
                        <label className="font-bold block md:hidden">Email:</label>
                        <div className="flex-initial w-full md:w-1/3 break-words mb-3 md:mb-0">rukayatodukoya123@gmail.com</div>
                        <div className="flex-initial w-full md:w-5/12 text-sm md:text-base">
                            <button className="bg-primaryBlue text-white rounded-full py-2 md:px-4 cursor-pointer w-16 md:w-24 focus:outline-none mr-2"
                                onClick={(event) =>
                                    this.editToggleModal(event)
                                }>Update</button>
                            <button className="bg-red-600 text-white rounded-full py-2 md:px-4 cursor-pointer w-16 md:w-24 focus:outline-none mr-2 mt-2 lg:mt-0"
                                onClick={(event) =>
                                    this.toggleModal(event)
                                }>Delete</button>
                            <Link to="/tasks">
                            <button className="bg-primaryOrange text-white rounded-full py-2 md:px-4 cursor-pointer w-16 md:w-24 focus:outline-none mt-2 lg:mt-0">Task(s)</button>
                            </Link>
                        </div>
                    </div>
                    <div className="block md:flex border rounded p-4 mt-4 shadow-lg items-center">
                        <label className="font-bold block md:hidden">Name:</label>
                        <div className="flex-initial w-full md:w-1/4 break-words mb-3 md:mb-0">Rukayat Odukoya</div>
                        <label className="font-bold block md:hidden">Email:</label>
                        <div className="flex-initial w-full md:w-1/3 break-words mb-3 md:mb-0">rukayatodukoya123@gmail.com</div>
                        <div className="flex-initial w-full md:w-5/12 text-sm md:text-base">
                            <button className="bg-primaryBlue text-white rounded-full py-2 md:px-4 cursor-pointer w-16 md:w-24 focus:outline-none mr-2"
                                onClick={(event) =>
                                    this.editToggleModal(event)
                                }>Update</button>
                            <button className="bg-red-600 text-white rounded-full py-2 md:px-4 cursor-pointer w-16 md:w-24 focus:outline-none mr-2 mt-2 lg:mt-0"
                                onClick={(event) =>
                                    this.toggleModal(event)
                                }>Delete</button>
                            <Link to="/tasks">
                            <button className="bg-primaryOrange text-white rounded-full py-2 md:px-4 cursor-pointer w-16 md:w-24 focus:outline-none mt-2 lg:mt-0">Task(s)</button>
                            </Link>
                        </div>
                    </div>
                    <div className="block md:flex border rounded p-4 mt-4 shadow-lg items-center">
                        <label className="font-bold block md:hidden">Name:</label>
                        <div className="flex-initial w-full md:w-1/4 break-words mb-3 md:mb-0">Rukayat Odukoya</div>
                        <label className="font-bold block md:hidden">Email:</label>
                        <div className="flex-initial w-full md:w-1/3 break-words mb-3 md:mb-0">rukayatodukoya123@gmail.com</div>
                        <div className="flex-initial w-full md:w-5/12 text-sm md:text-base">
                            <button className="bg-primaryBlue text-white rounded-full py-2 md:px-4 cursor-pointer w-16 md:w-24 focus:outline-none mr-2"
                                onClick={(event) =>
                                    this.editToggleModal(event)
                                }>Update</button>
                            <button className="bg-red-600 text-white rounded-full py-2 md:px-4 cursor-pointer w-16 md:w-24 focus:outline-none mr-2 mt-2 lg:mt-0"
                                onClick={(event) =>
                                    this.toggleModal(event)
                                }>Delete</button>
                            <Link to="/tasks">
                            <button className="bg-primaryOrange text-white rounded-full py-2 md:px-4 cursor-pointer w-16 md:w-24 focus:outline-none mt-2 lg:mt-0">Task(s)</button>
                            </Link>
                        </div>
                    </div>
                    <div className="my-16 md:my-24">
                        <Paginate
                            totalData={20}
                            perPage={10}
                            //    handlePageChange={handlePageChange}
                            activePage={1}
                            dataCount={2}
                        />
                    </div>
                </div>
                <AddUser
                    addUserToggleModal={this.addUserToggleModal}
                />
                <UpdateUser
                    editToggleModal={this.editToggleModal}
                />
                <DeleteUser
                    toggleModal={this.toggleModal}
                    disableBtn={disableBtn}
                />

                <div className="plus rounded-full bg-primaryOrange w-16 h-16 ml-auto mr-8 md:mr-12 xl:mr-20 flex items-center cursor-pointer shadow-lg" onClick={(event) =>
                    this.addUserToggleModal(event)
                }>
                    <p className="font-bold text-2xl text-white m-auto">+</p>
                </div>


            </div>

        )
    }
}

export default Users