import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useActions } from '../../hooks/useActions';
import { TableHeader } from '../../components/Table/TableHeader/TableHeader';
import { TableBody } from '../../components/Table/TableBody/TableBody';
import { TableButtons } from '../../components/Table/TableButtons/TableButtons';

export function TablePage() {
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState<Array<string>>([]);
  const [isUsersChanged, setIsUsersChanged] = useState<boolean>(true);
  const currentId = localStorage.getItem('id');
  const banned = localStorage.getItem('banned');
  const navigate = useNavigate();

  const { getUsers, deleteUser, blockUser, unblockUser, logout } = useActions();

  const users = useTypedSelector((state) => state.usersReducer.users);

  useEffect(() => {
    if (banned === 'true') {
      logout();
      navigate('/login');
    } else {
      if (isUsersChanged) getUsers();
      setIsUsersChanged(false);
    }
  }, [isUsersChanged, banned]);

  useEffect(() => {
    if (isCheck.length === users.length && users.length !== 0) {
      setIsCheckAll(true);
      return;
    }
    setIsCheckAll(false);
  }, [isCheck, users]);

  const handleSelectAll = () => {
    setIsCheckAll(!isCheckAll);
    setIsCheck(users.map((el) => el.id));
    if (isCheckAll) {
      setIsCheck([]);
    }
  };

  const handleClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = e.currentTarget;
    setIsCheck([...isCheck, id]);
    if (!checked) {
      setIsCheck(isCheck.filter((item) => item !== id));
    }
  };

  const handleDelete = (id: string) => {
    getUsers();
    setIsUsersChanged(true);
    if (banned === 'false') {
      deleteUser(id);
      if (id === currentId) {
        logout();
        navigate('/login');
      }
    }
  };

  const handleBlock = (id: string) => {
    getUsers();
    if (banned === 'false') {
      blockUser(id);
      if (id === currentId) {
        logout();
        navigate('/login');
      }
    }
    setIsUsersChanged(true);
  };

  const handleUnblock = (id: string) => {
    getUsers();
    setIsUsersChanged(true);
    if (banned === 'false') {
      unblockUser(id);
    }
  };

  const blockSelected = async () => {
    if (!currentId) return;

    isCheck.map((id: string) => {
      if (id !== currentId) blockUser(id);
    });

    getUsers();

    if (isCheck.includes(currentId)) {
      blockUser(currentId);
      logout();
      navigate('/login');
    }
    setIsUsersChanged(true);
    setIsCheck([]);
    setIsCheckAll(false);
  };

  const unblockSelected = () => {
    isCheck.map((id: string) => {
      unblockUser(id);
    });

    getUsers();

    setIsUsersChanged(true);
    setIsCheck([]);
    setIsCheckAll(false);
  };

  const deleteSelected = () => {
    if (!currentId) return;

    isCheck.map((id: string) => {
      if (id !== currentId) deleteUser(id);
    });

    getUsers();

    if (isCheck.includes(currentId)) {
      deleteUser(currentId);
      logout();
      navigate('/login');
    }
    setIsUsersChanged(true);
    setIsCheck([]);
    setIsCheckAll(false);
  };

  return (
    <div>
      <TableButtons
        handleUnblock={unblockSelected}
        handleDelete={deleteSelected}
        handleBlock={blockSelected}
      />
      <table className="table">
        <TableHeader
          handleSelectAll={handleSelectAll}
          isCheckAll={isCheckAll}
        />
        <TableBody
          handleBlock={handleBlock}
          handleUnblock={handleUnblock}
          handleDelete={handleDelete}
          users={users}
          handleClick={handleClick}
          isCheck={isCheck}
        />
      </table>
    </div>
  );
}
