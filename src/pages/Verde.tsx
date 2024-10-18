import * as Yup from 'yup';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Divider,
  InputAdornment,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useTranslation} from 'react-i18next';
import whatsAppClient from '@green-api/whatsapp-api-client';
import { useEffect, useState } from 'react';
import useConfig from '../hooks/useConfig';
import { FormikProvider, useFormik } from 'formik';
import SendMesssage from "../components/SendMesssage.tsx";
import SendFileByUrl from "../components/SendFileByUrl.tsx";

export default () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const { creds, onChangeCredentials } = useConfig();
  const [apiClient, setApiClient] = useState<ReturnType<typeof whatsAppClient.restAPI>>();
  const [logs, setLogs] = useState<{timestamp: Date, payload: any}[]>([]);

  const formik = useFormik({
    initialValues: {
      creds
    },
    validateOnMount: true,
    validationSchema: Yup.object().shape({
      creds: Yup.string().max(512)
        .matches(/^[0-9]{8,}:[A-Za-z0-9_-]{15,}$/, { message: 'Токен какой-то подозрительный' })
        .required('Без токена ничего работать не будет, увы.')
    }),
    onSubmit: () => {}
  })

  useEffect(() => {
    if (!isValid) return;
    const [idInstance, apiTokenInstance] = creds.split(':');
    if (!idInstance || !apiTokenInstance) return;
    try {
      setApiClient(whatsAppClient.restAPI({idInstance, apiTokenInstance}))
    } catch (ignore) {}
  }, [creds]);

  const {
    errors,
    touched,
    getFieldProps,
    setFieldValue,
    isValid
  } = formik;

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
          action={<FormikProvider value={formik}><TextField
            {...getFieldProps('creds')}
            fullWidth
            size="small"
            value={creds}
            placeholder={'idInstance:apiTokenInstance'}
            onChange={({ target }) => {
              onChangeCredentials(target.value);
              setFieldValue('creds', target.value);
            }}
            error={Boolean(touched.creds && errors.creds)}
            helperText={touched.creds && errors.creds}
            slotProps={{
              input: {
                endAdornment: <InputAdornment position="end"><Chip
                  size="small"
                  color={isValid ? 'primary' : 'warning'}
                  label={isValid ? 'OK' : 'NOT OK'}
                /></InputAdornment>
              }
            }}
          /></FormikProvider>}
        />

      <Divider />

      <CardContent>
        <Stack direction="row" sx={{ minHeight: 'calc(100vh - 150px)', height: '100%' }} alignItems="stretch">
          <Stack direction="column" sx={{ minWidth: '30%' }} alignItems="stretch" spacing={1}>
            <Stack direction="row" alignItems="flext-start" spacing={1}>
              <Button
                variant="contained"
                disabled={!isValid}
                onClick={() => apiClient?.settings.getSettings()
                  .then(payload => setLogs([{timestamp: new Date, payload}, ...logs]))
                  .catch(error => setLogs([{timestamp: new Date, payload: error}, ...logs]))}
              >getSettings</Button>
              <Button
                variant="contained"
                disabled={!isValid}
                onClick={() => apiClient?.instance.getStateInstance()
                  .then(payload => setLogs([{timestamp: new Date, payload}, ...logs]))
                  .catch(error => setLogs([{timestamp: new Date, payload: error}, ...logs]))}
              >getStateInstance</Button>
            </Stack>
            <SendMesssage
              handleSendMessage={({ chatId, phoneNumber, message, quotedMessageId, linkPreview }) => apiClient?.message.sendMessage(
                chatId, phoneNumber, message, quotedMessageId, linkPreview
              )
                .then(payload => setLogs([{timestamp: new Date, payload}, ...logs]))
                .catch(error => setLogs([{timestamp: new Date, payload: error}, ...logs]))}
            />
            <SendFileByUrl
              handleSendFileByUrl={({ chatId, phoneNumber, urlFile, fileName, caption, quotedMessageId }) => apiClient?.file.sendFileByUrl(
                chatId, phoneNumber, urlFile, fileName, caption
              )
                .then(payload => setLogs([{timestamp: new Date, payload}, ...logs]))
                .catch(error => setLogs([{timestamp: new Date, payload: error}, ...logs]))}
            />

          </Stack>
          <Stack direction="column" alignItems="stretch" sx={{maxHeight: 'calc(100vh - 150px)', overflow: 'auto'}} flexGrow={1}>
            {logs.map(({ timestamp, payload }, idx) => <Typography key={`log_${idx}`} component={'pre'}>{`${timestamp}->`} {JSON.stringify(payload, null, 2)}</Typography>)}
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  )
}
