import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { Hero } from "@/components/home/Hero";
import { SocialProofBand } from "@/components/home/SocialProofBand";
import { ReviewsSection } from "@/components/home/ReviewsSection";
import { FeaturedReview } from "@/components/home/FeaturedReview";
import { SuccessStories } from "@/components/home/SuccessStories";
import { ContactCTA } from "@/components/home/ContactCTA";
import { PhotoGallery } from "@/components/home/PhotoGallery";
import { FloatingBlobs } from "@/components/ui/FloatingBlobs";

export default function Home() {
  return (
    <>
      <FloatingBlobs />
      <Navbar />
      <main id="main-content">
        <Hero />
        <SocialProofBand />
        <ReviewsSection />
        <FeaturedReview />
        <SuccessStories />
        <PhotoGallery />
        <ContactCTA />
      </main>
      <Footer />
    </>
  );
}
