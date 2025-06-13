interface Props { value: number | null }

export function Tile({ value }: Props) {
  const classMap: Record<number, string> = {
    2: 'bg-amber-100 text-amber-800',
    4: 'bg-amber-200 text-amber-800',
    8: 'bg-amber-300 text-white',
    16: 'bg-amber-400 text-white',
    32: 'bg-amber-500 text-white',
    64: 'bg-amber-600 text-white',
    128: 'bg-amber-500 text-white text-xl',
    256: 'bg-orange-500 text-white text-xl',
    512: 'bg-orange-600 text-white text-xl',
    1024: 'bg-orange-700 text-white text-2xl',
    2048: 'bg-orange-800 text-white text-2xl',
  };
  return (
    <div
      className={`flex items-center justify-center rounded-lg h-24 w-24 transition-all duration-100
                  ${value ? classMap[value] ?? 'bg-orange-900 text-white' : 'bg-stone-200'}`}>
      {value ?? ''}
    </div>
  );
}
