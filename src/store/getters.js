const getters = {
    sidebar: state => state.app.sidebar,
    permission_routes: state => state.permission.routes,
    permissions: state => state.user.permissions,
    visitedViews: state => state.tagsView.visitedViews,
    sidebarRouters: state => state.permission.sidebarRouters,
    siteName:state=>state.app.siteName,
    token:state=>state.user.token,
    roles:state=>state.user.roles
}
export default getters
