import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { OperatingMap } from "@/features/operating-map/components/OperatingMap";
import { Hero } from "@/features/profile/components/Hero";
import { ProofRail } from "@/features/profile/components/ProofRail";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main id="content">
        <Hero />
        <ProofRail />
        <OperatingMap />
      </main>
      <SiteFooter />
    </>
  );
}
