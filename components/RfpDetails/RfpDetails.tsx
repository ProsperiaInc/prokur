import { Breadcrumbs, Button, Typography, Link, Box } from '@mui/material';
import { get } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RfpDetailsSection from 'components/RfpDetailsSection/RfpDetailsSection';
import SmartTrimmedText from 'components/SmartTrimmedText/SmartTrimmedText';
import RfpCard from 'components/RfpCard/RfpCard';
import SharedModal from 'components/SharedRfp/SharedModal';
import { ROUTES } from 'utils/constants';
import parseDate from 'utils/dateHelper';
import { MdImage } from 'react-icons/md';
import pdfImage from 'assets/images/pdf-file.png';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import classes from './RfpDetails.module.css';
import styled from '@emotion/styled';
import Image from 'next/image';
import { useLazyGetCompanyDetailsQuery } from 'services/company';
import { useLazyGetCompanyRfpsQuery, useLazyGetRfpAttachmentQuery, useLazyGetRfpQuery, useLazyGetRfpShareLinkQuery, useSetRfpShareEmailsMutation } from 'services/rfp';
import clsx from 'clsx';
import MenuButton from 'components/MenuButton/MenuButton';
import formatCurrency from 'utils/formatCurrency';

const ShareButton = styled(Button)(() => `
  height: 60px;
  alignContent: center;
  justifyContent: center;
  textTransform: none;
  padding: 14px 55.5px;
  fontSize: 18px;
  borderRadius: 8px;
`)

const StyledImageIcon = styled(Box)(() => `
  width: 65px;
  height: 65px;
  background-color: #fff;
  color: #D4D4D4;
  margin-right: 10px;
  border: 1px solid #D8D8D8;
  display: flex;
  align-items: center;
  justify-content: center;
`)

const StyledMenuButton = styled(MenuButton)(({ theme }: any) => `
  width: 35px;
  minWidth: 35px;
  alignContent: center;
  justifyContent: center;
  height: 40px;
  borderRadius: 4px;
  backgroundColor: ${theme.custom.menuButton.backgroundColor};
  color: ${theme.custom.menuButton.color};
  transition: ${theme.transitions.create(['box-shadow', 'background-color'], {
    duration: theme.transitions.duration.complex,
    easing: theme.transitions.easing.easeInOut,
  })},
  '&:hover': {
    backgroundColor: ${theme.custom.menuButton.backgroundColorHover};
    boxShadow: ${theme.shadows[2]},
  },
`)

const mockHistory = [
  {
    name: 'Rfp v2',
    date: '2021-07-16T00:00:00.000000Z',
    url: '#',
  },
  {
    name: 'Rfp v1',
    date: '2021-07-16T00:00:00.000000Z',
    url: '#',
  },
];

