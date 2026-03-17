import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "../components/Layout";
import FormPage from "../pages/FormPage";
import TablePage from "../pages/TablePage";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<FormPage />} />
          <Route path="table" element={<TablePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;