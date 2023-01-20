import { TUsers } from '../store/reducers/users/types';

interface ICheckForBans {
  users: TUsers;
  id: string | null;
}

export function checkForBanOrDelete({ users, id }: ICheckForBans): void {
  if (id) {
    const idList: Array<string> = [];
    users.map((el) => {
      idList.push(el.id);
      if (el.id === id) {
        localStorage.setItem('banned', String(el.banned));
        return;
      }
    });
    if (!idList.includes(id)) {
      localStorage.setItem('banned', String(true));
    }
  }
}
