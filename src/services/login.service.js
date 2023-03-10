/* eslint-disable prettier/prettier */
import axios from 'axios'
import { serverEndpoint } from 'src/utilities/serverEndpoint'


export const onFinishFunction = async (values) => {
  try {
    const response = await axios.post(serverEndpoint + 'url', values)
    return response
  } catch (error) {
    console.log('error in onFinishFunction : ', error)
        return error;

    }
};

export const validateTokenFunction = async () => {
    try {
        const response = await axios.post(serverEndpoint + "url", {}, {
            headers: {
     Authorization: `Bearer ${localStorage.getItem("token")}`,
     }
    })
    return response;
  } catch (error) {
    console.log('error in validateTokenFunction : ', error)
    return error
    }
}
