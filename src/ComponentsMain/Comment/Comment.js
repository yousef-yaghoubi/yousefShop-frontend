import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Rating from '@mui/material/Rating';
import { AiFillDislike } from 'react-icons/ai';
import { AiFillLike } from 'react-icons/ai';
import StarRateRoundedIcon from '@mui/icons-material/StarRateRounded';
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';
import usePostData from '../../ReactQuery/usePostData';

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#ffa500',
  },
  '& .MuiRating-iconHover': {
    color: '#ffa500',
  },
});

function Comment({ id, user, body, date, hour, score, helpfulltrue, helpfullfalse }) {
  const [helpTrue, setHelpTrue] = useState(false);
  const [helpFalse, setHelpFalse] = useState(false);
  const [helpTrueQuantity, setHelpTrueQuantity] = useState(helpfulltrue);
  const [helpFalseQuantity, setHelpFalseQuantity] = useState(helpfullfalse);
  const postHelpFullTrue = usePostData();
  const postHelpFullFalse = usePostData();
  let arrayTrueLike = [];
  let arrayFalseLike = [];

  useEffect(() => {
    let arrayTrueLikeLocal = JSON.parse(localStorage.getItem('commentTrueLike'));
    if (arrayTrueLikeLocal != null) {
      let isRepetLike = arrayTrueLikeLocal.find((like) => like == id);
      if (isRepetLike != undefined) {
        setHelpTrue(true);
      }
    }

    let arrayFalseLikeLocal = JSON.parse(localStorage.getItem('commentFalseLike'));
    if (arrayFalseLikeLocal != null) {
      let isRepetDisLike = arrayFalseLikeLocal.find((like) => like == id);
      if (isRepetDisLike != undefined) {
        setHelpFalse(true);
      }
    }
  }, []);

  const helpTruePlus = () => {
    let arrayTrueLikeLocal = JSON.parse(localStorage.getItem('commentTrueLike'));
    if (arrayTrueLikeLocal == null || arrayTrueLikeLocal == undefined) {
      setHelpTrueQuantity((prev) => prev + 1);
      postHelpFullTrue.mutate({
        typePost: `comments/helptrue/${id}`,
        body: { helpfulltrue: helpTrueQuantity + 1 },
        // success: console.log('logg'),
      });
      arrayTrueLike.push(id);
      localStorage.setItem('commentTrueLike', JSON.stringify(arrayTrueLike));
    } else if (arrayTrueLikeLocal != null) {
      let isRepetLike = arrayTrueLikeLocal.find((like) => like == id);
      if (isRepetLike == undefined) {
        setHelpTrueQuantity((prev) => prev + 1);
        postHelpFullTrue.mutate({
          typePost: `comments/helptrue/${id}`,
          body: { helpfulltrue: helpTrueQuantity + 1 },
          //   success: console.log('logg'),
        });
        arrayTrueLikeLocal.push(id);
        localStorage.setItem('commentTrueLike', JSON.stringify(arrayTrueLikeLocal));
      } else {
        setHelpTrue(true);
      }
    }
  };

  const helpTrueMinus = () => {
    let arrayTrueLikeLocal = JSON.parse(localStorage.getItem('commentTrueLike'));
    setHelpTrueQuantity((prev) => prev - 1);
    postHelpFullTrue.mutate({
      typePost: `comments/helptrue/${id}`,
      body: { helpfulltrue: helpTrueQuantity - 1 },
      success: console.log('logg'),
    });
    // setBodyHelpTrue({ "helpfulltrue": helpTrueQuantity - 1 })
    if (arrayTrueLikeLocal != null) {
      let isRepetLike = arrayTrueLikeLocal.filter((like) => like != id);
      localStorage.setItem('commentTrueLike', JSON.stringify(isRepetLike));
    }
    if (arrayTrueLikeLocal == null || arrayTrueLikeLocal == undefined) {
      arrayTrueLike.push(id);
      localStorage.setItem('commentTrueLike', JSON.stringify(arrayTrueLike));
    }
  };

  const helpFalseMinus = () => {
    let arrayFalseLikeLocal = JSON.parse(localStorage.getItem('commentFalseLike'));
    setHelpFalseQuantity((prev) => prev - 1);
    postHelpFullFalse.mutate({
      typePost: `comments/helpfalse/${id}`,
      body: { helpfullfalse: helpFalseQuantity - 1 },
      success: console.log('logg'),
    });

    if (arrayFalseLikeLocal != null) {
      let isRepetDisLike = arrayFalseLikeLocal.filter((like) => like != id);
      localStorage.setItem('commentFalseLike', JSON.stringify(isRepetDisLike));
    }
    if (arrayFalseLikeLocal == null || arrayFalseLikeLocal == undefined) {
      arrayFalseLike.push(id);
      localStorage.setItem('commentFalseLike', JSON.stringify(arrayFalseLike));
    }
  };
  const helpFalsePlus = () => {
    let arrayFalseLikeLocal = JSON.parse(localStorage.getItem('commentFalseLike'));
    if (arrayFalseLikeLocal == null || arrayFalseLikeLocal == undefined) {
      setHelpFalseQuantity((prev) => prev + 1);

      postHelpFullFalse.mutate({
        typePost: `comments/helpfalse/${id}`,
        body: { helpfullfalse: helpFalseQuantity + 1 },
      });

      arrayFalseLike.push(id);
      localStorage.setItem('commentFalseLike', JSON.stringify(arrayFalseLike));
    } else if (arrayFalseLikeLocal != null) {
      let isRepetLike = arrayFalseLikeLocal.find((like) => like == id);

      if (isRepetLike == undefined) {
        postHelpFullFalse.mutate({
          typePost: `comments/helpfalse/${id}`,
          body: { helpfullfalse: helpFalseQuantity + 1 },
          success: console.log('logg'),
        });

        arrayFalseLikeLocal.push(id);
        localStorage.setItem('commentFalseLike', JSON.stringify(arrayFalseLikeLocal));
        setHelpFalseQuantity((prev) => prev + 1);
      } else {
        setHelpFalse(true);
      }
    }
  };
  return (
    <div className=" w-76 lg:w-96 mt-4 p-4 md:mr-10 h-fit flex flex-col  relative border-b-2 border-solid border-[rgb(223,223,223)]">
      <div>
        <div className="flex flex-row items-center">
          <img src="https://ucarecdn.com/0e9ba612-d486-4f31-a44a-e5dcc5a9f1a6/-/preview/512x512/" alt="empty" className="w-8" />
          <span className="">{user}</span>
        </div>
        <div>
          <StyledRating
            className="flex flex-row-reverse mt-2"
            name="customized-color"
            defaultValue={score}
            precision={1}
            icon={<StarRateRoundedIcon fontSize="small" />}
            emptyIcon={<StarBorderRoundedIcon fontSize="small" />}
            readOnly
          />
        </div>
        <span className="mr-2">{date}</span>
      </div>

      <p className=" mt-8 font-yekanBakhLight font-bold">{body}</p>

      <div className="mt-8  justify-between w-fit flex flex-col h-16">
        <span>این نظر برای شما مفید بود؟</span>

        <div className="flex justify-between w-[85px]" id={id}>
          <div
            className={` w-10 h-5 flex flex-row items-stretch justify-around rounded-md border-solid border cursor-pointer ${
              helpTrue == true ? 'border-green-600' : 'border-[rgb(202,205,209)]'
            }`}
            onClick={() => {
              setHelpTrue((prev) => !prev);
              helpTrue == false ? helpTruePlus() : helpTrueMinus();
            }}>
            <span className={`${helpTrue == true ? 'text-green-600' : ' text-black'}`}>{helpTrueQuantity}</span>
            <AiFillLike className={`${helpTrue == true ? 'text-green-600' : 'text-neutral-400'}`} />
          </div>

          <div
            className={` w-10 h-5 flex flex-row items-stretch justify-around rounded-md border-solid border cursor-pointer ${
              helpFalse == true ? 'border-red-600' : 'border-[rgb(202,205,209)]'
            }`}
            onClick={() => {
              setHelpFalse((prev) => !prev);
              helpFalse == false ? helpFalsePlus() : helpFalseMinus();
            }}>
            <span className={`${helpFalse == true ? 'text-red-600' : ' text-black'}`}>{helpFalseQuantity}</span>
            <AiFillDislike className={`${helpFalse == true ? 'text-red-600' : 'text-neutral-400'}`} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Comment;
