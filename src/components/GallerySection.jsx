import { Separator } from '@/components/ui/separator';

const photos = [
  { src: 'https://images.unsplash.com/photo-1711797750174-c3750dd9d7c9?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', caption: 'Sigiriya Rock Fortress' },
  { src: 'https://images.unsplash.com/photo-1574611122955-5baa61496637?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', caption: 'Nine Arch Bridge, Ella' },
  { src: 'https://images.unsplash.com/photo-1684758404779-388d63ffafb4?q=80&w=763&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', caption: 'Tea Estates, Nuwara Eliya' },
  { src: 'https://images.unsplash.com/photo-1734279135115-6d8984e08206?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', caption: 'Down South' },
  { src: 'https://media.gettyimages.com/id/2232993291/photo/elephant-family-grazes-in-minneriya-national-park-sri-lanka-as-tourists-watch.jpg?s=612x612&w=0&k=20&c=Ofg20RGEgttsgCWdY8ukF8XOJMylQCG7QRf4MpoB2Z4=', caption: 'Wildlife and Safari' },
  { src: 'https://i.pinimg.com/1200x/b7/e9/e4/b7e9e4ae02288103a521a44019e938f6.jpg', caption: 'East Coast, Trincomalee' },
];

export default function GallerySection() {
  return (
    <section id="gallery" className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <p className="text-primary text-xs tracking-[0.3em] uppercase font-medium mb-3">Captured moments</p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">GALLERY</h2>
          <Separator className="w-12 mx-auto bg-primary" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {photos.map((p, i) => (
            <div key={i} className="group relative overflow-hidden">
              <img
                src={p.src}
                alt={p.caption}
                className="w-full h-48 sm:h-56 md:h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex items-end p-4">
                <p className="text-white text-sm font-medium translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  {p.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
