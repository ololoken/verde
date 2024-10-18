import Typography from './typography';
import { ReactNode, useMemo } from 'react';
import { CssBaseline, StyledEngineProvider } from '@mui/material';
import { createTheme, ThemeOptions, ThemeProvider, Theme, TypographyVariantsOptions } from '@mui/material/styles';
import palette from './palette'

export default function ThemeCustomization({ children }: { children: ReactNode }) {
  const themeTypography: TypographyVariantsOptions = useMemo<TypographyVariantsOptions>(() => Typography(`'Inter', sans-serif`), []);

  const themeOptions: ThemeOptions = useMemo(
    () => ({
      breakpoints: {
        values: {
          xs: 0,
          sm: 768,
          md: 1024,
          lg: 1366,
          xl: 1920
        }
      },
      mixins: {
        toolbar: {
          minHeight: 60,
          paddingTop: 8,
          paddingBottom: 8
        }
      },
      palette,
      typography: themeTypography
    }),
    [palette, themeTypography]
  );

  const themes: Theme = createTheme(themeOptions);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
