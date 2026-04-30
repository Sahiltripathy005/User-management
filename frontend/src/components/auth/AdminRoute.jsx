import {
useSelector,
} from "react-redux";

import {
Navigate,
} from "react-router-dom";

function AdminRoute({
children,
}) {
const { user } =
useSelector(
(state) =>
state.auth
);

if (
user?.role !==
"admin"
) {
return ( <Navigate
     to="/products"
   />
);
}

return children;
}

export default AdminRoute;
