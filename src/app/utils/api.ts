export const fetchGet = async ({
  url,
  body,
  method,
}: {
  url: string;
  body?: string;
  method?: "POST" | "PUT" | "PATCH" | "DELETE";
}) => {
  const fullUrl = `${import.meta.env.VITE_API_URL}/${url}`;
  const token = localStorage.getItem("auth_token");

  try {
    const response = await fetch(fullUrl, {
      headers: {
        "Content-Type": "application/json",
        ...(url !== "login" && { Authorization: `Bearer ${token}` }),
      },
      ...(body?.length && { body }),
      ...(method?.length && { method }),
    });

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    return await response.json();
  } catch (error: any) {
    console.error(error.message);
  }
};

export const fetchPost = (url: string, data: object) => {
  const body = JSON.stringify(data);

  return fetchGet({ url, body, method: "POST" });
};

export const fetchPut = (url: string, data: object) => {
  const body = JSON.stringify(data);

  return fetchGet({ url, body, method: "PUT" });
};

export const fetchPatch = (url: string, data: object) => {
  const body = JSON.stringify(data);

  return fetchGet({ url, body, method: "PATCH" });
};

export const fetchDelete = (url: string) => {
  return fetchGet({ url, method: "DELETE" });
};
