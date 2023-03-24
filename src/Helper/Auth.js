export function getUserToken() {
  const userToken = localStorage.getItem("userToken");
  return userToken;
}

export async function getUserDetail() {
  const token = getUserToken();
  if (token) {
    const response = await fetch(
      "https://api-staging-v2.sploot.space/api/v2/user",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const userData = await response.json();
    if (userData.statusCode === 200) {
      return userData.data;
    }
  }

  return {};
}

export async function getCategories() {
  const token = getUserToken();
  if (token) {
    const response = await fetch(
      "https://api-staging-v2.sploot.space/api/v2/cms/post-categories",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    return data?.data?.data;
  }
}

export async function getBlog(slugData) {
  const response = await fetch(
    `https://api-staging-v2.sploot.space/api/v2/public/cms/post-categories/${slugData}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();
  return data?.data?.data;
}
