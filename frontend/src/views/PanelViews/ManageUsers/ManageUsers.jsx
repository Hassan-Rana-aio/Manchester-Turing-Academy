import Button from "../../../components/Button/Button";
import ManageUsersTable from "./ManageUsersTable";
import SearchWithIcons from "../../../components/SearchWithIcons/SearchWithIcons";
import { useEffect, useState } from "react";
import { getUser } from "../../../services/User";
import ComponentModal from "../../../components/Modals/ComponentModal/ComponentModal";
import ManageUserModal from "../../../Modals/ManageUserModal";
import Pagination from "../../../components/Pagination/Pagination";
import Loader from "../../../components/Loader/Loader";

const ManageUsers = () => {
  const [refreshData, setRefreshData] = useState(false);
  const [usersData, setUsersData] = useState([]);
  const [userSearch, setUserSearch] = useState(null);
  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize, setPageSize] = useState(4);
  const [totalRecords, setTotalRecords] = useState(0);
  const [localSearchValue, setLocalSearchValue] = useState(null);
  const [showCancelButton, setShowCancelButton] = useState(false);

  const [userAddModal, setUserAddModal] = useState(false);
  const [loader, setLoader] = useState(true);

  // To open user add modal
  const handleAddModal = () => {
    setUserAddModal((prevValue) => !prevValue);
  };

  // get user details here
  const getUsers = async (pageNumber, pageSize, search) => {
    // prepare params for get user request
    const params = {
      page_size: pageSize,
      page_number: pageNumber * pageSize,
      search: search,
    };

    setLoader(true);
    try {
      const response = await getUser(params);
      if (response.status === 200) {
        setUsersData(response?.data?.data);
        setTotalRecords(response?.data?.total_count);
      }
      setLoader(false);
    } catch {
      setLoader(false);
    }
    setLoader(false);
  };

  // useEffects
  useEffect(() => {
    getUsers(pageNumber, pageSize, userSearch);
  }, [pageNumber, userSearch, refreshData]);

  useEffect(() => {
    setPageNumber(0);
  }, [userSearch]);

  return (
    <div className="px-4 h-full">
      {loader ? (
        <div className="flex justify-center items-center h-full">
          <Loader />
        </div>
      ) : (
        <div>
          <div className="pt-8 pb-4 border-b-2 border-black">
            <h1 className="text-5xl">Users</h1>
          </div>
          <div className="pt-4 pb-2 grid lg:grid-cols-2 md:grid-cols-2 lg:gap-0 md:gap-0 gap-4 grid-cols-1 justify-items items-center">
            <div className="self-end">
              <Button
                buttonText={"Add User"}
                funcToCall={handleAddModal}
                buttonClass={
                  "bg-buttonGreen p-2 text-white hover:bg-buttonGreenDark"
                }
              />
            </div>
            <SearchWithIcons
              setSearchValue={setUserSearch}
              localSearchValue={localSearchValue}
              setLocalSearchValue={setLocalSearchValue}
              showCancelButton={showCancelButton}
              setShowCancelButton={setShowCancelButton}
              divClass={"lg:justify-self-end md:justify-self-end"}
            />
          </div>
          <div className="py-1">
            <ManageUsersTable
              usersData={usersData}
              setPageNumber={setPageNumber}
              setRefreshData={setRefreshData}
            />
          </div>
          <div className="grid justify-end lg:pb-1 md:pb-1 pb-4">
            <Pagination
              currentPage={pageNumber}
              pageSize={pageSize}
              totalRecords={totalRecords}
              functionToCall={setPageNumber}
            />
          </div>
        </div>
      )}

      <ComponentModal
        isOpen={userAddModal}
        closeModal={handleAddModal}
        modalHeading={"Add User"}
        modalHeadingClassName={"text-4xl pb-6"}
        MyComp={
          <ManageUserModal
            closeModal={handleAddModal}
            setRefreshData={setRefreshData}
          />
        }
        formData={null}
        submitData={null}
      />
    </div>
  );
};

export default ManageUsers;
