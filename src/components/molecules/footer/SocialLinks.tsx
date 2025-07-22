import { Facebook, Instagram, Twitter, Linkedin, Youtube } from 'lucide-react'
import { SocialIcon } from '@/components/atoms/ui/SocialIcon'

export function SocialLinks() {
  return (
    <div className="flex items-center gap-4">
      <SocialIcon Icon={Facebook} href="#" label="Facebook" />
      <SocialIcon Icon={Instagram} href="#" label="Instagram" />
      <SocialIcon Icon={Twitter} href="#" label="Twitter" />
      <SocialIcon Icon={Linkedin} href="#" label="LinkedIn" />
      <SocialIcon Icon={Youtube} href="#" label="YouTube" />
    </div>
  )
}
