"use client";

import { deleteTechnologyAction } from "../actions/delete-technology.action";
import { useRouter } from "next/navigation";

type DeleteButtonTechnologieProps = {
    id: string;
    name: string;
};

export default function DeleteButtonTechnologie({
    id,
    name,
}: DeleteButtonTechnologieProps) {

    const router = useRouter();

    async function handleDelete() {
        const isConfirmed = window.confirm(
            `Voulez vous vraiment supprimer la technologie ${name} ?`,
        );

        if (!isConfirmed) {
            return;
        }

        // L'action serveur action renvoie un objet avec success et message.
        // Le bouton se contente de lire ce message et de l'afficher.
        const result = await deleteTechnologyAction(id);

        if (!result.success) {
            alert(result.message);
            return;
        }

        alert(result.message);
        router.refresh();
    }

    return (
        <button type="button" className="technologies__supprimer-button" onClick={handleDelete}>Supprimer</button>
    );
}