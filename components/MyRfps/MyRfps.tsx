import React, { useEffect, useState } from 'react';
import {
  SvgIcon,
  Typography,
  Tabs,
  Box,
  Tab,
  Grid,
} from '@mui/material';
import EmptyRFP from 'assets/images/empty_rfp.svg';
import parseDate from 'utils/dateHelper';
import EmptyPage from 'components/EmptyPage/EmptyPage';
import useMyRfpComparators from 'hooks/useMyRfpComparators';
import PageHeader from 'components/PageHeader/PageHeader';
import DataTable from 'components/DataTable/DataTable';
import { StatusChip } from './Myrfps.styles';
import ActivityCard from './ActivityCard';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { selectRFPData } from 'store/features/rfp/rfpSlice';
import { useLazyGetCompanyRfpsQuery } from 'services/rfp';
import PageLoader from 'components/PageLoader/PageLoader';

const statusColorMap: any = {
  draft: 'info',
  active: 'success',
  closed: 'error',
}
const columns = [
  { field: 'name', headerName: 'TITLE', width: 300 },
  { field: 'createdAt', headerName: 'DATE CREATED', width: 200 },
  { field: 'deadlineDate', headerName: 'DEADLINE', width: 200  },
  { field: 'closedDate', headerName: 'CLOSE DATE', width: 200  },
  { field: 'proposalsCount', headerName: 'PROPOSALS', width: 200  },
  { field: 'status', headerName: 'STATUS', renderCell: (params: any) => ( <StatusChip label={params.value} color={statusColorMap[params.value]} variant='filled' />)  },
]

function TabPanel(props: any) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ py: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const MyRfps = () => {
  const { t } = useTranslation('common');
  const router = useRouter()
  const [value, setValue] = useState(0);
  const [getCompanyRfps] = useLazyGetCompanyRfpsQuery()
  const { loadingRfps, rfpNumber, myRfps, order } = useSelector(selectRFPData)
  const { getComparator } = useMyRfpComparators();
  useEffect(() => { getCompanyRfps('') }, [])
  const handleChange = (event: any, newValue: any) => setValue(newValue)
  const navigateToRfp = async ({ row: { id } }: { row: { id: any }}) => router.push(`/rfp_viewer?id=${id}`);
  const navigateToRfpEditor = async (id: number) => router.push(`/rfp_editor?id=${id}`);

  const renderRfpEmpty = () => (
    <EmptyPage
      pageTitle={t('rfp.nav_title')}
      mainText={t('rfp.empty_page.main_text')}
      subText={t('rfp.empty_page.sub_text')}
      buttonText={t('rfp.empty_page.add_rfp')}
      handleButtonClick={() => navigateToRfpEditor(0)}
      icon={<EmptyRFP />}
    />
  );

  const activeTabTable = (filter: any = undefined) => {
    return (
      <DataTable
        rows={
          Object.values(myRfps)
            .slice()
            .map((row: any) => ({ 
              ...row, 
              status: ['active', 'closed'].includes(row.status.toLowerCase()) ? row.status : 'draft',
              createdAt: parseDate(row.created_at),
              deadlineDate: parseDate(row.deadline_date),
              closedDate: parseDate(row.closed_date),
              proposalsCount: row.proposalsCount
            }))
            .sort(getComparator(order.orderBy, order.direction))
            .filter(row => filter ? row[filter?.key] === filter?.value : true)
        }
        columns={columns}
        onRowClick={navigateToRfp}
      />
    )
  }

  const renderRfpTable = () => (
    <Box>
      <PageHeader
        title={{
          text: t('rfp.nav_title'),
          pl: 0,
        }}
        titlesContainer={{
          justifyContent: 'center'
        }}
        cta={{
          color: "primary",
          variant: "contained",
          onClick: () => navigateToRfpEditor(0),
          text: t('rfp.add_rfp')
        }}
        height='100px'
      />
      <Grid container spacing={4} pb={10}>
        <Grid item md={4} sx={{ width: '100%' }}>
          <ActivityCard variant='warning' />
        </Grid>
        <Grid item md={4} sx={{ width: '100%' }}>
          <ActivityCard />
        </Grid>
        <Grid item md={4} sx={{ width: '100%' }}>
          <ActivityCard variant='error' />
        </Grid>
      </Grid>
      <Grid container>
        <Grid item>
          <Typography variant='h5' fontWeight={600} mb={2}>All RFPs</Typography>
        </Grid>
      </Grid>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Active" {...a11yProps(0)} />
            <Tab label="Closed" {...a11yProps(1)} />
            <Tab label="Drafts" {...a11yProps(2)} />
          </Tabs>
        </Box>
      </Box>
      <TabPanel value={value} index={0}>
        {activeTabTable({ key: 'status', value: 'active' })}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {activeTabTable({ key: 'status', value: 'closed' })}
      </TabPanel>
      <TabPanel value={value} index={2}>
        {activeTabTable({ key: 'status', value: 'draft' })}
      </TabPanel>
    </Box>
  );
  const conditionalRender = () => {
    if (rfpNumber < 0) {
      return null;
    }
    if (rfpNumber === 0) {
      return renderRfpEmpty();
    }
    return renderRfpTable();
  };

  if (loadingRfps) return <PageLoader />;
    // return (<div>Loading...</div>)

  return (
    <div className="myrfps-container">
      {conditionalRender()}
    </div>
  );
}


export default MyRfps