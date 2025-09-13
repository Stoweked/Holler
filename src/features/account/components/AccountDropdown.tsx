import { ActionIcon, Avatar, Menu, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  HelpCircleIcon,
  Logout02Icon,
  PencilEdit01Icon,
  StarsIcon,
  UserCircleIcon,
} from "hugeicons-react";
import FeedbackModal from "../../../components/modals/FeedbackModal";
import { ColorSchemeMenuItem } from "../../../components/layout/TopNav/ColorSchemeMenuItem";
import { logout } from "@/features/auth/actions/logout";
import { useProfile } from "@/contexts/ProfileContext";
import { useEffect } from "react";
import { getInitials } from "@/lib/hooks/textUtils";
import SettingsDrawer from "@/features/settings/components/SettingsDrawer";
import WhatsNewModal from "@/components/modals/WhatsNewModal";

export default function AccountDropdown() {
  const { profile, loading } = useProfile();
  const [
    openedFeedbackModal,
    { open: openFeedbackModal, close: closeFeedbackModal },
  ] = useDisclosure(false);

  const [
    openedProfileDrawer,
    { open: openProfileDrawer, close: closeProfileDrawer },
  ] = useDisclosure(false);

  const [
    openedWhatsNewModal,
    { open: openWhatsNewModal, close: closeWhatsNewModal },
  ] = useDisclosure(false);

  useEffect(() => {
    const handleOpenAccount = () => openProfileDrawer();
    const handleOpenFeedback = () => openFeedbackModal();
    const handleOpenWhatsNew = () => openWhatsNewModal();

    window.addEventListener("open-account", handleOpenAccount);
    window.addEventListener("open-feedback", handleOpenFeedback);
    window.addEventListener("open-whats-new", handleOpenWhatsNew);

    return () => {
      window.removeEventListener("open-account", handleOpenAccount);
      window.removeEventListener("open-feedback", handleOpenFeedback);
      window.removeEventListener("open-whats-new", handleOpenWhatsNew);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Menu shadow="md" width={170} position="bottom-end">
        <Menu.Target>
          <ActionIcon
            variant="default"
            radius="xl"
            size={38}
            aria-label="Profile menu"
          >
            <Avatar
              src={profile?.avatar_url}
              radius="xl"
              color="lime"
              variant="filled"
              size={38}
            >
              {!loading && profile ? getInitials(profile.full_name) : null}
            </Avatar>
          </ActionIcon>
        </Menu.Target>

        <Menu.Dropdown>
          {profile?.username && (
            <Text size="sm" c="dimmed" px={12} py={6} lineClamp={1}>
              @{profile?.username}
            </Text>
          )}

          <Menu.Item
            leftSection={<UserCircleIcon size={16} />}
            onClick={openProfileDrawer}
            aria-label="Your profile"
          >
            Your profile
          </Menu.Item>

          <ColorSchemeMenuItem />

          <Menu.Divider />

          <Menu.Item
            leftSection={<PencilEdit01Icon size={16} />}
            onClick={openFeedbackModal}
            aria-label="Share feedback"
          >
            Share feedback
          </Menu.Item>

          <Menu.Item
            leftSection={<StarsIcon size={16} />}
            onClick={openWhatsNewModal}
            aria-label="What's new"
          >
            What&apos;s new
          </Menu.Item>

          <Menu.Item
            leftSection={<HelpCircleIcon size={16} />}
            aria-label="Support"
          >
            Support
          </Menu.Item>

          <Menu.Divider />

          <Menu.Item
            leftSection={<Logout02Icon size={16} />}
            onClick={logout}
            aria-label="Log out"
          >
            Log out
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>

      <FeedbackModal opened={openedFeedbackModal} close={closeFeedbackModal} />

      <WhatsNewModal opened={openedWhatsNewModal} close={closeWhatsNewModal} />

      <SettingsDrawer
        opened={openedProfileDrawer}
        close={closeProfileDrawer}
        position="right"
      />
    </>
  );
}
