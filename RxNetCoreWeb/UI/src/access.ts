/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access(initialState: { currentUser?: API.CurrentUser | undefined }) {
  const { currentUser } = initialState || {};

  let menusList : any[] = JSON.parse(sessionStorage.getItem("menus")!);
  let access: any = {};
  if (menusList != null) {
    menusList.forEach(element => {
      access[element.menuTarget] = element.flag;
    });
  }

  return {
    ...access,
    canAdmin: currentUser && currentUser.access?.toLowerCase() === 'admin',
  };
}
