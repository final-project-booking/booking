import { sample } from 'lodash';
import { faker } from '@faker-js/faker';
import axios from 'axios';
import {getAllUser} from "../env"



const fetch=async()=>{
  try {
    const response=await axios.get(getAllUser)
    console.log(response.data);
    return response.data
  } catch (error) {
    console.log(error);
  }
}


// ----------------------------------------------------------------------
const data=await fetch()
export const users = data.map((e) => ({
  id:e.id,
  avatarUrl: e.imgUrl,
  name: e.firstName&&e.lastName,
  company:e.email,
  isVerified:e.phoneNumber,
  role:e.role,
}));
