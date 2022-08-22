import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { getCompanyRfps } from 'store/slices/user';
import get from 'lodash/get';
import { useTranslation } from 'next-i18next';

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
  const [loadingRfps, setLoadingRfps] = useState<boolean | undefined>();
  const [selectedId, setSelectedId] = useState(-1);
  // const myRfps = useSelector((state) => get(state, 'user.rfp', {}));
  const myRfps =[
    {
        "id": "02583770-4cbe-496c-a57d-52451bff66a1",
        "name": "dsaDS",
        "deadline_date": "2022-07-04T00:00:00.000000Z",
        "closed_date": "2022-07-30T00:00:00.000000Z",
        "created_at": "2022-08-07T20:10:33.000000Z",
        "updated_at": "2022-08-07T20:10:33.000000Z",
        "created_by_user_id": 11,
        "proposals_count": 0,
        "status": "closed",
        "company": null,
        "share_links": [
            {
                "id": 29,
                "rfp_id": "02583770-4cbe-496c-a57d-52451bff66a1",
                "channel_id": 1,
                "token": "775405691",
                "name": null,
                "password": null,
                "created_at": "2022-08-07T20:10:33.000000Z",
                "updated_at": "2022-08-07T20:10:33.000000Z",
                "share_link": "https://app-dev.prosperia.com/rfp/share/775405691",
                "channel": {
                    "id": 1,
                    "name": "manual",
                    "created_at": "2022-04-26T23:27:51.000000Z",
                    "updated_at": "2022-04-26T23:27:51.000000Z"
                }
            },
            {
                "id": 30,
                "rfp_id": "02583770-4cbe-496c-a57d-52451bff66a1",
                "channel_id": 2,
                "token": "8460838195",
                "name": null,
                "password": null,
                "created_at": "2022-08-07T20:10:33.000000Z",
                "updated_at": "2022-08-07T20:10:33.000000Z",
                "share_link": "https://app-dev.prosperia.com/rfp/share/8460838195",
                "channel": {
                    "id": 2,
                    "name": "email",
                    "created_at": "2022-04-26T23:27:51.000000Z",
                    "updated_at": "2022-04-26T23:27:51.000000Z"
                }
            }
        ],
        "created_by": {
            "id": 11,
            "email": "bernard+test@prosperia.com",
            "first_name": "",
            "last_name": "",
            "full_name": " ",
            "avatar_url": "",
            "assigned_role": "owner",
            "usage_type": null,
            "company": null
        }
    },
    {
        "id": "09abea24-f6a4-4c72-8463-2533868057c0",
        "name": "dsaDS",
        "deadline_date": "2022-07-04T00:00:00.000000Z",
        "closed_date": "2022-07-30T00:00:00.000000Z",
        "created_at": "2022-08-07T20:10:42.000000Z",
        "updated_at": "2022-08-07T20:10:42.000000Z",
        "created_by_user_id": 11,
        "proposals_count": 0,
        "status": "closed",
        "company": null,
        "share_links": [
            {
                "id": 31,
                "rfp_id": "09abea24-f6a4-4c72-8463-2533868057c0",
                "channel_id": 1,
                "token": "2500941241",
                "name": null,
                "password": null,
                "created_at": "2022-08-07T20:10:42.000000Z",
                "updated_at": "2022-08-07T20:10:42.000000Z",
                "share_link": "https://app-dev.prosperia.com/rfp/share/2500941241",
                "channel": {
                    "id": 1,
                    "name": "manual",
                    "created_at": "2022-04-26T23:27:51.000000Z",
                    "updated_at": "2022-04-26T23:27:51.000000Z"
                }
            },
            {
                "id": 32,
                "rfp_id": "09abea24-f6a4-4c72-8463-2533868057c0",
                "channel_id": 2,
                "token": "2722416863",
                "name": null,
                "password": null,
                "created_at": "2022-08-07T20:10:42.000000Z",
                "updated_at": "2022-08-07T20:10:42.000000Z",
                "share_link": "https://app-dev.prosperia.com/rfp/share/2722416863",
                "channel": {
                    "id": 2,
                    "name": "email",
                    "created_at": "2022-04-26T23:27:51.000000Z",
                    "updated_at": "2022-04-26T23:27:51.000000Z"
                }
            }
        ],
        "created_by": {
            "id": 11,
            "email": "bernard+test@prosperia.com",
            "first_name": "",
            "last_name": "",
            "full_name": " ",
            "avatar_url": "",
            "assigned_role": "owner",
            "usage_type": null,
            "company": null
        }
    },
    {
        "id": "3f38eb86-c386-47b0-b433-5fd04028e323",
        "name": "dsaDS",
        "deadline_date": "2022-07-04T00:00:00.000000Z",
        "closed_date": "2022-07-30T00:00:00.000000Z",
        "created_at": "2022-07-29T07:16:16.000000Z",
        "updated_at": "2022-07-29T07:16:16.000000Z",
        "created_by_user_id": 11,
        "proposals_count": 0,
        "status": "closed",
        "company": null,
        "share_links": [
            {
                "id": 19,
                "rfp_id": "3f38eb86-c386-47b0-b433-5fd04028e323",
                "channel_id": 1,
                "token": "8835423204",
                "name": null,
                "password": null,
                "created_at": "2022-07-29T07:16:16.000000Z",
                "updated_at": "2022-07-29T07:16:16.000000Z",
                "share_link": "https://app-dev.prosperia.com/rfp/share/8835423204",
                "channel": {
                    "id": 1,
                    "name": "manual",
                    "created_at": "2022-04-26T23:27:51.000000Z",
                    "updated_at": "2022-04-26T23:27:51.000000Z"
                }
            },
            {
                "id": 20,
                "rfp_id": "3f38eb86-c386-47b0-b433-5fd04028e323",
                "channel_id": 2,
                "token": "761781628",
                "name": null,
                "password": null,
                "created_at": "2022-07-29T07:16:16.000000Z",
                "updated_at": "2022-07-29T07:16:16.000000Z",
                "share_link": "https://app-dev.prosperia.com/rfp/share/761781628",
                "channel": {
                    "id": 2,
                    "name": "email",
                    "created_at": "2022-04-26T23:27:51.000000Z",
                    "updated_at": "2022-04-26T23:27:51.000000Z"
                }
            }
        ],
        "created_by": {
            "id": 11,
            "email": "bernard+test@prosperia.com",
            "first_name": "",
            "last_name": "",
            "full_name": " ",
            "avatar_url": "",
            "assigned_role": "owner",
            "usage_type": null,
            "company": null
        }
    },
    {
        "id": "5e556126-5fe3-4c6b-8e03-790d79ff5648",
        "name": "Untitled",
        "deadline_date": null,
        "closed_date": null,
        "created_at": "2022-07-21T10:11:10.000000Z",
        "updated_at": "2022-07-21T10:11:10.000000Z",
        "created_by_user_id": 11,
        "proposals_count": 0,
        "status": "missing_closed_date",
        "company": null,
        "share_links": [
            {
                "id": 15,
                "rfp_id": "5e556126-5fe3-4c6b-8e03-790d79ff5648",
                "channel_id": 1,
                "token": "8490117117",
                "name": null,
                "password": null,
                "created_at": "2022-07-21T10:11:10.000000Z",
                "updated_at": "2022-07-21T10:11:10.000000Z",
                "share_link": "https://app-dev.prosperia.com/rfp/share/8490117117",
                "channel": {
                    "id": 1,
                    "name": "manual",
                    "created_at": "2022-04-26T23:27:51.000000Z",
                    "updated_at": "2022-04-26T23:27:51.000000Z"
                }
            },
            {
                "id": 16,
                "rfp_id": "5e556126-5fe3-4c6b-8e03-790d79ff5648",
                "channel_id": 2,
                "token": "4362104787",
                "name": null,
                "password": null,
                "created_at": "2022-07-21T10:11:10.000000Z",
                "updated_at": "2022-07-21T10:11:10.000000Z",
                "share_link": "https://app-dev.prosperia.com/rfp/share/4362104787",
                "channel": {
                    "id": 2,
                    "name": "email",
                    "created_at": "2022-04-26T23:27:51.000000Z",
                    "updated_at": "2022-04-26T23:27:51.000000Z"
                }
            }
        ],
        "created_by": {
            "id": 11,
            "email": "bernard+test@prosperia.com",
            "first_name": "",
            "last_name": "",
            "full_name": " ",
            "avatar_url": "",
            "assigned_role": "owner",
            "usage_type": null,
            "company": null
        }
    },
    {
        "id": "632211e8-815a-43dd-8576-5d7d1adefcf8",
        "name": "dsaDS",
        "deadline_date": "2022-07-04T00:00:00.000000Z",
        "closed_date": "2022-07-30T00:00:00.000000Z",
        "created_at": "2022-07-29T07:15:52.000000Z",
        "updated_at": "2022-07-29T07:15:52.000000Z",
        "created_by_user_id": 11,
        "proposals_count": 0,
        "status": "closed",
        "company": null,
        "share_links": [
            {
                "id": 17,
                "rfp_id": "632211e8-815a-43dd-8576-5d7d1adefcf8",
                "channel_id": 1,
                "token": "7918056126",
                "name": null,
                "password": null,
                "created_at": "2022-07-29T07:15:52.000000Z",
                "updated_at": "2022-07-29T07:15:52.000000Z",
                "share_link": "https://app-dev.prosperia.com/rfp/share/7918056126",
                "channel": {
                    "id": 1,
                    "name": "manual",
                    "created_at": "2022-04-26T23:27:51.000000Z",
                    "updated_at": "2022-04-26T23:27:51.000000Z"
                }
            },
            {
                "id": 18,
                "rfp_id": "632211e8-815a-43dd-8576-5d7d1adefcf8",
                "channel_id": 2,
                "token": "9910719184",
                "name": null,
                "password": null,
                "created_at": "2022-07-29T07:15:52.000000Z",
                "updated_at": "2022-07-29T07:15:52.000000Z",
                "share_link": "https://app-dev.prosperia.com/rfp/share/9910719184",
                "channel": {
                    "id": 2,
                    "name": "email",
                    "created_at": "2022-04-26T23:27:51.000000Z",
                    "updated_at": "2022-04-26T23:27:51.000000Z"
                }
            }
        ],
        "created_by": {
            "id": 11,
            "email": "bernard+test@prosperia.com",
            "first_name": "",
            "last_name": "",
            "full_name": " ",
            "avatar_url": "",
            "assigned_role": "owner",
            "usage_type": null,
            "company": null
        }
    },
    {
        "id": "baea3da2-5041-4672-b98a-b624295ef418",
        "name": "dsaDS",
        "deadline_date": "2022-07-04T00:00:00.000000Z",
        "closed_date": "2022-07-30T00:00:00.000000Z",
        "created_at": "2022-08-07T20:10:52.000000Z",
        "updated_at": "2022-08-07T20:10:52.000000Z",
        "created_by_user_id": 11,
        "proposals_count": 0,
        "status": "closed",
        "company": null,
        "share_links": [
            {
                "id": 33,
                "rfp_id": "baea3da2-5041-4672-b98a-b624295ef418",
                "channel_id": 1,
                "token": "9497302717",
                "name": null,
                "password": null,
                "created_at": "2022-08-07T20:10:52.000000Z",
                "updated_at": "2022-08-07T20:10:52.000000Z",
                "share_link": "https://app-dev.prosperia.com/rfp/share/9497302717",
                "channel": {
                    "id": 1,
                    "name": "manual",
                    "created_at": "2022-04-26T23:27:51.000000Z",
                    "updated_at": "2022-04-26T23:27:51.000000Z"
                }
            },
            {
                "id": 34,
                "rfp_id": "baea3da2-5041-4672-b98a-b624295ef418",
                "channel_id": 2,
                "token": "1048342938",
                "name": null,
                "password": null,
                "created_at": "2022-08-07T20:10:52.000000Z",
                "updated_at": "2022-08-07T20:10:52.000000Z",
                "share_link": "https://app-dev.prosperia.com/rfp/share/1048342938",
                "channel": {
                    "id": 2,
                    "name": "email",
                    "created_at": "2022-04-26T23:27:51.000000Z",
                    "updated_at": "2022-04-26T23:27:51.000000Z"
                }
            }
        ],
        "created_by": {
            "id": 11,
            "email": "bernard+test@prosperia.com",
            "first_name": "",
            "last_name": "",
            "full_name": " ",
            "avatar_url": "",
            "assigned_role": "owner",
            "usage_type": null,
            "company": null
        }
    }
  ]
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

  const getData = async () => {
    setLoadingRfps(true);
    // dispatch(getCompanyRfps())
    //   .then((rpfs: any) => {
        // const count = Object.keys(rpfs).length;
        setRfpNumber(6);
        setLoadingRfps(false);
      // })
      // .catch((err: any) => {
      //   setRfpNumber(-1);
      //   setLoadingRfps(false);
      // });
  };

  useEffect(() => {
    getData();
  }, []);

  return {
    loadingRfps,
    rfpNumber,
    myRfps,
    headCells,
    order,
    modalOpen,
    selectedId,
    setOrder,
    setModalOpen,
    setRfpNumber,
    setSelectedId,
  };
}
