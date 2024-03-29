export const getHeaders = () => {
  return {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
};

export const getAuthHeadersWithCookies = (cookies: any) => {
  return {
    Accept: "application/json",
    "access-token": cookies["access-token"],
    client: cookies["client"],
    "Content-Type": "application/json",
    uid: cookies["uid"],
  };
};
