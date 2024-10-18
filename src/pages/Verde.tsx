import { Card, CardContent, CardHeader, Divider, OutlinedInput, Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useTranslation} from 'react-i18next';
import whatsAppClient from '@green-api/whatsapp-api-client';

export default () => {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <Card
      elevation={0}
      sx={{
        position: 'relative',
        border: '1px solid',
        borderRadius: 1,
        borderColor: theme.palette.divider
      }}
    >
        <CardHeader
          titleTypographyProps={{ variant: 'subtitle1' }}
          title={t('main.Connection credentials')}
          sx={{'& .MuiCardHeader-action': { width: '80%' }}}
          action={<OutlinedInput fullWidth placeholder={'idInstance:apiTokenInstance'} />}
        />
      <Divider />

      <CardContent>
        <Stack direction="column" sx={{minHeight: 'calc(100vh - 150px)', height: '100%'}} alignItems="stretch">
          <Stack direction="row" justifyContent="space-between" alignItems="flext-start">
            123123
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  )
}
