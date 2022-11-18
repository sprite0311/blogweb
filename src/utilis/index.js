import jwt_decode from "jwt-decode";

export const createOrGetUser = async(response) => {
   const {name, picture, sub} = jwt_decode(response.credential)
   const user = {
    _id: sub,
    _type: 'user',
    userName:name,
    image:picture
   }
   console.log(user._id)
}