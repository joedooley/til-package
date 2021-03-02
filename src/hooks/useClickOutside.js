import useEventListener from '@hooks/useEventListener';

/**
 * Hook that checks if a click was outside of a given ref
 * @param {Array} refs - array of refs to check if the click was inside
 * @param {Function} handleClickOutside - callback function if click is outside target
 */
export default function useClickOutside(refs, handleClickOutside) {
  const handleClick = event => {
    if (!refs.some(ref => ref.current && ref.current.contains(event.target))) {
      handleClickOutside(event);
    }
  };

  useEventListener('click', handleClick);
}
