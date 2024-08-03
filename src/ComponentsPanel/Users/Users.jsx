import React, { useEffect, useState } from 'react';
import Errorbox from '../ErrorBox/Errorbox';
import DeleteModal from '../DeleteModal/DeleteModal';
import EditModal from '../EditModal/EditModal';
import { BiRename } from 'react-icons/bi';
import { FaRegUserCircle, FaUnlockAlt, FaStar, FaChartLine } from 'react-icons/fa';
import { MdOutlineMail } from 'react-icons/md';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import useGetData from '../../ReactQuery/useGetData';
export default function Users() {
  const [allUsers, setAllUsers] = useState([]);
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [isShowEditModal, setIsShowEditModal] = useState(false);
  const [mainUserIdDelete, setMainUserIdDelete] = useState();
  const [mainUserIdEdit, setMainUserIdEdit] = useState();
  const [newInfoUserFirstName, setNewInfoUserFirstName] = useState('');
  const [newInfoUserLastName, setNewInfoUserLastName] = useState('');
  const [newInfoUserUserName, setNewInfoUserUserName] = useState('');
  const [newInfoUserPassword, setNewInfoUserPassword] = useState('');
  const [newInfoUserEmail, setNewInfoUserEmail] = useState('');
  const [newInfoUserScore, setNewInfoUserScore] = useState('');
  const [newInfoUserBuy, setNewInfoUserBuy] = useState('');
  const fetchUser = useGetData('users');
  useEffect(() => {
    if (fetchUser.data) {
      setAllUsers(fetchUser.data);
    }
  }, [fetchUser.data]);

  const getAllUsers = () => {
    fetchUser.refetch();
  };

  const removeUser = () => {
    fetch(`/api/users/${mainUserIdDelete}`, {
      method: 'DELETE',
    }).then((res) => {
      if (res.status == 200) {
        getAllUsers();
        setIsShowDeleteModal(false);
      }
    });
  };

  let newInfoUsers = {
    firsname: newInfoUserFirstName,
    lastname: newInfoUserLastName,
    username: newInfoUserUserName,
    password: newInfoUserPassword,
    email: newInfoUserEmail,
    score: newInfoUserScore,
    buy: newInfoUserBuy,
  };
  const EditUserModalSubmitAction = (event) => {
    event.preventDefault();
    fetch(`/api/users/${mainUserIdEdit}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newInfoUsers),
    })
      .then((res) => res.json())
      .then((result) => {
        getAllUsers();
        setIsShowEditModal(false);
      });
  };

  return (
    <div className="mt-[60px] p-5 rounded-3xl">
      <h1 className="text-xl md:text-[2em]">لیست کاربران</h1>

      {allUsers.length ? (
        <TableContainer component={Paper} className=" mt-8">
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center" className=" !font-yekanBakhBlack ">
                  نام و نام خانوادگی
                </TableCell>
                <TableCell align="center" className=" !font-yekanBakhBlack ">
                  یوزرنیم
                </TableCell>
                <TableCell align="center" className=" !font-yekanBakhBlack ">
                  رمز عبور
                </TableCell>
                <TableCell align="center" className=" !font-yekanBakhBlack ">
                  ایمیل
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allUsers?.map((user) => (
                <TableRow className="flex flex-row items-center" key={user.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell align="center" className=" !font-yekanBakhBlack !w-1/4">
                    {user.firsname}-{user.lastname}
                  </TableCell>
                  <TableCell align="center" className=" !font-yekanBakhBlack !w-1/4">
                    {user.username}
                  </TableCell>
                  <TableCell align="center" className=" !font-yekanBakhBlack !w-1/4">
                    {user.password}
                  </TableCell>
                  <TableCell align="center" className=" !font-yekanBakhBlack !w-1/4">
                    {user.email}
                  </TableCell>
                  <TableCell align="center" className=" !font-yekanBakhBlack !flex flex-row !w-fit items-center">
                    <button
                      onClick={() => {
                        setMainUserIdDelete(user.id);
                        setIsShowDeleteModal(true);
                      }}
                      className="bg-orange-theme text-white py-2 px-[15px] rounded-ten border-none outline-none mr-5 cursor-pointer">
                      حذف
                    </button>

                    <button
                      className="bg-orange-theme text-white py-2 px-[15px] rounded-ten border-none outline-none mr-5 cursor-pointer"
                      onClick={() => {
                        setIsShowEditModal(true);
                        setMainUserIdEdit(user.id);
                        setNewInfoUserFirstName(user.firsname);
                        setNewInfoUserLastName(user.lastname);
                        setNewInfoUserUserName(user.username);
                        setNewInfoUserPassword(user.password);
                        setNewInfoUserEmail(user.email);
                        setNewInfoUserScore(user.score);
                        setNewInfoUserBuy(user.buy);
                      }}>
                      ویرایش
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Errorbox msg="هیچ کاربری یافت نشد" />
      )}
      {isShowDeleteModal && (
        <DeleteModal modalShow={removeUser} modalNotShow={() => setIsShowDeleteModal(false)}>
          <h1 className="text-[1.3rem]">آیا از حذف اطمینان دارید؟</h1>
        </DeleteModal>
      )}
      {isShowEditModal && (
        <EditModal onSubmit={EditUserModalSubmitAction} onClose={() => setIsShowEditModal(false)}>
          <div className="edit-Form-Group-Input mt-[15px] flex items-center gap-y-[10px] w-full bg-white-50 py-0 px-5 rounded-ten ">
            <span>
              <BiRename />
            </span>
            <input
              type="text"
              placeholder="اسم جدید را وارد کنید"
              value={newInfoUserFirstName}
              className="w-full border-none outline-none bg-transparent py-2 px-[10px]"
              onChange={(e) => {
                setNewInfoUserFirstName(e.target.value);
              }}
            />
          </div>
          <div className="edit-Form-Group-Input mt-[15px] flex items-center gap-y-[10px] w-full bg-white-50 py-0 px-5 rounded-ten ">
            <span>
              <BiRename />
            </span>
            <input
              className="w-full border-none outline-none bg-transparent py-2 px-[10px]"
              type="text"
              placeholder="فامیلی جدید را وارد کنید"
              value={newInfoUserLastName}
              onChange={(e) => {
                setNewInfoUserLastName(e.target.value);
              }}
            />
          </div>
          <div className="edit-Form-Group-Input mt-[15px] flex items-center gap-y-[10px] w-full bg-white-50 py-0 px-5 rounded-ten ">
            <span>
              <FaRegUserCircle />
            </span>
            <input
              type="text"
              className="w-full border-none outline-none bg-transparent py-2 px-[10px]"
              placeholder="نام کاربری جدید را وارد کنید"
              value={newInfoUserUserName}
              onChange={(e) => {
                setNewInfoUserUserName(e.target.value);
              }}
            />
          </div>
          <div className="edit-Form-Group-Input mt-[15px] flex items-center gap-y-[10px] w-full bg-white-50 py-0 px-5 rounded-ten ">
            <span>
              <FaUnlockAlt />
            </span>
            <input
              type="text"
              className="w-full border-none outline-none bg-transparent py-2 px-[10px]"
              placeholder="رمز ورود جدید را وارد کنید"
              value={newInfoUserPassword}
              onChange={(e) => {
                setNewInfoUserPassword(e.target.value);
              }}
            />
          </div>
          <div className="edit-Form-Group-Input mt-[15px] flex items-center gap-y-[10px] w-full bg-white-50 py-0 px-5 rounded-ten ">
            <span>
              <MdOutlineMail />
            </span>
            <input
              type="text"
              className="w-full border-none outline-none bg-transparent py-2 px-[10px]"
              placeholder="ایمیل جدید را وارد کنید"
              value={newInfoUserEmail}
              onChange={(e) => {
                setNewInfoUserEmail(e.target.value);
              }}
            />
          </div>

          <div className="edit-Form-Group-Input mt-[15px] flex items-center gap-y-[10px] w-full bg-white-50 py-0 px-5 rounded-ten ">
            <span>
              <FaStar />
            </span>
            <input
              type="text"
              className="w-full border-none outline-none bg-transparent py-2 px-[10px]"
              placeholder="امتیاز جدید را وارد کنید"
              value={newInfoUserScore}
              onChange={(e) => {
                setNewInfoUserScore(e.target.value);
              }}
            />
          </div>
          <div className="edit-Form-Group-Input mt-[15px] flex items-center gap-y-[10px] w-full bg-white-50 py-0 px-5 rounded-ten ">
            <span>
              <FaChartLine />
            </span>
            <input
              type="text"
              className="w-full border-none outline-none bg-transparent py-2 px-[10px]"
              placeholder="میزان خرید جدید را وارد کنید"
              value={newInfoUserBuy}
              onChange={(e) => {
                setNewInfoUserBuy(e.target.value);
              }}
            />
          </div>
        </EditModal>
      )}
    </div>
  );
}
