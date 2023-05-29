import { useEffect, useCallback } from 'react';
import { useLazyGetThemeQuery } from '@/store/ui/ui.api';
import { useUpdateThemeMutation } from '@/store/ui/ui.api';
import { selectThemeId } from '@/store/ui/ui.slice';
import { useTypedSelector } from './useTypedSelector';
import { useActions } from './useActions';
import { ThemeId } from '@/store/ui/ui.types';
import useAuth from './useAuth';

const themeClassMap = {
  1: 'app_theme_default',
  2: 'app_theme_light',
};

const useTheme = () => {
  const themeId = useTypedSelector(selectThemeId);
  const { setThemeId } = useActions();
  const [updateTheme] = useUpdateThemeMutation();
  const [sendThemeGetRequest, { data }] = useLazyGetThemeQuery();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      sendThemeGetRequest();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (data?.themeId) {
      const { themeId } = data;
      setThemeId(themeId as ThemeId);
      console.log('changed the theme from server');
    }
  }, [data]);

  const themeClassName =
    themeClassMap[themeId as keyof typeof themeClassMap] || 'app_theme_default';

  const setThemeFromClient = useCallback(async (isLight: boolean) => {
    const id = isLight ? 2 : 1;
    const data = await updateTheme({ themeId: id });
    if ('error' in data) {
      return;
    }
    setThemeId(id);
  }, []);

  return { themeClassName, themeId, setThemeFromClient };
};

export default useTheme;
