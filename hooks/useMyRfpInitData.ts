import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { getCompanyRfps } from 'store/slices/user';
import get from 'lodash/get';
import { useTranslation } from 'next-i18next';
import { useGetCompanyRfpsQuery, useLazyGetCompanyRfpsQuery } from 'services/rfp';

export const HEADER_COLUMN_NAME = [
  'rfp.table.header.column_1',
  'rfp.table.header.column_2',
  'rfp.table.header.column_3',
  'rfp.table.header.column_4',
  'rfp.table.header.column_5',
  'rfp.table.header.column_6',
  'rfp.table.header.column_7',
];

export const HEADER_PROPERTY_KEY = [
  'id',
  'name',
  'createdAt',
  'deadlineDate',
  'closedDate',
  'proposals',
  'status',
];

export const STATUS_VALUES = [
  'Draft',
  'Active',
  'Closed',
];

export default function useMyRfpInintData() {
  const { t } = useTranslation('common')
  const [rfpNumber, setRfpNumber] = useState(-1);
  const [order, setOrder] = useState(
    {
      direction: 'desc',
      orderBy: '2',
    },
  );
  const [modalOpen, setModalOpen] = useState(false);
  // const [loadingRfps, setLoadingRfps] = useState<boolean | undefined>();
  const [selectedId, setSelectedId] = useState(-1);
  const myRfps = useSelector((state) => get(state, 'rfps', {}));
  const dispatch = useDispatch();

  const headCells = [
    {
      id: '1',
      numeric: false,
      sorteable: true,
      label: t(HEADER_COLUMN_NAME[0]),
    },
    {
      id: '2',
      numeric: true,
      sorteable: true,
      label: t(HEADER_COLUMN_NAME[1]),
    },
    {
      id: '3',
      numeric: true,
      sorteable: true,
      label: t(HEADER_COLUMN_NAME[2]),
    },
    {
      id: '4',
      numeric: true,
      sorteable: true,
      label: t(HEADER_COLUMN_NAME[3]),
    },
    {
      id: '5',
      numeric: true,
      sorteable: true,
      label: t(HEADER_COLUMN_NAME[4]),
    },
    {
      id: '6',
      numeric: true,
      sorteable: true,
      label: t(HEADER_COLUMN_NAME[5]),
    },
    {
      id: '7',
      numeric: true,
      sorteable: false,
      label: t(HEADER_COLUMN_NAME[6]),
    },
  ];

  return {
    loadingRfps: false,
    rfpNumber,
    myRfps,
    order,
  };
}
