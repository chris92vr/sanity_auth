import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import shareVideo from '../assets/share.mp4';
import logo from '../assets/logowhite.png';
import { client } from '../client';

import jwt_decode from 'jwt-decode';
const Login = () => {
  const navigate = useNavigate();
  const responseGoogle = (response) => {
    localStorage.setItem('user', JSON.stringify(response.profileObj));
    const decoded: {
      name: string,
      picture: string,
      sub: string,
    } = jwt_decode(response.credential);

    const { name, picture, sub } = decoded;

    const doc = {
      _id: sub,
      _type: 'user',
      userName: name,
      image: picture,
    };

    client.createIfNotExists(doc).then(() => {
      navigate('/', { replace: true });
    });
  };
  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className="relative w-full h-full">
        <video
          src={shareVideo}
          type="video/mp4"
          autoPlay
          loop
          muted
          className="object-cover w-full h-full"
          controls={false}
        />
        <div className="absolute top-0 flex flex-col left-0 right-0 bottom-0 bg-blackOverlay justify-center items-center">
          <div className="p-5">
            <img src={logo} alt="logo" />
          </div>
          <div className="shadow-2xl">
            <GoogleLogin
              onSuccess={(response) => responseGoogle(response)}
              onError={() => console.log('Error')}
            >
              <button>
                <FcGoogle className="text-black" />
                Sign in with Google!
              </button>
            </GoogleLogin>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
