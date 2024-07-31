import { Routes, Route } from "react-router-dom";

import AuthLayout from "./_auth/AuthLayout";
import SignInForm from "./_auth/forms/SignInForm";
import SignUpForm from "./_auth/forms/SignUpForm";
import ProfileRoot from "./_profile/ProfileRoot"
import ProfileConfig from "./_profile/layout/ProfileConfig"
import RootLayout from "./_root/RootLayout"
import Home from './_root/pages/Home'
import AddGroup from './_root/pages/AddGroup'
import Config from './_root/pages/Config'


const App = () => {
  return (
    <main className="flex h-screen">
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/sign-in" element={<SignInForm />} />
          <Route path="/sign-up" element={<SignUpForm />} />
        </Route>

        <Route element={<ProfileRoot />}>
          <Route path="/profile" element={<ProfileConfig />} />
        </Route>


        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="/config" element={<Config />} />
          <Route path="/add-group" element={<AddGroup />} />
        </Route>
      </Routes>
    </main>
  );
};

export default App;
