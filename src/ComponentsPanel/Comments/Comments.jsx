import React, { useEffect, useState } from 'react';
import Errorbox from '../ErrorBox/Errorbox';
import DetealModal from '../DetealModal/DetealModal';
import DeleteModal from '../DeleteModal/DeleteModal';
import EditModal from '../EditModal/EditModal';
import useGetData from '../../ReactQuery/useGetData';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

export default function Comments() {
  const [allComments, setAllComments] = useState([]);
  const [isShowDetailsModal, setIsShowDetailsModal] = useState(false);
  const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
  const [isShowAcceptModal, setIsShowAcceptModal] = useState(false);
  const [isShowRejectModal, setIsShowRejectModal] = useState(false);
  const [isShowEditBodyModal, setIsShowEditBodyModal] = useState(false);
  const [mainCommentBody, setMainCommentBody] = useState('');
  const [commentId, setCommentId] = useState('');
  const fetchComment = useGetData('comments');

  useEffect(() => {
    if (fetchComment.data) {
      setAllComments(fetchComment.data);
    }
  }, [fetchComment.data]);

  const deleteComment = () => {
    fetch(`/api/comments/${commentId}`, {
      method: 'DELETE',
    }).then((res) => {
      if (res.status == 200) {
        fetchComment.refetch();
      }
    });
    setIsShowDeleteModal(false);
  };
  const AcceptModalSubmitAction = () => {
    fetch(`/api/comments/accept/${commentId}`, {
      method: 'POST',
    }).then((res) => res.json());
    fetchComment.refetch();
    setIsShowAcceptModal(false);
  };

  const RejectModalSubmitAction = () => {
    fetch(`/api/comments/reject/${commentId}`, {
      method: 'POST',
    }).then((res) => res.json());
    fetchComment.refetch();
    setIsShowRejectModal(false);
  };

  const EditBodyModalSubmitAction = (event) => {
    event.preventDefault();
    // setBody(mainCommentBody)
    fetch(`/api/comments/${commentId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        body: mainCommentBody,
      }),
    }).then((res) => {
      if (res.status == 200) {
        fetchComment.refetch();
      }
    });
    setIsShowEditBodyModal(false);
  };

  return (
    <div className=" mt-[60px] p-5 rounded-[20px]">
      <h1 className=" text-xl md:text-[2em]">لیست کامنت ها</h1>
      {allComments.length ? (
        <TableContainer component={Paper} className=" mt-8">
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center" className=" !font-yekanBakhBlack ">
                  اسم کاربر
                </TableCell>
                <TableCell align="center" className=" !font-yekanBakhBlack ">
                  محصول
                </TableCell>
                <TableCell align="center" className=" !font-yekanBakhBlack ">
                  کامنت
                </TableCell>
                <TableCell align="center" className=" !font-yekanBakhBlack ">
                  تاریخ
                </TableCell>
                <TableCell align="center" className=" !font-yekanBakhBlack ">
                  ساعت
                </TableCell>
                <TableCell align="center" className=" !font-yekanBakhBlack ">
                  بیشتر
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {allComments?.map((comment) => (
                <TableRow className="flex flex-row items-center" key={comment.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" align="center" className=" !font-yekanBakhBlack  !w-1/4">
                    {comment.userID}
                  </TableCell>

                  <TableCell align="center" className=" !font-yekanBakhBold !w-1/4">
                    {comment.productID}
                  </TableCell>
                  <TableCell align="center" className=" !font-yekanBakhBold !w-1/4">
                    <button
                      onClick={() => {
                        setMainCommentBody(comment.body);
                        setIsShowDetailsModal(true);
                      }}
                      className="bg-orange-theme text-white py-2 px-4 rounded-ten border-none outline-none mr-5">
                      دیدن متن
                    </button>
                  </TableCell>

                  <TableCell align="center" className=" !font-yekanBakhBold !w-1/4">
                    {comment.date}
                  </TableCell>
                  <TableCell align="center" className=" !font-yekanBakhBold !w-1/4">
                    {comment.hour}
                  </TableCell>
                  <TableCell align="center" className=" !font-yekanBakhBold !flex flex-row !w-fit !h-36 items-center">
                    <button
                      onClick={() => {
                        setIsShowDeleteModal(true);
                        setCommentId(comment.id);
                      }}
                      className="bg-orange-theme text-white py-2 px-4 rounded-ten border-none outline-none mr-5">
                      حذف
                    </button>
                    <button
                      onClick={() => {
                        setIsShowEditBodyModal(true);
                        setCommentId(comment.id);
                        setMainCommentBody(comment.body);
                      }}
                      className="bg-orange-theme text-white py-2 px-4 rounded-ten border-none outline-none mr-5">
                      ویرایش
                    </button>
                    <button className="bg-orange-theme text-white py-2 px-4 rounded-ten border-none outline-none mr-5">پاسخ</button>
                    {comment.isAccept === 0 ? (
                      <button
                        onClick={() => {
                          setIsShowAcceptModal(true);
                          setCommentId(comment.id);
                        }}
                        className="bg-orange-theme text-white py-2 px-4 rounded-ten border-none outline-none mr-5">
                        تایید
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setIsShowRejectModal(true);
                          setCommentId(comment.id);
                        }}
                        className="bg-white text-orange-theme py-2 px-4 rounded-ten border-2 border-solid border-orange-theme outline-none mr-5"
                        // className="Btn-Accept"
                      >
                        رد
                      </button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Errorbox msg="هیچ کامنتی یافت نشد" />
      )}

      {isShowDetailsModal && (
        <DetealModal onHide={() => setIsShowDetailsModal(false)}>
          <p className=" w-[400px] p-6 bg-white leading-6 text-justify">{mainCommentBody}</p>
          <button
            className="w-full px-[10px] py-0 bg-orange-theme text-white mt-5 text-lg border-none outline-none rounded-ten"
            onClick={() => setIsShowDetailsModal(false)}>
            بستن
          </button>
        </DetealModal>
      )}
      {isShowDeleteModal && (
        <DeleteModal modalShow={deleteComment} modalNotShow={() => setIsShowDeleteModal(false)}>
          <h1 className=" text-[1.3rem]">آیا از حذف اطمینان دارید؟</h1>
        </DeleteModal>
      )}
      {isShowAcceptModal && (
        <DeleteModal modalShow={AcceptModalSubmitAction} modalNotShow={() => setIsShowAcceptModal(false)}>
          <h1 className=" text-[1.3rem]">آیا از تایید اطمینان دارید؟</h1>
        </DeleteModal>
      )}

      {isShowRejectModal && (
        <DeleteModal modalShow={RejectModalSubmitAction} modalNotShow={() => setIsShowRejectModal(false)}>
          <h1 className=" text-[1.3rem]">آیا از رد کردن اطمینان دارید؟</h1>
        </DeleteModal>
      )}
      {isShowEditBodyModal && (
        <EditModal onSubmit={EditBodyModalSubmitAction} onClose={() => setIsShowEditBodyModal(false)}>
          <textarea
            defaultValue={mainCommentBody}
            onChange={(e) => setMainCommentBody(e.target.value)}
            className=" p-4 outline-orange-theme max-h-52"></textarea>
        </EditModal>
      )}
    </div>
  );
}
