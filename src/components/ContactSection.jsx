import { FaTelegramPlane, FaEnvelope, FaPhone } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { TELEGRAM_LINK } from '../data/tours';

export default function ContactSection() {
  const channels = [
    {
      icon: FaTelegramPlane,
      label: 'Telegram',
      sub: 'Fastest response · 2 hrs',
      href: TELEGRAM_LINK,
      cardClass: 'bg-[#229ED9]/10 border-[#229ED9]/30 hover:bg-[#229ED9]/20',
      iconClass: 'bg-[#229ED9]',
    },
    {
      icon: FaEnvelope,
      label: 'Email',
      sub: 'hello@travelco.com',
      href: 'mailto:hello@travelco.com',
      cardClass: 'bg-white/5 border-white/10 hover:border-primary/50',
      iconClass: 'bg-primary',
    },
    {
      icon: FaPhone,
      label: 'Phone',
      sub: '+94 77 123 4567',
      href: 'tel:+94771234567',
      cardClass: 'bg-white/5 border-white/10 hover:border-white/30',
      iconClass: 'bg-white/10',
    },
  ];

  return (
    <section id="contact" className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <p className="text-primary text-xs tracking-[0.3em] uppercase font-medium mb-3">Get in touch</p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">CONTACT US</h2>
          <Separator className="w-12 mx-auto bg-primary mb-6" />
          <p className="text-white/50 max-w-xl mx-auto">
            Ready to start your Sri Lanka journey? Reach out on Telegram for the fastest response,
            or send us an email and we'll get back to you within 24 hours.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          {channels.map(({ icon: Icon, label, sub, href, cardClass, iconClass }) => (
            <Card key={label} className={`transition-all ${cardClass}`}>
              <CardContent className="p-6">
                <Button variant="ghost" size="icon" className="h-12 w-12 p-0 mb-4 hover:bg-transparent" asChild>
                  <a href={href} target="_blank" rel="noopener noreferrer">
                    <span className={`w-12 h-12 ${iconClass} flex items-center justify-center`}>
                      <Icon className="text-white text-lg" />
                    </span>
                  </a>
                </Button>
                <p className="text-white font-semibold mb-1">{label}</p>
                <p className="text-white/40 text-xs">{sub}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
