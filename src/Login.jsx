import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "sonner";
import { IoArrowBackOutline } from "react-icons/io5";
import axios from "axios";
import authSlice from "./redux/authSlice";
import { useDispatch } from "react-redux";
import { ThreeDots, useLoading } from "@agney/react-loading";

const steps = ["احراز هویت", "تکمیل اطلاعات", "ثبت سفارش"];
function Login() {
  const navigate = useNavigate();
  const [inputSetUserName, setInputSetUserName] = useState("");
  const [inputSetFirstName, setInputSetFirstName] = useState("");
  const [inputSetLastName, setInputSetLastName] = useState("");
  const [showStep, setShowStep] = useState(0);
  const [inputSetPass1, setInputSetPass1] = useState("");
  const [inputSetPass2, setInputSetPass2] = useState("");
  const [inputSetNumber, setInputSetNumber] = useState(0);
  const [inputEmail, setInputEmail] = useState("");
  const [inputPass, setInputPass] = useState("");
  const [direct, setDirect] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    let profile = JSON.parse(localStorage.getItem("profile"));
    if (profile != undefined && profile != null) {
      navigate("/profile");
    }
  }, []);

  const { containerProps: containerProps2, indicatorEl: indicatorEl2 } =
    useLoading({
      loading: true,
      indicator: <ThreeDots width="30" color="white" height="40" />,
    });

  function validationEmailSubmit() {
    setIsLoading(true);
    if (
      inputEmail.length > 7 &&
      inputEmail.includes("@") &&
      inputEmail.includes(".") &&
      /[a-z]/g.test(inputEmail) &&
      !/[\u0600-\u06FF]/.test(inputEmail)
    ) {
      setShowStep(2);
    } else {
      toast.warning("نوع ایمیل اشتباه است");
    }
    setIsLoading(false);
  }

  const validationNameSubmit = async () => {
    setIsLoading(true);
    let isReepet;
    await fetch(`/api/users/user=${inputSetUserName}`)
      .then((res) => res.json())
      .then(async (result) => (isReepet = result));
    if (
      !/[/$%^&*()_@.,#<>:"|;!~`?'\[\]{}]/.test(inputSetFirstName) &&
      /[\u0600-\u06FF]/.test(inputSetFirstName) &&
      !/[-?\d+(\.\d+)?]/.test(inputSetFirstName) &&
      !/[a-z]/g.test(inputSetFirstName) &&
      inputSetFirstName.length > 2 &&
      !/[/$%^&*()_@.,#<>:"|;!~`?'\[\]{}]/.test(inputSetLastName) &&
      !/[a-z]/g.test(inputSetLastName) &&
      !/[-?\d+(\.\d+)?]/.test(inputSetLastName) &&
      /[\u0600-\u06FF]/.test(inputSetLastName) &&
      inputSetLastName.length > 2
    ) {
      if (
        inputSetUserName.length > 3 &&
        !/[\u0600-\u06FF]/.test(inputSetUserName) &&
        /[a-z]/g.test(inputSetUserName) &&
        isReepet
      ) {
        setShowStep(3);
      } else {
        toast.warning("نام کاربری تکراری یا اشتباه است");
      }
    } else {
      toast.warning("نام یا نام خانوادگی اشتباه است");
    }
    setIsLoading(false);
  };

  const validationPasswordSubmit = () => {
    setIsLoading(true);
    if (
      inputSetPass1.length > 7 &&
      !/[\u0600-\u06FF]/.test(inputSetPass1) &&
      /[a-z]/g.test(inputSetPass1) &&
      /[A-Z]/g.test(inputSetPass1)
    ) {
      if (inputSetPass2 === inputSetPass1) {
        const body = JSON.stringify({
          firstname: inputSetFirstName,
          lastname: inputSetLastName,
          username: inputSetUserName,
          password: inputSetPass1,
          phone: inputSetNumber,
          city: "empty",
          email: inputEmail,
          address: "empty",
          score: 0,
          buy: 0,
        });
        let headers = {
          headers: {
            "Content-Type": "application/json",
          },
        };

        axios.post(`/api/users`, body, headers).then((res) => {
          if (res.status == 200) {
            fetch(`/api/users/${inputEmail}/${inputSetPass1}`)
              .then((res) => res.json())
              .then((result) => {
                dispatch(
                  authSlice.actions.addAuth(result[1] * 87461946194645613),
                  localStorage.setItem(
                    "profile",
                    JSON.stringify(result[1] * 87461946194645613)
                  ),
                  navigate("../")
                );
              });
          }
        });
      } else {
        toast.warning("تکرار رمز با رمز عبور مطابقت ندارد");
      }
    } else {
      toast.warning("نوع رمز عبور اشتباه است");
    }
    setIsLoading(false);
  };

  return (
    <>
      <div className="h-screen flex flex-row-reverse select-none text-gray-800">
        <Toaster
          position="top-center"
          dir="rtl"
          visibleToasts={1}
          richColors
          expand={true}
          toastOptions={{
            style: {
              height: "4em",
              paddingRight: "1em",
              marginTop: "6em",
              marginBottom: "3em",
            },
          }}
        />
        <div className="hidden lg:flex justify-center items-center h-full w-[70%] rounded-tr-3xl rounded-br-3xl z-0 bg-orange-theme">
          <div className=" w-96 flex items-center flex-col">
            <ul className="relative flex flex-row gap-x-2 mr-16 w-96">
              {steps?.map((lable, index) => (
                <li className="shrink basis-0 flex-1 group" key={index}>
                  <div className="min-w-7 min-h-7 w-full inline-flex items-center text-xs align-middle">
                    <span
                      className={`size-7 flex justify-center items-center flex-shrink-0 ${
                        index !== 0
                          ? " bg-orange-theme-50 text-white"
                          : "bg-gray-100 text-gray-800"
                      } font-bold font-sans rounded-full dark:bg-gray-700 dark:text-white`}
                    >
                      {index + 1}
                    </span>
                    <div className="ms-2 w-full h-px flex-1 bg-gray-200 group-last:hidden dark:bg-gray-700"></div>
                  </div>
                  <div className="mt-3">
                    <span
                      className={`block text-sm font-medium ${
                        index === 0 ? "text-white" : "text-black"
                      }  dark:text-white`}
                    >
                      {lable}
                    </span>
                  </div>
                </li>
              ))}
            </ul>

            <img
              src="https://ucarecdn.com/62dfa2d8-34f0-436f-906b-886916deeb34/-/preview/536x613/"
              alt="security"
              width={200}
            />

            <div>
              <h1 className="text-xl flex justify-center">
                ثبت نام یا ورود به یوسف شاپ
              </h1>
              <p className=" font-yekanBakhLight flex text-center mt-6">
                سایت نمونه کار یوسف شاپ یک سایت فروشگاهی هست که توسط یوسف یعقوبی
                ساخته شده.
              </p>
            </div>
          </div>
        </div>
        <div className="h-full w-full lg:w-[30%] lg:bg-gray-100 bg-white flex items-center justify-center lg:justify-end">
          <div className=" w-full max-w-sm lg:ml-[-200px] z-20 relative bg-[rgb(237 237 237)] rounded-ten">
            <div className="bg-white rounded-ten p-8 w-full">
              <h2 className="  text-2xl flex justify-center mt-2 mb-6">
                یوسف شاپ
              </h2>
              {showStep == 0 && (
                <>
                  <p className=" font-yekanBakhLight text-secondary-900 font-bold mb-4">
                    ورود | ثبت نام
                  </p>
                  <div className="py-4">
                    <p className=" font-yekanBakhLight text-gray-800 mb-2 text-sm">
                      سلام!
                    </p>
                    <p className=" font-yekanBakhLight text-gray-800 mb-2 text-sm">
                      لطفا ایمیل خود را وارد کنید
                    </p>
                    <input
                      type="email"
                      autoFocus
                      onChange={(e) => setInputEmail(e.target.value)}
                      className={`${
                        inputEmail !== "" &&
                        inputEmail.length > 7 &&
                        inputEmail.includes("@") &&
                        inputEmail.includes(".") &&
                        /[a-z]/g.test(inputEmail) &&
                        !/[\u0600-\u06FF]/.test(inputEmail)
                          ? " border-green-600 focus:shadow-inputTrue"
                          : " border-red-600 focus:shadow-inputFalse"
                      } border w-full h-10 bg-[rgb(243,244,246)] rounded-xl outline-none font-yekanBakhLight font-bold transition-all duration-200 px-2 focus:bg-white focus:border`}
                      dir="ltr"
                    />
                    <button
                      className="w-full mb-4 mt-8  h-10 rounded-xl bg-orange-theme text-white"
                      onClick={() => {
                        setIsLoading(true);
                        fetch(`/api/users/${inputEmail}`)
                          .then((res) => res.json())
                          .then((result) =>
                            result == false
                              ? validationEmailSubmit()
                              : setShowStep(1)
                          )
                          .finally(() => setIsLoading(false));
                      }}
                    >
                      {isLoading ? (
                        <section
                          {...containerProps2}
                          className="flex justify-center w-full content-center"
                        >
                          {indicatorEl2} {/* renders only while loading */}
                        </section>
                      ) : (
                        "ورود"
                      )}
                    </button>
                  </div>
                </>
              )}
              {showStep == 1 && (
                <>
                  <div className="py-4">
                    <div className="flex justify-between">
                      <p className=" font-yekanBakhBlack text-gray-800 mb-2 text-lg">
                        {" "}
                        ورود
                      </p>
                      <IoArrowBackOutline
                        className=" text-orange-theme cursor-pointer"
                        onClick={() => setShowStep(0)}
                      />
                    </div>
                    {/* <p className=' font-yekanBakhLight text-gray-800 mb-2 text-sm'>سلام!</p> */}
                    <p className=" font-yekanBakhLight text-gray-800 mb-2 text-sm">
                      لطفا رمزعبور خود را وارد کنید
                    </p>
                    <input
                      type="password"
                      id="inputPassword"
                      autoFocus
                      onChange={(e) => {
                        setInputPass(e.target.value);
                      }}
                      className={`  border-orange-theme border w-full h-10 bg-[rgb(243,244,246)] rounded-xl outline-none font-yekanBakhLight font-bold transition-all duration-200 px-2 focus:bg-white focus:border`}
                      dir="ltr"
                    />
                    {/* <li className={`font-yekanBakhLight text-sm mt-4 leading-loose`}>دقت کنید که رمز عبور باید دارای کلمات کوچک، کلمات بزرگ، اعداد و حداقل 8 کاراکتر باشد.</li> */}
                    <button
                      className="w-full mb-4 mt-8  h-10 rounded-xl bg-orange-theme text-white"
                      onClick={() => {
                        setIsLoading(true);
                        fetch(`/api/users/${inputEmail}/${inputPass}`)
                          .then((res) => res.json())
                          .then((result) =>
                            result == false
                              ? toast.warning("رمز عبور شما اشتباه است.")
                              : dispatch(
                                  authSlice.actions.addAuth(
                                    result[1] * 87461946194645613
                                  ),
                                  localStorage.setItem(
                                    "profile",
                                    JSON.stringify(
                                      result[1] * 87461946194645613
                                    )
                                  ),
                                  navigate("../")
                                )
                          )
                          .finally(() => setIsLoading(false));
                      }}
                    >
                      {isLoading ? (
                        <section
                          {...containerProps2}
                          className="flex justify-center w-full content-center"
                        >
                          {indicatorEl2} {/* renders only while loading */}
                        </section>
                      ) : (
                        "ورود"
                      )}
                    </button>
                  </div>
                </>
              )}

              {showStep == 2 && (
                <>
                  <div className="py-4">
                    <div className="flex justify-between">
                      <p className=" font-yekanBakhBlack text-gray-800 mt-2 text-lg">
                        {" "}
                        ثبت نام
                      </p>
                      <IoArrowBackOutline
                        className=" text-orange-theme cursor-pointer"
                        onClick={() => setShowStep(0)}
                      />
                    </div>
                    <p className=" font-yekanBakhLight text-gray-800 mt-2 text-sm">
                      لطفا نام خود را وارد کنید*(فارسی)
                    </p>
                    <input
                      type="text"
                      autoFocus
                      onChange={(e) => setInputSetFirstName(e.target.value)}
                      className={`${
                        !/[/$%^&*()_@.,#<>:"|;!~`?'\[\]{}]/.test(
                          inputSetFirstName
                        ) &&
                        !/[-?\d+(\.\d+)?]/.test(inputSetFirstName) &&
                        /[\u0600-\u06FF]/.test(inputSetFirstName) &&
                        !/[a-z]/g.test(inputSetFirstName) &&
                        inputSetFirstName.length > 2
                          ? " border-green-600 focus:shadow-inputTrue"
                          : " border-red-600 focus:shadow-inputFalse"
                      } border w-full h-10 bg-[rgb(243,244,246)] rounded-xl outline-none  font-yekanBakhLight font-bold transition-all duration-200 px-2 focus:bg-white focus:border`}
                      dir="rtl"
                    />

                    <p className=" font-yekanBakhLight text-gray-800 mt-2 text-sm">
                      لطفا نام خانوادگی خود را وارد کنید*(فارسی)
                    </p>
                    <input
                      type="text"
                      lang="fa"
                      onChange={(e) => {
                        setInputSetLastName(e.target.value);
                      }}
                      className={` ${
                        !/[/$%^&*()_@.,#<>:"|;!~`?'\[\]{}]/.test(
                          inputSetLastName
                        ) &&
                        !/[a-z]/g.test(inputSetLastName) &&
                        !/[-?\d+(\.\d+)?]/.test(inputSetLastName) &&
                        /[\u0600-\u06FF]/.test(inputSetLastName) &&
                        inputSetLastName.length > 2
                          ? " border-green-600 focus:shadow-inputTrue"
                          : " border-red-600 focus:shadow-inputFalse"
                      } border w-full h-10 bg-[rgb(243,244,246)] rounded-xl outline-none font-yekanBakhLight font-bold transition-all duration-200 px-2 focus:bg-white focus:border`}
                      dir="rtl"
                    />

                    <p
                      className={` font-yekanBakhLight text-gray-800 mt-2 text-sm `}
                    >
                      لطفا نام کاربری خود را وارد کنید*(انگلیسی)
                    </p>
                    <input
                      type="text"
                      onChange={(e) => setInputSetUserName(e.target.value)}
                      className={` focus:shadow-input border border-orange-theme w-full h-10 bg-[rgb(243,244,246)] rounded-xl outline-none font-yekanBakhLight font-bold transition-all duration-200 px-2 focus:bg-white focus:border`}
                      dir="ltr"
                    />

                    <button
                      className="w-full mb-4 mt-8  h-10 rounded-xl bg-orange-theme text-white"
                      onClick={validationNameSubmit}
                    >
                      {isLoading ? (
                        <section
                          {...containerProps2}
                          className="flex justify-center w-full content-center"
                        >
                          {indicatorEl2} {/* renders only while loading */}
                        </section>
                      ) : (
                        "ادامه"
                      )}
                    </button>
                  </div>
                </>
              )}

              {showStep == 3 && (
                <>
                  <div className="flex justify-between items-center mb-2">
                    <p className=" font-yekanBakhLight text-gray-800 mt-2 text-sm">
                      لطفا رمز عبور خود را وارد کنید*
                    </p>
                    <IoArrowBackOutline
                      className="text-orange-theme cursor-pointer"
                      onClick={() => setShowStep(2)}
                    />
                  </div>
                  <input
                    type="password"
                    autoFocus
                    onChange={(e) => {
                      setInputSetPass1(e.target.value);
                    }}
                    className={` ${
                      inputSetPass1.length > 7 &&
                      !/[\u0600-\u06FF]/.test(inputSetPass1) &&
                      /[a-z]/g.test(inputSetPass1) &&
                      /[A-Z]/g.test(inputSetPass1)
                        ? " border-green-600 focus:shadow-inputTrue"
                        : " border-red-600 focus:shadow-inputFalse"
                    } border w-full h-10 bg-[rgb(243,244,246)] rounded-xl outline-none font-yekanBakhLight font-bold transition-all duration-200 px-2 focus:bg-white focus:border`}
                    dir="ltr"
                  />

                  <p className=" font-yekanBakhLight text-gray-800 mt-2 text-sm">
                    لطفا تکرار رمز عبور خود را وارد کنید*
                  </p>
                  <input
                    type="password"
                    onChange={(e) => {
                      setInputSetPass2(e.target.value);
                    }}
                    className={` ${
                      inputSetPass1 === inputSetPass2 && inputSetPass2 !== ""
                        ? " border-green-600 focus:shadow-inputTrue"
                        : " border-red-600 focus:shadow-inputFalse"
                    } border w-full h-10 bg-[rgb(243,244,246)] rounded-xl outline-none font-yekanBakhLight font-bold transition-all duration-200 px-2 focus:bg-white focus:border`}
                    dir="ltr"
                  />

                  <ul className="font-yekanBakhBold text-xs mt-6">
                    <li>
                      *رمز عبور باید شامل حروف بزرگ و کوچک انگلیسی و عدد باشد
                    </li>
                    <li>*رمز عبور باید شامل حداقل 8 حرف باشد</li>
                  </ul>

                  <button
                    className="w-full mb-4 mt-8  h-10 rounded-xl bg-orange-theme text-white"
                    onClick={validationPasswordSubmit}
                  >
                    ثبت نام
                  </button>
                </>
              )}
              {direct === true ? navigate("/") : ""}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
