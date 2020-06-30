import axios from "axios";
const weatherApi = "http://api.openweathermap.org/data/2.5/weather";
const weatherAPIKey = "6f3f23c0f1a2fcb7edee25d08cb9cf62";
const scale = "metric"; //imperial

// we can not do an axios request because it returns a promise neither can we do async await because it is also asycronus. we can not return something that is not an object you may say we are returning an object with a property of type but redux runs synchronously meaning it immediately sends the action to the dispatch and the dispatch immediately sends it to the reducer so we have to stop the process here. we have to do something to cut this off and then dispatch the action when we are DOMMatrixReadOnly.

// export default (city) => {
//    // this is the same as an http request that you would use with $ajax or the fetch api
//   // well it returns a promise so once it gets data we can attach a then and we can attach a catch and whatever it got there it will call response and response has a bunch of stuff inside it, thats why we console log it to find what we want. we are interested in the data which will be te json or actual payload that it found there.
//   const weatherUrl = `${weatherApi}?q=${city}&units=${scale}&appid=${weatherAPIKey}`;
//   axios.get(weatherUrl).then((response) => {
//     console.log(response);
//     return {
//       type: "cityUpdate",
//       payload: response.data,
//     };
//   });
// };

// this function is an action Creator
// an action is just an object with a propert of type
export default async (city) => {
  const weatherUrl = `${weatherApi}?q=${city}&units=${scale}&appid=${weatherAPIKey}`;
  const response = await axios.get(weatherUrl);
  console.log(response);
  return {
    type: "cityUpdate",
    // payload is a promise
    payload: response.data,
  };
};
