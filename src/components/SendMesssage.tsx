import { FormikProvider, useFormik } from 'formik';
import * as Yup from "yup";
import { TextField, InputLabel, Stack, Button } from "@mui/material";

export type Props = {
  handleSendMessage: (payload: {
    chatId: string,
    phoneNumber: number,
    message: string,
    quotedMessageId?: string
    linkPreview: boolean
  }) => void
}

export default ({ handleSendMessage }: Props) => {

  const formik = useFormik({
    initialValues: {
      chatId: '',//120363043968066561@g.us
      phoneNumber: NaN,
      message: '',
      quotedMessageId: undefined,//361B0E63F2FDF95903B6A9C9A102F34B
      linkPreview: true
    },
    validateOnMount: true,
    validationSchema: Yup.object().shape({
      chatId: Yup.string().max(512)
        .matches(/^[0-9]+@[A-Za-z]\.us$/, { message: 'Идентификатор чата какой-то подозрительный' })
        .required('Ну и куда отправлять сообщение.'),
      message: Yup.string().max(20000)
        .required('Все-таки надо что-то придумать для отправки'),
      quotedMessageId: Yup.string().nullable()
        .matches(/^[A-Z0-9]+$/, { message: 'Страннный идентификатор сообщения' })
    }),
    onSubmit: () => {
      handleSendMessage(values);
    }
  });

  const {
    errors,
    touched,
    getFieldProps,
    isValid,
    submitForm,
    values
  } = formik;

  return (
    <FormikProvider value={formik}>
      <Stack direction={'column'}>

        <Stack spacing={1}>
          <InputLabel required={true} htmlFor="entity-chatId">ID Чата</InputLabel>
          <TextField
            {...getFieldProps('chatId')}
            id={'entity-chatId'}
            fullWidth
            size="small"
            placeholder={'XXXXXXXXXXXXXX@A.us'}
            error={Boolean(touched.chatId && errors.chatId)}
            helperText={touched.chatId && errors.chatId}
          />
        </Stack>

        <Stack spacing={1}>
          <InputLabel required={false} htmlFor="entity-quotedMessageId">ID цитируемого сообщения</InputLabel>
          <TextField
            {...getFieldProps('quotedMessageId')}
            id={'entity-quotedMessageId'}
            fullWidth
            size="small"
            placeholder={'XXXXXXXXXXXXXXXXXXX'}
            error={Boolean(touched.quotedMessageId && errors.quotedMessageId)}
            helperText={touched.quotedMessageId && errors.quotedMessageId}
          />
        </Stack>

        <Stack spacing={1}>
          <InputLabel required={true} htmlFor="entity-message">Сообщение</InputLabel>
          {/* todo: use TextEncoder to convert message to UTF-8 without bom */}
          <TextField
            {...getFieldProps('message')}
            id="entity-message"
            fullWidth
            multiline
            rows={2}
            placeholder="Тут нужно написать сообщение"
            error={Boolean(touched.message && errors.message)}
            helperText={touched.message && errors.message}
          />
        </Stack>

        <Stack spacing={1}>
          <Button
            variant="contained"
            disabled={!isValid}
            onClick={submitForm}
          >sendMessage</Button>
        </Stack>

      </Stack>
    </FormikProvider>
  )
}
