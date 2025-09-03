import { ActionIcon, Avatar, Menu } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  Logout02Icon,
  PencilEdit01Icon,
  UserCircleIcon,
} from "hugeicons-react";
import FeedbackModal from "./FeedbackModal";
import { ColorSchemeMenuItem } from "./ColorSchemeMenuItem";
import ProfileDrawer from "@/features/account/components/AccountDrawer";
import { logout } from "@/features/auth/actions/logout";
import { useProfile } from "@/contexts/ProfileContext";
import { useEffect } from "react";
import { getInitials } from "@/lib/hooks/getInitials";

export default function AccountAvatar() {
  const { profile, loading } = useProfile();
  const [
    openedFeedbackModal,
    { open: openFeedbackModal, close: closeFeedbackModal },
  ] = useDisclosure(false);

  const [
    openedProfileDrawer,
    { open: openProfileDrawer, close: closeProfileDrawer },
  ] = useDisclosure(false);

  useEffect(() => {
    const handleOpenAccount = () => openProfileDrawer();
    const handleOpenFeedback = () => openFeedbackModal();

    window.addEventListener("open-account", handleOpenAccount);
    window.addEventListener("open-feedback", handleOpenFeedback);

    return () => {
      window.removeEventListener("open-account", handleOpenAccount);
      window.removeEventListener("open-feedback", handleOpenFeedback);
    };
  }, [openProfileDrawer, openFeedbackModal]);

  return (
    <div>
      <Menu shadow="md" width={170} position="bottom-end">
        <Menu.Target>
          <ActionIcon
            variant="default"
            radius="xl"
            size={38}
            aria-label="Profile menu"
          >
            <Avatar radius="xl" color="lime" variant="filled">
              {!loading && profile ? getInitials(profile.full_name) : null}
            </Avatar>
          </ActionIcon>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Item
            leftSection={<UserCircleIcon size={16} />}
            onClick={openProfileDrawer}
          >
            Your account
          </Menu.Item>
          <Menu.Item
            leftSection={<PencilEdit01Icon size={16} />}
            onClick={openFeedbackModal}
          >
            Share feedback
          </Menu.Item>
          <ColorSchemeMenuItem />
          <Menu.Divider />

          <Menu.Item leftSection={<Logout02Icon size={16} />} onClick={logout}>
            Log out
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>

      <FeedbackModal opened={openedFeedbackModal} close={closeFeedbackModal} />

      <ProfileDrawer
        opened={openedProfileDrawer}
        close={closeProfileDrawer}
        position="right"
      />
    </div>
  );
}
