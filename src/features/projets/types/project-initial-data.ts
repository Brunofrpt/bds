import type { Prisma } from "@/generated/prisma/client";

export type ProjectInitialData = Prisma.ProjectGetPayload<{
  include: {
    technologies: {
      include: {
        technology: {
          select: {
            id: true;
            name: true;
          };
        };
      };
    };
    images: true;
  };
}>;
