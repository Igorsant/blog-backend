import { handler } from './index';

const eventMock = {
  routeKey: "POST ",
  rawPath: "/signup",
  body: {
    username: "igorsantos",
    email: "igorsantos381@gmail.com",
    password: "Ab123456.",
  },
};

handler(eventMock, null, null).then((data) => console.log(data));
