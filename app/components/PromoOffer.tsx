import Image from 'next/image';
import Link from 'next/link';

interface PromoOfferProps {
  title: string;
  description: string;
  image: string;
  buttonText: string;
  buttonLink: string;
}

const PromoOffer: React.FC<PromoOfferProps> = ({ 
  title, 
  description, 
  image, 
  buttonText, 
  buttonLink 
}) => {
  return (
    <div className="relative w-full h-[120px] overflow-hidden rounded-lg my-6">
      <div className="relative w-full h-full">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 flex items-center">
          <div className="flex-1 pl-6">
            <h3 className="text-xl font-bold text-red-600">{title}</h3>
            <p className="text-xs text-gray-800">{description}</p>
          </div>
          <div className="pr-6">
            <Link 
              href={buttonLink} 
              className="bg-gray-900 text-white px-4 py-2 rounded text-xs uppercase font-medium hover:bg-black transition-colors"
            >
              {buttonText}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromoOffer;
