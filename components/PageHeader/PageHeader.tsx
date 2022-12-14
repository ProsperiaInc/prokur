import { MdArrowBack } from "react-icons/md";
import { Grid, Button, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { BackButton } from "./PageHeader.styles";

const PageHeader = (
    { title, subtitle, backButton, cta, titlesContainer, height, onBack } :
    { title?: string | { text: string, [x: string]: any }, subtitle?: string, backButton?: boolean, cta?: any, titlesContainer?: any, height?: string, onBack?: any }
  ) => {
  const router = useRouter()

  const extractText = (prop: string | { [x: string]: any }) => {
    return typeof prop === "string" ? prop : prop.text;
  }

  const extractOverrides = (prop: string | { [x: string]: any }) => {
    return typeof prop === "string" ? {} : {
      ...prop,
      text: undefined
    };
  }

  return (
    <Grid
      container 
      height='164px'
      mb='64px'
      rowSpacing={1}
    >
      {backButton && (
        <Grid container item xs={12} md={2} justifyContent={{ xs: 'flex-start', md: 'flex-end' }}>
          <BackButton
            variant='text'
            color="primary"
            startIcon={<MdArrowBack />}
            size='small'
            onClick={() => {
              onBack && onBack();
              router.push('/');
            }}
            sx={{
              marginTop: {
                xs: '32px',
                lg: '0'
              }
            }}
          >
              Back to Dashboard
          </BackButton>
        </Grid>
      )}
      <Grid md={10} xs={12} item container justifyContent='flex-end' flexDirection='column' {...extractOverrides(titlesContainer)}>
        {subtitle && <Typography variant='h6' fontSize='18px' color='secondary.dark' fontWeight={600} pl={{ md: 17 }} {...extractOverrides(subtitle)}>{extractText(subtitle)}</Typography>}
        {title && <Typography variant='h5' fontWeight={600} pt={1} pl={{ md: 17 }} {...extractOverrides(title)}>{extractText(title)}</Typography>}
      </Grid>
      {cta && (
        <Grid container item xs={12} md={2} sx={{ justifyContent: { lg: 'flex-end', xs: 'flex-start' } }}>
          <Button {...extractOverrides(cta)}>{extractText(cta)}</Button>
        </Grid>
      )}
    </Grid>
  );
}

export default PageHeader