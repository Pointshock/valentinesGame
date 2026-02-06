import { asset } from '../engine/utils';

interface PortraitsProps {
  protagonistName: string;
  bardName: string;
  showBard?: boolean;
  showProtagonist?: boolean;
}

export default function Portraits({
  protagonistName,
  bardName,
  showBard = true,
  showProtagonist = true,
}: PortraitsProps) {
  return (
    <div className="flex justify-center items-end gap-6 mb-6">
      {showProtagonist && (
        <div className="flex flex-col items-center">
          <div className="w-28 h-28 rounded-lg overflow-hidden border-2 border-gold shadow-lg bg-royal-light/30">
            <img
              src={asset('assets/portrait_protagonist.png')}
              alt={protagonistName}
              className="w-full h-full object-contain"
              style={{ imageRendering: 'pixelated' }}
            />
          </div>
          <span className="text-xs font-heading text-gold/80 mt-1.5 max-w-[90px] text-center truncate">
            {protagonistName}
          </span>
        </div>
      )}

      {showProtagonist && showBard && (
        <div className="mb-5" aria-hidden="true">
          <img
            src={asset('assets/heart.png')}
            alt=""
            className="w-12 h-12 object-contain"
            style={{ imageRendering: 'pixelated' }}
          />
        </div>
      )}

      {showBard && (
        <div className="flex flex-col items-center">
          <div className="w-28 h-28 rounded-lg overflow-hidden border-2 border-gold shadow-lg bg-royal-light/30">
            <img
              src={asset('assets/portrait_bard.png')}
              alt={bardName}
              className="w-full h-full object-contain"
              style={{ imageRendering: 'pixelated' }}
            />
          </div>
          <span className="text-xs font-heading text-gold/80 mt-1.5 max-w-[90px] text-center truncate">
            {bardName}
          </span>
        </div>
      )}
    </div>
  );
}
