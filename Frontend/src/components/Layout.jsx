import { Outlet } from 'react-router-dom';
import { useThemeColors } from '../contexts/Theme.context';
import Navbar from './Navbar';

export default function Layout() {
  const { theme, textTheme } = useThemeColors();

  return (
		<div className={`container-xl bg-${theme} text-${textTheme}`}>
      <Navbar />
      <Outlet />
    </div>
  );
}