export default function RfpDetails() {
  const { t } = useTranslation('common')
  const router = useRouter()
  const [sharedModal, setSharedModal] = useState(false);
  const dispatch = useDispatch();
  const { id: rfpId } = router.query as any;
  const rfpShareToken = useSelector((state) => get(state, `auth.user.rfpShareTokens[${rfpId}]`, {}));
  const userRfps = useSelector((state) => get(state, 'rfp.list', []));
  const company = useSelector((state) => get(state, 'auth.user.company', {}));
  const rfp = useSelector((state) => get(state, `auth.user.rfpDetails[${rfpId}]`, {}));
  const rfpDetails = { 
    inquiryDeadline: parseDate(rfp?.deadline_date || rfp?.values?.deadline_date),
    closeDate: parseDate(rfp?.closed_date || rfp?.values?.closed_date),
    primaryCategory: rfp?.categories || rfp?.values?.categories,
    secondaryCategory: rfp?.rfpSecondaryCategory || rfp?.values?.rfpSecondaryCategory,
    estimatedBudget: formatCurrency(rfp?.budget || rfp?.values?.budget),
    responses: `${rfp?.proposals_count ?? rfp?.values?.proposals_count}`,
  }

  const rfpHistory = get(rfpDetails, 'history', mockHistory);
  const [getCompanyDetails] = useLazyGetCompanyDetailsQuery();
  const [getRfpDetails] = useLazyGetRfpQuery();
  const [getRfpAttachment, { data: attachments }] = useLazyGetRfpAttachmentQuery();
  const [getCompanyRfps] = useLazyGetCompanyRfpsQuery()
  const [getRfpShareLink] = useLazyGetRfpShareLinkQuery();
  const [setRfpShareEmail, { isLoading: rfpShareLoading, data: rfpShareData, error: rfpShareError }] = useSetRfpShareEmailsMutation()

  const openSharedModal = () => setSharedModal(true);
  const closeSharedModal = () => setSharedModal(false);

  const handleViewResponses = () => {
    router.push(ROUTES.DASHBOARD_PROPOSALS_RFP.replace(':id', rfpId));
  };
  const handleContact = () => {};
  const handleViewRfp = () => router.push(`/rfp_viewer?id=${rfpId}`)
  const navigateToRfpEditor = async (id: any) => router.push(`/rfp_editor?id=${id}`)
  const getShareLink = async () => { if (rfpId) getRfpShareLink(rfpId) };
  const getSharedLink = () => rfpShareToken.shareLink;
    // Config.isDevelopment
    //   ? `${window.location.origin}/rfp/share/${rfpShareToken.token}`
    //   : 

  const getSharedLinkPassword = () => rfpShareToken.password;

  const setSharedLinkPassword = async (password: string) => {
    // if (rfpId) { return dispatch(setPasswordToRfpShareLink(rfpId, password)); }
    return false;
  };

  const shareRfpToEmail = async (emails: string) => {
    setRfpShareEmail({ rfpId, emails })
  }

  useEffect(() => {
    getCompanyRfps('');
    getCompanyDetails('');
    getRfpDetails(rfpId);
    getRfpAttachment({ rfpId, sectionIndex: 3 });
    getShareLink();
  }, []);

  const renderSectionTitle = (title: string) => <Typography variant="h6">{title}</Typography>;

  const renderAttachment = (item: any, index: any) => {
    return (
      <div key={`${index} - ${item.name}`} className={classes["rfp-details-attachments-attachment"]}>
        <a target="_blank" rel="noreferrer" href={item.file_url} download={item.name}>
          <Image src={pdfImage} alt={item.name} className={classes["rfp-details-attachments-attachment-image"]} />
          <div className={classes["rfp-details-attachments-attachment-info"]}>
            <span>{item.name}</span>
          </div>
        </a>
      </div>
    );
  }

  const renderAttachmentsSection = () => {
    return !!attachments?.length && (
      <div className={clsx(classes["rfp-details-attachments"], classes["section"])}>
        {renderSectionTitle(t('attachments'))}
        <div className={classes["rfp-details-attachments-list"]}>{attachments.map(renderAttachment)}</div>
      </div>
    );
  }

  const renderVersionHistoryRow = (item: any, index: any) => (
    <div key={`${index} - ${item.name}`} className={classes["rfp-details-history-row"]}>
      <Link className={classes["rfp-details-history-link"]} href={item.url}>
        {item.name}
      </Link>
      <Typography>{parseDate(item.date)}</Typography>
    </div>
  );

  const renderVersionHistorySection = () =>
    !!rfpHistory.length && (
      <div className={clsx(classes["rfp-details-attachments"], classes["section"])}>
        <div className={classes["rfp-details-history-top"]}>
          {renderSectionTitle(t('version_history'))}
          <Typography>{t('modified_on')}</Typography>
        </div>
        <div className={classes["rfp-details-history-list"]}>{rfpHistory.map(renderVersionHistoryRow)}</div>
      </div>
    );

  const renderAboutSection = () => (
    <div className={clsx(classes['rfp-details-about'], classes['section'])}>
      {renderSectionTitle(t('about_of', { name: company.legal_name }))}
      <div className={classes['rfp-details-about-info']}>
        <Link>
          {company.logo_url ? (
            <img src={company.logo_url} alt="logo" />
          ) : (
            <StyledImageIcon>
              <MdImage />
            </StyledImageIcon>
          )}
        </Link>
        <div>
          <div className={classes['rfp-details-about-info-row']}>
            <Link className={classes['rfp-details-about-info-name']}>
              <p>{company.legal_name}</p>
            </Link>
            {company.category?.name && company.secondary_category?.name && (
              <div>
                <span>{company.category?.name}</span> |{' '}
                <span>{company.secondary_category?.name}</span>
              </div>
            )}
            <div>
              {company.city && <span>{company.city}</span>}
              {company.state && <span>, {company.state}</span>}
            </div>
          </div>
        </div>
      </div>
      {company.description && (
        <SmartTrimmedText
          seeMoreLink={ROUTES.DASHBOARD_BUSINESS_ACCOUNT}
          text={company.description}
          limit={550}
        />
      )}
    </div>
  );

  const renderOtherRfpSection = () => {
    const rfps = Object.values(userRfps).filter((item: any) => item.id !== Number(rfpId));

    return (
      !!rfps.length && (
        <div className={clsx(classes['rfp-details-other'], classes['section'])}>
          {renderSectionTitle(t('other_rfp_from', { name: company.legalName }))}
          <div className={classes["rfp-details-other-list"]}>
            {rfps.map((item: any, index) => (
              <RfpCard
                key={item.id}
                href={`/rfp_details/?id=${item.id}`}
                logoUrl={company.logoUrl}
                rfp={item}
              />
            ))}
          </div>
        </div>
      )
    );
  };

  return (
    <div className={classes["rfp-details-container"]}>
      <div className={classes["rfp-details-top"]}>
        <Breadcrumbs aria-label="breadcrumb" sx={{ display: 'flex', alignItems: 'center' }}>
          <Link
            color="primary"
            href={'/'}
            underline="hover"
            className={classes["proposals_body-breadcrumb-link"]}
          >
            {t('myrfp_nav_title')}
          </Link>
          <Typography>{rfp.name}</Typography>
        </Breadcrumbs>
        <div className={classes["rfp-details-top-buttons"]}>
          <div className={classes["rfp-details-top-button"]}>
            <ShareButton
              variant="contained"
              color="primary"
              onClick={openSharedModal}
            >
              {t('share')}
            </ShareButton>
          </div>
          <div className={classes["rfp-details-top-button"]} style={{ display: 'flex', alignItems: 'center' }}>
            <StyledMenuButton
              name="rfp_details"
              list={[
                {
                  label: 'Edit',
                  onClick: () => navigateToRfpEditor(rfpId),
                },
              ]}
            />
          </div>
        </div>
      </div>
      <div className={classes["rfp-details-body"]}>
        <RfpDetailsSection
          rfp={rfp}
          rfpDetails={rfpDetails}
          onViewResponses={handleViewResponses}
          onViewRfp={handleViewRfp}
        />
        {renderAttachmentsSection()}
        {renderAboutSection()}
        {renderOtherRfpSection()}
        {renderVersionHistorySection()}
      </div>
      <SharedModal
        modal={sharedModal}
        onClose={closeSharedModal}
        sharedLink={getSharedLink()}
        sharedLinkPassword={getSharedLinkPassword()}
        shareRfpToEmail={shareRfpToEmail}
        setSharedLinkPassword={setSharedLinkPassword}
        rfpShareData={rfpShareData}
        rfpShareError={rfpShareError}
        rfpShareLoading={rfpShareLoading}
      />
    </div>
  );
}
