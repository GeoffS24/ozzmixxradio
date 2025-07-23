import { BlogSection } from "@/components/organisms/home/blogSection";
import { ContactSection } from "@/components/organisms/home/contactSection";
import { Hero } from "@/components/organisms/home/Hero";
import { MusicSection } from "@/components/organisms/home/MusicSection";
import { ScheduleSection } from "@/components/organisms/home/scheduleSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <MusicSection />
      <ScheduleSection />
      <BlogSection />
      <ContactSection />
    </div>
  );
}
