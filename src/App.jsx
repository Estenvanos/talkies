import { Routes, Route } from "react-router-dom";

import SignInForm from "./_auth/forms/SignInForm";
import SignUpForm from "./_auth/forms/SignUpForm";
import AuthLayout from "./_auth/AuthLayout";
import RootLayout from "./_root/RootLayout";
import Home from './_root/pages/Home'
import Config from './_root/pages/Config'
import AddGroup from './_root/pages/AddGroup'
import ProfileConfig from './_root/pages/ProfileConfig'

const App = () => {
  return (
    <main className="flex h-screen">
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/sign-in" element={<SignInForm />} />
          <Route path="/sign-up" element={<SignUpForm />} />
          <Route path="/profile" element={<ProfileConfig />} />
        </Route>

        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route index element={<Config />} />
          <Route index element={<AddGroup />} />
        </Route>
      </Routes>
    </main>
  );
};

export default App;
