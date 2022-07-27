import jwt_decode from 'jwt-decode';

import { client } from '../client';
import { useNavigate } from 'react-router-dom';

export const createOrGetUser = async (
    
    response: any) => {
    const decoded:{
        name: string,
        picture: string,
        sub: string
    } =  jwt_decode(response.credential);

    const { name, picture, sub } = decoded;

    const user = {
        _id: sub,
        _type: 'user',
        userName: name,
        image: picture,
    }
    client.createIfNotExists(user).then(() => {
        useNavigate('/', { replace: true });
      });
}


