import "server-only";

import { unstable_cache } from "next/cache";
import { getProjects } from "@/lib/projects";

export const getCachedProjects = unstable_cache(
    async () => getProjects(),
    ["public-projects-v1"],
    {
        tags: ["projects"],
    },
);