const coreUrl = process.env.NEXT_PUBLIC_API_URL;
const mockUrl = process.env.NEXT_PUBLIC_MOCK_API_URL;
const token = `Bearer ${process.env.NEXT_PUBLIC_ADMIN_TOKEN}`;

export const apiFetcher = async (url: string) => {
  try {
    const response = await fetch(`${coreUrl}${url}`, {
      headers: {
        Authorization: token,
      },
    });

    if (!response.ok) {
      if (response.status === 404) throw new Error("404, Not found");
      if (response.status === 500)
        throw new Error("500, internal server error");
      throw new Error(response.statusText);
    }

    return response.json();
  } catch (error) {
    console.error("Error: ", error);
    return;
  }
};

export const mockFetcher = async (url: string) => {
  try {
    const response = await fetch(`${mockUrl}${url}`, {
      headers: {
        Authorization: token,
      },
    });

    if (!response.ok) {
      if (response.status === 404) throw new Error("404, Not found");
      if (response.status === 500)
        throw new Error("500, internal server error");
      throw new Error(response.statusText);
    }

    return response.json();
  } catch (error) {
    console.error("Error: ", error);
    return;
  }
};
