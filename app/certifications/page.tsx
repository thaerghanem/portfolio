import type { Metadata } from "next";
import Certifications, {
    type Certification,
} from "@/components/certifications";

export const metadata: Metadata = {
    title: "Certifications | Thaer Ghanem",
    description:
        "Explore Thaer Ghanem's certifications in mobile and web development.",
};

const certifications: Certification[] = [

    {
        id: "certificate-1",
        title: "Flutter & dart Complete Course",
        issuer: "Academind",
        date: "Septemper 2026",
        image: "/certifications/flutter.png",
        credentialUrl: "/certifications/certificate-1.pdf",
        skills: ["Flutter", "Dart"],
    },
    {
        id: "certificate-2",
        title: "Next.js Complete Course",
        issuer: "Academind",
        date: "November 2026",
        image: "/certifications/next_js.png",
        credentialUrl: "/certifications/certificate-2.pdf",
        skills: ["Next js", "React js"],
    },
    {
        id: "certificate-3",
        title: "Node.js Complete Course",
        issuer: "Academind",
        date: "November 2026",
        image: "/certifications/node_js.png",
        credentialUrl: "/certifications/certificate-3.pdf",
        skills: ["Node js", "Express js"],
    },
];

export default function CertificationsPage() {
    return (
        <main data-page="certifications">
            <Certifications certifications={certifications} />
        </main>
    );
}