// src/features/auth/hooks/useMultiStepSignupForm.ts
import { useForm } from "@mantine/form";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { updateProfile } from "@/features/auth/actions/update-profile";
import { createClient } from "@/lib/supabase/client";
import { signupComplete } from "@/features/auth/actions/signup-complete";
import { MultiStepSignupFormValues } from "../types/signup";
import { notifications } from "@mantine/notifications";
import { Profile } from "@/features/account/types/account";

export function useMultiStepSignupForm() {
  const router = useRouter();
  const [step, setStep] = useState("profileInfo");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<Profile | null>(null);
  const searchParams = useSearchParams();
  const emailFromQuery = searchParams.get("email") || "";

  const form = useForm<MultiStepSignupFormValues>({
    initialValues: {
      email: emailFromQuery,
      full_name: "",
      username: "",
      password: "",
      confirmPassword: "",
      phone_number: "",
    },
    validate: (values) => {
      if (step === "profileInfo") {
        return {
          full_name:
            values.full_name.trim().length < 2 ? "Full name is required" : null,
          username:
            values.username.trim().length < 3
              ? "Username must be at least 3 characters"
              : null,
        };
      }
      if (step === "password") {
        return {
          password:
            !isAuthenticated && values.password.length < 6
              ? "Password must have at least 6 characters"
              : null,
          confirmPassword:
            !isAuthenticated && values.password !== values.confirmPassword
              ? "Passwords do not match"
              : null,
        };
      }
      return {};
    },
  });

  useEffect(() => {
    const checkAuthAndFetchProfile = async () => {
      setLoading(true);
      const supabase = createClient();
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session?.user) {
        setIsAuthenticated(true);
        const { data: profileData } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", session.user.id)
          .single();
        if (profileData) {
          setProfile(profileData);
          form.setValues({
            email: profileData.email || "",
            full_name: profileData.full_name || "",
            username: profileData.username || "",
            phone_number: profileData.phone_number || "",
          });
          if (profileData.username && profileData.phone_number) {
            router.push("/dashboard");
          }
        }
      }
      setLoading(false);
    };
    checkAuthAndFetchProfile();
  }, [router]);

  const handleBack = () => {
    if (step === "password") {
      setStep("profileInfo");
    } else {
      router.push("/signup");
    }
  };

  const handleFinalSubmit = async (values: typeof form.values) => {
    setLoading(true);
    const formData = new FormData();
    Object.keys(values).forEach((key) => {
      formData.append(key, values[key as keyof typeof values]);
    });

    if (isAuthenticated) {
      await updateProfile(formData);
    } else {
      const result = await signupComplete(formData);

      if (result?.error) {
        notifications.show({
          title: "Sign up failed",
          message: result.error,
          color: "red",
        });
        setLoading(false);
      }
    }
  };

  return {
    step,
    setStep,
    isAuthenticated,
    loading,
    form,
    handleBack,
    handleFinalSubmit,
    profile,
  };
}
