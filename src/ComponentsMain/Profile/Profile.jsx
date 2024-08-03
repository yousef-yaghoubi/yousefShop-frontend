import React, { useEffect, useState } from 'react';
import Toman from '../../Toman/Toman';
import { useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'sonner';
import EditModal from '../../ComponentsPanel/EditModal/EditModal';
import { BiRename } from 'react-icons/bi';
import { FaRegUserCircle, FaUnlockAlt } from 'react-icons/fa';
import { MdOutlineMail } from 'react-icons/md';
import useGetData from '../../ReactQuery/useGetData';
import HeaderMain from '../HeaderMain/HeaderMain';
import { useSelector } from 'react-redux';

function Profile() {
  const [showAccount, setShowAccount] = useState(false);
  const [account, setAccount] = useState();
  const [editAccount, setEditAccount] = useState(false);
  const [newAccountFirstName, setNewAccountFirstName] = useState();
  const [newAccountLastName, setNewAccountLastName] = useState();
  const [newAccountUserName, setNewAccountUserName] = useState();
  const [newAccountEmail, setNewAccountEmail] = useState();
  const [newAccountPassword, setNewAccountPassword] = useState();
  const navigate = useNavigate();
  const fetchProfile = useGetData('users');
  
  let userId = localStorage.getItem('profile');
  useEffect(() => {
    let userLogin = fetchProfile.data?.find((user) => user.id * 87461946194645613 == userId);
    if (userLogin != undefined && userLogin != null) {
      setAccount(userLogin);
      setShowAccount(true);
      setNewAccountFirstName(userLogin.firsname);
      setNewAccountLastName(userLogin.lastname);
      setNewAccountUserName(userLogin.username);
      setNewAccountEmail(userLogin.email);
      setNewAccountPassword(userLogin.password);
    } else {
      setAccount(false);
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    }
  }, []);

  return (
    <>
      <HeaderMain />
      <div>
        <Toaster
          position="top-center"
          dir="rtl"
          visibleToasts={1}
          richColors
          expand={true}
          toastOptions={{
            style: {
              height: '4em',
              paddingRight: '1em',
              marginTop: '6em',
              marginBottom: '3em',
            },
          }}
        />
        {showAccount == false ? (
          toast.warning('کاربر گرامی شما حساب کاربری ندارید. چند ثانیه دیگر به صفحه ثبت نام فرستاده میشوید.')
        ) : (
          <div className="flex flex-col justify-center items-center">
            <div className=" w-11/12  mt-8 rounded-2xl relative p-8 flex flex-col items-center bg-orange-theme shadow-profile">
              <div className="bg-white h-36 p-2 w-fit rounded-full">
                <img src="https://ucarecdn.com/0e9ba612-d486-4f31-a44a-e5dcc5a9f1a6/-/preview/512x512/" alt="empty" className="h-full" />
              </div>

              <div className=" w-[100%] flex flex-col md:flex-row justify-around mt-4">
                <div className="flex flex-col items-center">
                  <h1 className=" text-white text-2xl mb-5">
                    {account.firsname} {account.lastname}
                  </h1>
                  <h3 className=" text-lg font-yekanBakhLight text-neutral-100">{account.username}@</h3>
                </div>

                <div className="flex flex-col items-center">
                  <h2 className="text-lg text-white mb-5">{account.email}</h2>
                  <h3 className="flex items-center text-neutral-100 ">
                    میزان خرید کل: {account.buy} <Toman clas={'mr-4'} />
                  </h3>
                </div>
              </div>
              <button className=" w-48 h-12 rounded-lg bg-white mt-8" onClick={() => setEditAccount(true)}>
                ویرایش
              </button>
              </div>

          </div>
        )}
        {editAccount && (
          <EditModal
            onClose={() => setEditAccount(false)}
            onSubmit={(e) => {
              e.preventDefault();
              toast.warning('کاربر گرامی این بخش بزودی اضافه میشود');
            }}>
            <div className="edit-Form-Group-Input mt-[15px] flex items-center gap-y-[10px] w-full bg-white-50 py-0 px-5 rounded-ten">
              <span>
                <BiRename />
              </span>
              <input
                className="w-full border-none outline-none bg-transparent py-2 px-[10px]"
                type="text"
                placeholder="نام جدید را وارد کنید"
                value={newAccountFirstName}
                onChange={(e) => {
                  setNewAccountFirstName(e.target.value);
                }}
              />
            </div>

            <div className="edit-Form-Group-Input mt-[15px] flex items-center gap-y-[10px] w-full bg-white-50 py-0 px-5 rounded-ten">
              <span>
                <BiRename />
              </span>
              <input
                className="w-full border-none outline-none bg-transparent py-2 px-[10px]"
                type="text"
                placeholder="نام خانوادگی جدید را وارد کنید"
                value={newAccountLastName}
                onChange={(e) => {
                  setNewAccountLastName(e.target.value);
                }}
              />
            </div>

            <div className="edit-Form-Group-Input mt-[15px] flex items-center gap-y-[10px] w-full bg-white-50 py-0 px-5 rounded-ten">
              <span>
                <FaRegUserCircle />
              </span>
              <input
                className="w-full border-none outline-none bg-transparent py-2 px-[10px]"
                type="text"
                placeholder="نام کاربری جدید را وارد کنید"
                value={newAccountUserName}
                onChange={(e) => {
                  setNewAccountUserName(e.target.value);
                }}
              />
            </div>

            <div className="edit-Form-Group-Input mt-[15px] flex items-center gap-y-[10px] w-full bg-white-50 py-0 px-5 rounded-ten">
              <span>
                <MdOutlineMail />
              </span>
              <input
                className="w-full border-none outline-none bg-transparent py-2 px-[10px]"
                type="email"
                placeholder="ایمیل جدید را وارد کنید"
                value={newAccountEmail}
                onChange={(e) => {
                  setNewAccountEmail(e.target.value);
                }}
              />
            </div>

            <div className="edit-Form-Group-Input mt-[15px] flex items-center gap-y-[10px] w-full bg-white-50 py-0 px-5 rounded-ten">
              <span>
                <FaUnlockAlt />
              </span>
              <input
                className="w-full border-none outline-none bg-transparent py-2 px-[10px]"
                type="password"
                placeholder="رمز عبور جدید را وارد کنید"
                value={newAccountPassword}
                onChange={(e) => {
                  setNewAccountPassword(e.target.value);
                }}
              />
            </div>
          </EditModal>
        )}
      </div>
    </>
  );
}

export default Profile;
