// src/app/(auth)/signup/multi-step/MultiStepSignUpForm.tsx
"use client";

import {
  Button,
  Paper,
  Stack,
  TextInput,
  Title,
  PasswordInput,
  Loader,
  Center,
  Text,
  ActionIcon,
  Tooltip,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { updateProfile } from "@/features/auth/actions/update-profile";
import { createClient } from "@/lib/supabase/client";
import { signupComplete } from "@/features/auth/actions/signup-complete";
import { ArrowLeft02Icon } from "hugeicons-react";

export default function MultiStepSignUpForm() {
  const router = useRouter();
  const [step, setStep] = useState("accountInfo"); // 'accountInfo' | 'businessInfo'
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const emailFromQuery = searchParams.get("email") || "";

  const form = useForm({
    initialValues: {
      email: emailFromQuery,
      full_name: "",
      password: "",
      confirmPassword: "",
      business_name: "",
      phone_number: "",
    },
    validate: (values) => {
      if (step === "accountInfo") {
        return {
          full_name:
            values.full_name.trim().length < 2 ? "Full name is required" : null,
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
          form.setValues({
            email: profileData.email || "",
            full_name: profileData.full_name || "",
            business_name: profileData.business_name || "",
            phone_number: profileData.phone_number || "",
          });
        }
      }
      setLoading(false);
    };
    checkAuthAndFetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleNext = () => {
    if (form.validate().hasErrors === false) {
      setStep("businessInfo");
    }
  };

  const handleBack = () => {
    if (step === "businessInfo") {
      setStep("accountInfo");
    } else {
      router.push("/signup");
    }
  };

  const handleFinalSubmit = async (values: typeof form.values) => {
    setLoading(true);
    const formData = new FormData();
    // Append all form values to FormData
    Object.keys(values).forEach((key) => {
      formData.append(key, values[key as keyof typeof values]);
    });

    if (isAuthenticated) {
      await updateProfile(formData);
    } else {
      await signupComplete(formData);
    }
  };

  if (loading) {
    return (
      <Center mih="100vh">
        <Loader size="xl" />
      </Center>
    );
  }

  return (
    <Stack
      align="center"
      justify="center"
      mih="100vh"
      p="md"
      className="pageBackground"
    >
      <Paper withBorder shadow="lg" p="lg" radius="lg" maw={420} w="100%">
        <form onSubmit={form.onSubmit(handleFinalSubmit)}>
          <Stack gap="lg">
            <Tooltip label="Back" position="right">
              <ActionIcon
                onClick={handleBack}
                variant="default"
                c="gray"
                aria-label="Go back"
                type="button"
              >
                <ArrowLeft02Icon size={24} />
              </ActionIcon>
            </Tooltip>

            {step === "accountInfo" && (
              <Stack gap={0}>
                <Title order={2}>
                  {isAuthenticated
                    ? "Update your profile"
                    : "Create your account"}
                </Title>
                <Text c="dimmed">Add your details to continue.</Text>
              </Stack>
            )}

            {step === "businessInfo" && (
              <Stack gap={0}>
                <Title order={2}>Tell us about your business</Title>
                <Text c="dimmed">This information is optional.</Text>
              </Stack>
            )}

            {step === "accountInfo" && (
              <>
                <TextInput
                  label="Email"
                  name="email"
                  readOnly
                  disabled
                  {...form.getInputProps("email")}
                  size="lg"
                  radius="md"
                />
                <TextInput
                  required
                  label="Full Name"
                  name="full_name"
                  {...form.getInputProps("full_name")}
                  size="lg"
                  radius="md"
                />
                {!isAuthenticated && (
                  <>
                    <PasswordInput
                      required
                      label="Password"
                      name="password"
                      {...form.getInputProps("password")}
                      size="lg"
                      radius="md"
                    />
                    <PasswordInput
                      required
                      label="Confirm Password"
                      name="confirmPassword"
                      {...form.getInputProps("confirmPassword")}
                      size="lg"
                      radius="md"
                    />
                  </>
                )}
              </>
            )}

            {step === "businessInfo" && (
              <>
                <TextInput
                  label="Business name"
                  name="business_name"
                  {...form.getInputProps("business_name")}
                  size="lg"
                  radius="md"
                />
                <TextInput
                  label="Phone number"
                  name="phone_number"
                  {...form.getInputProps("phone_number")}
                  size="lg"
                  radius="md"
                />
              </>
            )}

            {step === "accountInfo" ? (
              <Button
                onClick={handleNext}
                fullWidth
                mt="md"
                size="lg"
                type="button"
              >
                Continue
              </Button>
            ) : (
              <Button
                type="submit"
                fullWidth
                mt="md"
                size="lg"
                loading={loading}
              >
                {isAuthenticated ? "Save profile" : "Complete sign up"}
              </Button>
            )}
          </Stack>
        </form>
      </Paper>
    </Stack>
  );
}
