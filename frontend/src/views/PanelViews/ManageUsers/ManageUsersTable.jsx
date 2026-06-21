import { useState } from "react";
import Button from "../../../components/Button/Button";
import ComponentModal from "../../../components/Modals/ComponentModal/ComponentModal";
import ManageUserModal from "../../../Modals/ManageUserModal";
import DeleteModalComponent from "../../../Modals/DeleteModal";
import { deleteUser } from "../../../services/User";
import { toast } from "react-toastify";

const ManageUsersTable = (props) => {
  const [selectedUserData, setSelectedUserData] = useState(null);
  const [userUpdateModal, setUserUpdateModal] = useState(false);
  const [deleteUpdateModal, setDeleteUpdateModal] = useState(false);
  const [buttonLoader, setButtonLoader] = useState(false);

  // To open user update modal
  const handleUpdateUserModal = (userData) => {
    setSelectedUserData(userData);
    setUserUpdateModal((prevValue) => !prevValue);
  };

  // To open user add modal
  const handleDeleteUserModal = (userData) => {
    userData && setSelectedUserData(userData);
    setDeleteUpdateModal((prevValue) => !prevValue);
  };

  // delete User
  const deleteUserById = async (userId) => {
    setButtonLoader(true);
    const params = {
      user_id: userId,
    };
    try {
      const response = await deleteUser(params);
      if (response.status === 200) {
        toast.success("User deleted successfully");
        handleDeleteUserModal(null);
        props.setPageNumber(0);
        props.setRefreshData((prevValue) => !prevValue);
      } else {
        toast.error("Failed to delete record");
      }
      setButtonLoader(false);
    } catch {
      toast.error("Failed to delete record");
      setButtonLoader(false);
    }
    setButtonLoader(false);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-headerColor text-white">
            <th className="py-2 px-4 border-b">First Name</th>
            <th className="py-2 px-4 border-b">Last Name</th>
            <th className="py-2 px-4 border-b">Username</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Company Name</th>
            <th className="py-2 px-4 border-b">Company Region</th>
            <th className="py-2 px-4 border-b">Company City</th>
            <th className="py-2 px-4 border-b" colSpan={2}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {props?.usersData?.map((item, index) => (
            <tr key={index} className="text-center">
              <td className="py-2 px-4 border-b">{item.first_name}</td>
              <td className="py-2 px-4 border-b">{item.last_name}</td>
              <td className="py-2 px-4 border-b">{item.username}</td>
              <td className="py-2 px-4 border-b">{item.email}</td>
              <td className="py-2 px-4 border-b">{item.company_name}</td>
              <td className="py-2 px-4 border-b">{item.company_region}</td>
              <td className="py-2 px-4 border-b">{item.company_city}</td>
              <td className="py-2 px-4 border-b">
                <Button
                  buttonText={"View"}
                  buttonClass={"p-2 bg-yellow-600 text-white"}
                  funcToCall={() => handleUpdateUserModal(item)}
                />
              </td>
              <td className="py-2 px-4 border-b">
                <Button
                  buttonText={"Delete"}
                  buttonClass={"p-2 bg-[#ff0000] text-white"}
                  funcToCall={() => handleDeleteUserModal(item)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ComponentModal
        isOpen={userUpdateModal}
        closeModal={handleUpdateUserModal}
        modalHeading={"Update User"}
        modalHeadingClassName={"text-4xl pb-6"}
        MyComp={
          <ManageUserModal
            closeModal={handleUpdateUserModal}
            fetchUser={true}
            userData={selectedUserData}
            setRefreshData={props.setRefreshData}
          />
        }
        formData={null}
        submitData={null}
      />
      <ComponentModal
        isOpen={deleteUpdateModal}
        closeModal={handleDeleteUserModal}
        MyComp={
          <DeleteModalComponent
            functionToCall={deleteUserById}
            params={selectedUserData?.user_id}
            loader={buttonLoader}
          />
        }
        formData={null}
        submitData={null}
      />{" "}
    </div>
  );
};

export default ManageUsersTable;
