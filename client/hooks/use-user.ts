import { ListResponse, User } from "@/interfaces/index";
import { AuthApi, LoginPayload } from "@/services/auth-api";
import { UserApi } from "@/services/users-api";
import Cookie from "js-cookie";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import useSWR from "swr";

export const useAuth = () => {
  const {
    data: profile,
    mutate,
    isValidating,
    error,
  } = useSWR<ListResponse<User | null>>("/profile", {
    // dedupingInterval:2000,
    // revalidateIfStale: false,
    revalidateOnFocus: false,
  });

  const router = useRouter();

  const login = async (formValues: LoginPayload) => {
    let err = "";
    // Call api login
    try {
      const { data, message } = await AuthApi.login(formValues);

      const { accessToken, refreshToken } = data;

      // Save accessToken to localStorage
      localStorage.setItem(
        process.env.TOKEN_NAME as string,
        JSON.stringify(accessToken)
      );

      // Save refreshToken to cookies
      Cookie.set("refreshToken", refreshToken, {
        path: "/",
        sameSite: "lax",
        expires: 7,
      });

      // Show message
      toast.success(message);

      // Get data
      mutate();
    } catch (error: any) {
      toast.error(error.response.data.message);
      err = error.response.data.message;
    }

    return err;
  };

  const register = async (formValues: User) => {
    let err = "";
    // Call api register
    try {
      const { message } = await AuthApi.register(formValues);

      // Show message
      toast.success(message);
    } catch (error: any) {
      toast.error(error.response.data.message);
      err = error.response.data.message;
    }
    return err;
  };

  const logout = () => {
    localStorage.removeItem(process.env.TOKEN_NAME as string);

    Cookie.remove("refreshToken");

    mutate(
      {
        data: null,
        message: "Logout successfully",
      },
      false
    );

    router.push("/");
  };

  const editProfile = async (userUpdate: Partial<User>) => {
    // Call api register
    try {
      const { message } = await UserApi.editProfile(userUpdate);

      // Show message
      toast.success(message);

      // Get profile
      mutate();
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  return {
    mutate,
    profile: profile?.data as User | undefined,
    isValidating,
    error,
    login,
    logout,
    register,
    editProfile,
  };
};
