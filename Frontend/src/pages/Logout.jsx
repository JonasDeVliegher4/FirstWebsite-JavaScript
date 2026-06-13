import { useEffect } from 'react';
import { useAuth } from '../contexts/Auth.context';
import { useThemeColors } from '../contexts/Theme.context';


export default function Logout() {
    const { theme, oppositeTheme } = useThemeColors();
    const { isAuthed, logout } = useAuth();

    useEffect(() => {
        logout();
    }, [logout]);

    if (isAuthed) {
        return (
          <div className={`container bg-${theme} text-${oppositeTheme}`}>
            <div className='row'>
              <div className='col-12'>
                <h1>Logging out...</h1>
              </div>
            </div>
          </div>
        );
    }

    return (
        <div className={`container bg-${theme} text-${oppositeTheme}`}>
          <div className='row'>
            <div className='col-12'>
              <h1>You were successfully logged out</h1>
            </div>
          </div>
        </div>
    );

}