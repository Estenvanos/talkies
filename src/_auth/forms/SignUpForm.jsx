import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../components/Logo";
import { useCreateUserAccount, useSignInAccount } from "../../lib/react-query/queries";
import { useUserContext } from "../../context/AuthProvider"

const SignUpValidation = z.object({
  username: z.string().min(1, "Username is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const SignUpForm = () => {
  const navigate = useNavigate();
  const { checkAuthUser } = useUserContext();
  const { mutateAsync: createUserAccount, isLoading: isCreatingAccount } = useCreateUserAccount();
  const { mutateAsync: signInAccount, isLoading: isSigningInUser } = useSignInAccount();

  const form = useForm({
    resolver: zodResolver(SignUpValidation),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values) => {
    const newUser = await createUserAccount(values);

    if (!newUser) {
      alert("Sign Up Failed, Please try again.");
      return;
    }

    const session = await signInAccount({
      email: values.email,
      password: values.password,
    });

    if (!session) {
      alert("Sign In Failed, Please try again.");
      return;
    }

    const isLoggedIn = await checkAuthUser();

    if (isLoggedIn) {
      form.reset();
      navigate("/profile");
    }
  };

  return (
    <div className="flex justify-center items-center h-[100%] w-[52.3%]">
      <div className="p-8 rounded-xl w-[70%] h-[80%]">
        <Logo />
        <h2 className="text-white text-2xl font-semibold mb-4">
          Create new account.
        </h2>
        <p className="text-[#7d7e87] text-sm mb-6">
          Already A Member?{" "}
          <Link to="/sign-in" className="text-[#4295ff]">
            Log In
          </Link>
        </p>

        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-[#7d7e87] mb-2">Username</label>
            <input
              type="text"
              placeholder="Username"
              className="w-full p-3 bg-[#2e3440] text-white rounded-lg focus:outline-none"
              {...form.register("username")}
            />
            {form.formState.errors.username && (
              <p className="text-red-500 text-sm mt-1">{form.formState.errors.username.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-[#7d7e87] mb-2">Email</label>
            <input
              type="email"
              placeholder="michal.masiak@anywhere.co"
              className="w-full p-3 bg-[#2e3440] text-white rounded-lg focus:outline-none"
              {...form.register("email")}
            />
            {form.formState.errors.email && (
              <p className="text-red-500 text-sm mt-1">{form.formState.errors.email.message}</p>
            )}
          </div>

          <div className="mb-6">
            <label className="block text-[#7d7e87] mb-2">Password</label>
            <input
              type="password"
              placeholder="********"
              className="w-full p-3 bg-[#2e3440] text-white rounded-lg focus:outline-none"
              {...form.register("password")}
            />
            {form.formState.errors.password && (
              <p className="text-red-500 text-sm mt-1">{form.formState.errors.password.message}</p>
            )}
          </div>

          <div className="flex justify-between">
            <button
              type="submit"
              className="px-4 py-2 bg-[#4295ff] text-white rounded-lg focus:outline-none transition-all duration-500 hover:bg-[#9bbbe5]"
            >
              {isCreatingAccount || isSigningInUser ? "Loading..." : "Create account"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
