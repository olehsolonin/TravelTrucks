import css from './Features.module.css';
import CharacteristicsIcons from '../CharacteristicsIcons/CharacteristicsIcons.jsx';

export default function Features({ params }) {
  return (
    <div>
      <CharacteristicsIcons details={params} />
    </div>
  );
}
