import { Outlet } from 'react-router-dom';
import { Box, Container, Toolbar } from '@mui/material';

export default () => {

  return (
    <Box sx={{ display: 'flex', width: '100%' }}>
      <Box component="main" sx={{ width: 'calc(100% - 260px)', flexGrow: 1, p: { xs: 2, sm: 3 } }}>
        <Container
          maxWidth={'xl'}
          sx={{
            px: { xs: 0, sm: 2 },
            position: 'relative',
            minHeight: 'calc(100vh - 110px)',
            display: 'flex',
            flexGrow: 1,
            flexDirection: 'column',
          }}
        >
          <Outlet />
        </Container>
      </Box>
    </Box>
  );
};
