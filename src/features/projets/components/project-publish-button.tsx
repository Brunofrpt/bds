"use client";

import { useRouter } from "next/navigation";
import { publishProjectAction } from "../actions/publish-project.action";
import { unpublishProjectAction } from "../actions/unpublish-project.action";

type ProjectPublishButtonProps = {
  id: string;
  isPublished: boolean;
  title: string;
};

export default function ProjectPublishButton({
  id,
  isPublished,
  title,
}: ProjectPublishButtonProps) {
  const router = useRouter();

  async function handleTogglePublishState() {
    const result = isPublished
      ? await unpublishProjectAction(id)
      : await publishProjectAction(id);

    if (!result.success) {
      alert(result.message);
      return;
    }

    alert(result.message);
    router.refresh();
  }

  return (
    <button
      type="button"
      className={
        isPublished
          ? "projets__publish-button projets__publish-button--published"
          : "projets__publish-button projets__publish-button--draft"
      }
      onClick={handleTogglePublishState}
      aria-label={
        isPublished
          ? `Depublier le projet ${title}`
          : `Publier le projet ${title}`
      }
    >
      {isPublished ? "DÉPUBLIER" : "PUBLIER"}
    </button>
  );
}
