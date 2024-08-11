import React, { useCallback, useEffect, useRef, useState } from "react";
import "./styles.css";

const UsersList = ({ searchedValue }) => {
  const [usersList, setUsersList] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(15);
  const [total, setTotal] = useState(-1);
  const [skip, setSkip] = useState(0);

  useEffect(() => {
    fetchUsers();
  }, [skip]);

  useEffect(() => {
    if (skip !== 0) {
      setSkip((prev) => 0);
      setUsersList([]);
    } else fetchUsers();
  }, [searchedValue]);

  const fetchUsers = () => {
    if (skip == 0 || total > skip) {
      setLoading(true);
      if (searchedValue?.length == 0) {
        fetch(`https://dummyjson.com/users?limit=${limit}&skip=${skip}`)
          .then((response) => response.json())
          .then((json) => {
            setUsersList(
              skip == 0 ? [...json?.users] : [...usersList, ...json?.users]
            );
            setTotal(json?.total);
            setLoading(false);
          })
          .catch((error) => {
            setError(true);
            setLoading(false);
          });
      } else {
        fetch(
          `https://dummyjson.com/users/search?q=${searchedValue}&limit=${limit}&skip=${skip}`
        )
          .then((response) => response.json())
          .then((json) => {
            setUsersList(
              skip == 0 ? [...json?.users] : [...usersList, ...json?.users]
            );
            setTotal(json?.total);

            setLoading(false);
          })
          .catch((error) => {
            setError(true);
            setLoading(false);
          });
      }
    }
  };

  const observer = useRef();

  const lastElement = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setSkip((prevSkip) => prevSkip + 15);
        }
      });
      if (node) observer.current.observe(node);
    },
    [true]
  );

  return loading && skip == 0 ? (
    <div className="cardName textAlignCenter">Loading...</div>
  ) : error ? (
    <div className="cardName textAlignCenter">Oops! Something went wrong.</div>
  ) : total == 0 ? (
    <div className="cardName textAlignCenter">No Data</div>
  ) : (
    <div>
      {usersList?.map((user) => {
        return (
          <div className="card" key={user?.id}>
            <div className="detailsFirst">
              <div className="cardName">
                {user?.firstName +
                  " " +
                  user?.lastName +
                  " (" +
                  user?.age +
                  user?.gender.charAt(0).toUpperCase() +
                  ")"}
              </div>
              <div>{user?.email}</div>
              <div>{user?.phone}</div>
            </div>
            <div className="detailsSecond">
              <div> Address:+{"  "} </div>
              <div>
                {user?.address?.address +
                  ", " +
                  user?.address?.city +
                  ", " +
                  user?.address?.postalCode +
                  ", " +
                  user?.address?.state +
                  ", " +
                  user?.address?.country}
              </div>
            </div>
          </div>
        );
      })}
      {usersList?.length > 0 && <div ref={lastElement}></div>}
    </div>
  );
};

export default UsersList;
