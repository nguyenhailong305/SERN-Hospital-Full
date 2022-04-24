export const adminMenu = [
    { //Quản lý người dùng
        name: 'menu.admin.manager-user',
        menus: [
         
            {
                name: 'menu.admin.crud', link: '/system/user-manage' 
             
             },
             {
                name: 'menu.admin.crud-redux', link: '/system/user-redux' 
             
             },
             {
                name: 'menu.admin.manage-doctor', link: '/system/user-doctor'  
                 // subMenus: [
                 //     { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
                 //     { name: 'menu.system.system-administrator.user-redux', link: '/system/user-redux' },
                    
                 // ]
             },
            {
               name: 'menu.admin.manage-admin', link: '/system/user-admin' 
            
            },
         
          
            // { name: 'menu.system.system-parameter.header', link: '/system/system-parameter' },
        ]
    },
    { //Quản lý phòng khám
        name: 'menu.admin.clinic',
        menus: [
         
            {
                name: 'menu.admin.manage-clinic', link: '/system/manage-clinic' 
             
             },
            
         
          
            // { name: 'menu.system.system-parameter.header', link: '/system/system-parameter' },
        ]
    },
    { //Quản lý chuyên khoa
        name: 'menu.admin.specialty',
        menus: [
         
            {
                name: 'menu.admin.manage-specialty', link: '/system/manage-specialty' 
             
             },
            
         
          
            // { name: 'menu.system.system-parameter.header', link: '/system/system-parameter' },
        ]
    },
    { //Quản lý cẩm nâng
        name: 'menu.admin.handbook',
        menus: [
         
            {
                name: 'menu.admin.manage-handbook', link: '/system/manage-handbook' 
             
             },
            
         
          
            // { name: 'menu.system.system-parameter.header', link: '/system/system-parameter' },
        ]
    },
];