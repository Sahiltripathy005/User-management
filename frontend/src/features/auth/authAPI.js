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

 
if (!res.ok) {
  throw new Error(
    "Signup failed"
  );
}

return await res.json();
 

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
async (id) => {
const res =
await fetch(
`${BASE_URL}/profile/${id}`
);

 
return await res.json();
 

};
