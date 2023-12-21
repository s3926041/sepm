import React, { useState } from "react";
import { message, Steps, theme } from "antd";
import CreateAccount from "./CreateAccount";
import UploadPhotos from "./UploadPhotos";
import Preferences from "./Preferences";
import gmatch from "../../Assest/gmatch.svg";
import { register } from "../../api/auth";
const steps = [
  {
    title: "First",
    content: "First-content",
  },
  {
    title: "Second",
    content: "Second-content",
  },
  {
    title: "Last",
    content: "Last-content",
  },
];

export default function CreateProfile() {
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);

  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState(1);
  const [With, setWith] = useState("");
  const [level, setLevel] = useState("");
  const [game, setGame] = useState("");
  const [phone, setPhone] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [preferences, setPreferences] = useState({
    name: true,
    gender: true,
    level: true,
    game: true,
    age: true,
    With: true,
    password: true,
    email: true,
    avatar: true,
    phone: true,
  });

  const validatePreferences = () => {
    let checkname,
      checkgender,
      checklevel,
      checkgame,
      checkage,
      checkwith,
      checkphone = true;
    let res = true;
    // if(name === ""){
    //     res = checkname = false;

    // }
    // if(gender === ""){
    //     res = checkgender =false;
    // }
    // if(game === ""){
    //     res = checkgame = false;
    // }
    // if(level === ""){
    //     res = checklevel = false;
    // }
    // if(age < 18){
    //     res = checkage = false;
    // }
    // if(With === ""){
    //     res = checkwith = false;
    // }
    // if(phone === ""){
    //     res = checkphone = false;
    // }
    // alert(res);
    setPreferences({
      name: checkname,
      gender: checkgender,
      level: checklevel,
      game: checkgame,
      age: checkage,
      With: checkwith,
    });
    return res;
  };

  const validateAvatar = () => {
    let checkava = true;
    if (avatar === null) {
        checkava = false;
    }
    setPreferences({avatar: checkava});
    return checkava;
  };

  const validateAccount = () => {
    let checkemail,
      checkpass = true;
    let res = true;
    // // if (email.includes()) {
    // //     res = checkemail = false;
    // // }
    // if (password.length < 6) {
    //     res = checkpass = false;
    // }

    setPreferences({ email: checkemail, password: checkpass });
    return res;
  };

  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };
  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));

  return (
    <>
      <div className="w-full">
        <Steps
          current={current}
          items={items}
          style={{ width: "75%", margin: "2rem auto" }}
        />
      </div>

      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src={gmatch}
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            {current == 0 && <span>Create your Account</span>}
            {current == 1 && <>Upload Your Images</>}
            {current == 2 && <>Create Your Profile</>}
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          {current == 0 && (
            <CreateAccount
              setEmail={setEmail}
              setPassword={setPassword}
              preferences={preferences}
            />
          )}

          {current == 1 && (
            <>
              <UploadPhotos setAvatar={setAvatar} preferences={preferences} />
            </>
          )}

          {current == 2 && (
            <>
              <Preferences
                setGame={setGame}
                setAge={setAge}
                setGender={setGender}
                setName={setName}
                setPhone={setPhone}
                setLevel={setLevel}
                setWith={setWith}
                preferences={preferences}
              />
            </>
          )}

          <div className="buttons mt-5">
            {current > 0 && (
              <button
                type="submit"
                className="flex mt-2 w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={() => prev()}
              >
                Previous
              </button>
            )}

            {current < steps.length - 1 && (
              <button
                type="submit"
                className="flex mt-2 w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={() => {
                  if (current == 0) {
                    if (validateAccount()) {
                      next();
                    }
                  } else if (current == 1) {
                    if (validateAvatar()) {
                      next();
                    }
                  }
                }}
              >
                Next <span aria-hidden="true">&rarr;</span>
              </button>
            )}

            {current === steps.length - 1 && (
              <button
                type="submit"
                className=" mt-2 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={async () => {
                  if (validatePreferences()) {
                    const data = await register({
                      name,
                      gender,
                      email,
                      password,
                      phone,
                    },avatar);
                    console.log({
                        name,
                        gender,
                        email,
                        password,
                        phone,
                    })
                    if (data != null) message.success("Processing complete!");
                  } else {
                    message.error("Please Check your info");
                  }
                }}
              >
                Done
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
