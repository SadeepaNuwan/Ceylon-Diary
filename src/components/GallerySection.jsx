import { Separator } from '@/components/ui/separator';
import { useTranslation } from 'react-i18next';

const photos = [
  { src: 'https://images.unsplash.com/photo-1711797750174-c3750dd9d7c9?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', caption: 'gallery.captions.sigiriya' },
  { src: 'https://images.unsplash.com/photo-1574611122955-5baa61496637?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', caption: 'gallery.captions.ella' },
  { src: 'https://images.unsplash.com/photo-1684758404779-388d63ffafb4?q=80&w=763&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', caption: 'gallery.captions.tea_estates' },
  { src: 'https://images.unsplash.com/photo-1734279135115-6d8984e08206?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', caption: 'gallery.captions.down_south' },
  { src: 'https://media.gettyimages.com/id/2232993291/photo/elephant-family-grazes-in-minneriya-national-park-sri-lanka-as-tourists-watch.jpg?s=612x612&w=0&k=20&c=Ofg20RGEgttsgCWdY8ukF8XOJMylQCG7QRf4MpoB2Z4=', caption: 'gallery.captions.wildlife' },
  { src: 'https://i.pinimg.com/1200x/b7/e9/e4/b7e9e4ae02288103a521a44019e938f6.jpg', caption: 'gallery.captions.east_coast' },
];

export default function GallerySection() {
  const { t } = useTranslation();

  return (
    <section id="gallery" className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <p className="text-primary text-xs tracking-[0.3em] uppercase font-medium mb-4">
            {t('gallery.tagline', 'Captured moments')}
          </p>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-6">
            {t('gallery.title', 'GALLERY')}
          </h2>
          <Separator className="w-12 mx-auto bg-primary" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {photos.map((p, i) => (
            <div
              key={i}
              className={`group relative overflow-hidden rounded-2xl border border-white/10 hover:border-white/30 transition-colors duration-500 bg-[#111] ${
                [0, 3, 4].includes(i) ? 'md:col-span-2' : ''
              }`}
            >
              <img
                src={p.src}
                alt={t(p.caption)}
                className="w-full h-64 sm:h-72 lg:h-80 object-cover transition-transform duration-1000 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent sm:from-black/60 sm:via-transparent sm:bg-black/0 sm:group-hover:bg-black/40 transition-all duration-500 flex items-end p-6">
                <p className="text-white text-lg font-semibold tracking-wide sm:translate-y-4 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100 transition-all duration-500">
                  {t(p.caption)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
