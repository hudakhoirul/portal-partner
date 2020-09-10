import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
    {
        id: 'applications',
        title: '',
        // translate: 'NAV.APPLICATIONS',
        type: 'group',
        icon: 'apps',
        children: [
            {
                id: 'dashboard',
                title: 'Dashboards',
                // translate: 'NAV.DASHBOARDS',
                type: 'item',
                icon: 'dashboard',
                url: '/dashboard',
            },
            {
                id: 'usermanagement',
                title: 'User Management',
                // translate: 'NAV.CALENDAR',
                type: 'collapsable',
                icon: 'people',
                children: [
                    {
                        id: 'roles',
                        title: 'Role',
                        type: 'item',
                        url: '/usermanagement/role'
                    },
                    {
                        id: 'users',
                        title: 'User',
                        type: 'item',
                        url: '/usermanagement/user'
                    },
                    {
                        id: 'module',
                        title: 'Module',
                        type: 'item',
                        url: '/usermanagement/module'
                    }
                ]
            },
            {
                id: 'workflowmanagement',
                title: 'Workflow Management',
                // translate: 'NAV.CALENDAR',
                type: 'collapsable',
                icon: 'swap_horiz',
                children: [
                    {
                        id: 'path',
                        title: 'Path',
                        type: 'item',
                        url: '/workflowmanagement/path'
                    },
                    {
                        id: 'workflow',
                        title: 'Workflow',
                        type: 'item',
                        url: '/workflowmanagement/workflow'
                    },
                ]
            },
            {
                id: 'leadtimemanagement',
                title: 'Lead Time Management',
                // translate: 'NAV.CALENDAR',
                type: 'collapsable',
                icon: 'people',
                children: [
                    {
                        id: 'leadtimeprocess',
                        title: 'Lead Time Process',
                        type: 'item',
                        url: '/leadtimemanagement/leadtimeprocess'
                    },
                    {
                        id: 'leadtimesupplier',
                        title: 'Lead Time Supplier',
                        type: 'item',
                        url: '/leadtimemanagement/leadtimesupplier'
                    },
                    {
                        id: 'leadtimedepo',
                        title: 'Lead Time Depo',
                        type: 'item',
                        url: '/leadtimemanagement/leadtimedepo'
                    },
                ]
            },
            {
                id: 'inquiry',
                title: 'Inquiry',
                // translate: 'NAV.CALENDAR',
                type: 'collapsable',
                icon: 'today',
                children: [
                    {
                        id: 'estimatetimedelivery',
                        title: 'Estimate Time Delivery',
                        type: 'item',
                        url: '/inquiry/estimatetimedelivery'
                    },
                ]
            },
            {
                id: 'inbox',
                title: 'Inbox',
                // translate: 'NAV.CALENDAR',
                type: 'collapsable',
                icon: 'email',
                children: [
                    {
                        id: 'estimatetimedelivery',
                        title: 'Estimate Time Delivery',
                        type: 'item',
                        url: '/inbox/estimatetimedelivery'
                    },
                ]
            },
            {
                id: 'archive',
                title: 'Archive',
                // translate: 'NAV.CALENDAR',
                type: 'collapsable',
                icon: 'archive',
                children: [
                    {
                        id: 'estimatetimedelivery',
                        title: 'Estimate Time Delivery',
                        type: 'item',
                        url: '/archive/estimatetimedelivery'
                    },
                ]
            },
            {
                id: 'monitoring',
                title: 'Monitoring',
                // translate: 'NAV.DASHBOARDS',
                type: 'item',
                icon: 'dashboard',
                url: '/monitoring',
            },
            {
                id: 'Reports',
                title: 'Reports',
                // translate: 'NAV.DASHBOARDS',
                type: 'item',
                icon: 'dashboard',
                url: '/report',
            }, {
                id: 'login',
                title: 'Login by role',
                icon: 'dashboard',
                type: 'item',
                url: '/login'
            }
        ]
    },
];
