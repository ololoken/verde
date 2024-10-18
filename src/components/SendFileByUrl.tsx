import { FormikProvider, useFormik } from 'formik';
import * as Yup from "yup";
import { TextField, InputLabel, Stack, Button } from "@mui/material";

export type Props = {
  handleSendFileByUrl: (payload: {
    chatId: string,
    phoneNumber: number,
    urlFile: string,
    fileName: string,
    caption?: string,
    quotedMessageId?: string
  }) => void
}

export default ({ handleSendFileByUrl }: Props) => {

  const formik = useFormik({
    initialValues: {
      chatId: '',//120363043968066561@g.us
      phoneNumber: NaN,
      urlFile: '',
      fileName: '',
      caption: '',
      quotedMessageId: undefined,//361B0E63F2FDF95903B6A9C9A102F34B
    },
    validateOnMount: true,
    validationSchema: Yup.object().shape({
      chatId: Yup.string().max(512)
        .matches(/^[0-9]+@[A-Za-z]\.us$/, { message: 'Идентификатор чата какой-то подозрительный' })
        .required('Ну и куда отправлять сообщение.'),
      urlFile: Yup.string().max(1024)//check URL rfc to improve validation
        .matches(/^(http|https)/)
        .required('Ссылочки на файл не хватает'),
      fileName: Yup.string().max(32).required('Имя файла пропущено'),
      caption: Yup.string().max(20000).nullable(),
      quotedMessageId: Yup.string().nullable()
        .matches(/^[A-Z0-9]+$/, { message: 'Страннный идентификатор сообщения' })
    }),
    onSubmit: () => {
      handleSendFileByUrl(values);
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
          <InputLabel required={true} htmlFor="entity-urlFile">Ссылка на файл</InputLabel>
          <TextField
            {...getFieldProps('urlFile')}
            id={'entity-urlFile'}
            fullWidth
            size="small"
            placeholder={'https://'}
            error={Boolean(touched.urlFile && errors.urlFile)}
            helperText={touched.urlFile && errors.urlFile}
          />
        </Stack>

        <Stack spacing={1}>
          <InputLabel required={true} htmlFor="entity-fileName">Имя файла</InputLabel>
          <TextField
            {...getFieldProps('fileName')}
            id={'entity-fileName'}
            fullWidth
            size="small"
            placeholder={'Моя киска.jpg'}
            error={Boolean(touched.fileName && errors.fileName)}
            helperText={touched.fileName && errors.fileName}
          />
        </Stack>

        <Stack spacing={1}>
          <InputLabel required={false} htmlFor="entity-caption">Комментарий к файлу</InputLabel>
          {/* todo: use TextEncoder to convert message to UTF-8 without bom */}
          <TextField
            {...getFieldProps('caption')}
            id="entity-caption"
            fullWidth
            multiline
            rows={2}
            placeholder="Тут нужно написать сообщение"
            error={Boolean(touched.caption && errors.caption)}
            helperText={touched.caption && errors.caption}
          />
        </Stack>

        <Stack spacing={1}>
          <Button
            variant="contained"
            disabled={!isValid}
            onClick={submitForm}
          >sendFileByUrl</Button>
        </Stack>

      </Stack>
    </FormikProvider>
  )
}
