const BASE_URL =
  "http://localhost:5000/api/v1/users";

export const signupAPI =
  async (data) => {
    const res =
      await fetch(
        `${BASE_URL}/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(
            data
          ),
        }
      );


    const result =
      await res.json();

    if (!res.ok) {
      throw new Error(
        result.message ||
        "Signup failed"
      );
    }

    return result;


  };

export const loginAPI =
  async (data) => {
    const res =
      await fetch(
        `${BASE_URL}/login`,
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(
            data
          ),
          credentials:
            "include",
        }
      );


    if (!res.ok) {
      throw new Error(
        "Login failed"
      );
    }

    return await res.json();


  };

export const logoutAPI =
  async () => {
    const res =
      await fetch(
        `${BASE_URL}/logout`,
        {
          method: "POST",
          credentials:
            "include",
        }
      );


    return await res.json();


  };

export const getProfileAPI =
  async () => {
    const res =
      await fetch(
        `${BASE_URL}/profile`,
        {
          credentials:
            "include",
        }
      );

    return await res.json();
  };

export const updateProfileAPI =
  async (data) => {
    const res =
      await fetch(
        `${BASE_URL}/${data._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type":
              "application/json",
          },
          credentials:
            "include",
          body:
            JSON.stringify(
              data
            ),
        }
      );

    const result =
      await res.json();

    if (!res.ok) {
      throw new Error(
        result.message ||
        "Update failed"
      );
    }

    return result;
  };

export const changePasswordAPI =
  async (data) => {
    const res =
      await fetch(
        `${BASE_URL}/change-password`,
        {
          method: "PUT",
          headers: {
            "Content-Type":
              "application/json",
          },
          credentials:
            "include",
          body:
            JSON.stringify(
              data
            ),
        }
      );

    const result =
      await res.json();

    if (!res.ok) {
      throw new Error(
        result.message
      );
    }

    return result;
  };