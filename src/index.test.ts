import { handler } from './index';

const eventMock = {
  routeKey: "POST ",
  rawPath: "/login",
  body: JSON.stringify({
    username: "igorsantos381@gmail.com",
    password: "Ab123456.",
  }),
};

handler(eventMock, null, null).then((data) => console.log(data));
