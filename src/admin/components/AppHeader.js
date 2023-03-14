import React, { useEffect, useState, useMemo } from 'react'
import { BellFilled, MailOutlined, SendOutlined } from "@ant-design/icons";
import {
  Badge,
  Drawer,
  Image,
  List,
  Space,
  Typography,
  Button, Divider,
  notification,
} from "antd";
import { useSelector, useDispatch } from 'react-redux'
import _nav from './_nav.scss'
import axios from 'axios';

const Context = React.createContext({
  name: "Default",
});
export const getComments = () => {
  return fetch("https://dummyjson.com/comments").then((res) => res.json());
};
export const getOrders = () => {
  return fetch("https://dummyjson.com/carts/1").then((res) => res.json());
};
const AppHeader = () => {
  const [comments, setComments] = useState([]);
  const [orders, setOrders] = useState([]);
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [sendOpen, setSendOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
const [form, setForm] = useState({
  message: "",
  title: "",
  topic: "",
});

  useEffect(() => {
    getComments().then((res) => {
      setComments(res.comments);
    });
    getOrders().then((res) => {
      setOrders(res.products);
    });
  }, []);
    const [api, contextHolder] = notification.useNotification();
    const openNotification = (placement) => {
      api.success({
        message: "Send Notification",
        description: (
          <Context.Consumer>{({ name }) => `${name}!`}</Context.Consumer>
        ),
        placement,
      });
    };
      const contextValue = useMemo(
        () => ({
          name: "Notification has been sent.",
        }),
        []
      );
      function handleChange(key) {
        return (evt) => {
          if (key === "brandID" || key === "categoryID") {
            setForm({
              ...form,
              [key]: evt.value,
            });
          } else {
            setForm({
              ...form,
              [key]: evt.target.value,
            });
          }
        };
      }
    const sendNotification = (e) => {
      e.preventDefault();
      const token = "eesG9_KMS5yI5fu7xhQ7Li:APA91bGDWfeGaNENlqjDIAB3a8Zf_4svwlhCbbuy8Okn4Z_G9Eig-Tq9xE90PVMcYaxTODZRAZb4D7JEQ84ta_v-UjVnxpSawwJGDkbUhaUnDrRTAjTNN1JxrpkgX9dtG77l3Lr3UC1-";
      return axios
        .post(
          "https://server-buildingpc.herokuapp.com/notification/token",
          {
            message: form.message,
            title: form.title,
            token: token,
            topic: form.topic,
          }
        )
        .then((response) => {
          console.log( response)
          setForm({
            message: "",
            title: "",
            topic: "",
          });
          setSendOpen(false);
          openNotification("topLeft");
        })
        .catch((error) => {
          console.error(error);
        });
    };
  return (
    <div
      className="AppHeader"
      style={{ display: "flex", justifyContent: "space-between" }}
    >
      <div style={{ display: "flex" }}>
        <Image
          width={50}
          src="https://th.bing.com/th/id/R.5879575d0a2103dae427c1d976bbeaf5?rik=m30lslRGy8DalQ&pid=ImgRaw&r=0"
        ></Image>
        <Typography.Title style={{ marginLeft: "10px" ,color:"#322275"}}>
         Admin
        </Typography.Title>
      </div>
      <Space style={{ alignItems: "baseline" }}>
        <Badge>
          <SendOutlined
            style={{ fontSize: 24 }}
            onClick={() => {
              setSendOpen(true);
            }}
          />
        </Badge>
        <Badge count={comments.length} dot>
          <MailOutlined
            style={{ fontSize: 24 }}
            onClick={() => {
              setCommentsOpen(true);
            }}
          />
        </Badge>
        <Badge count={orders.length}>
          <BellFilled
            style={{ fontSize: 24 }}
            onClick={() => {
              setNotificationsOpen(true);
            }}
          />
        </Badge>
      </Space>
      <Drawer
        title="Send"
        open={sendOpen}
        onClose={() => {
          setSendOpen(false);
        }}
        maskClosable
      >
        <form className="form" onSubmit={sendNotification}>
          <p className="form-title">send Notification</p>
          <div className="input-container">
            <label>topic</label>
            <input value={form.topic} onChange={handleChange("topic")} />
          </div>
          <div className="input-container">
            <label>title</label>
            <input value={form.title} onChange={handleChange("title")} />
          </div>
          <div className="input-container">
            <label>message</label>
            <input value={form.message} onChange={handleChange("message")} />
          </div>
          <button className="submit" type="submit">
            SEND
          </button>
        </form>
      </Drawer>
      <Drawer
        title="Comments"
        open={commentsOpen}
        onClose={() => {
          setCommentsOpen(false);
        }}
        maskClosable
      >
        <List
          dataSource={comments}
          renderItem={(item) => {
            return <List.Item>{item.body}</List.Item>;
          }}
        ></List>
      </Drawer>
      <Drawer
        title="Notifications"
        open={notificationsOpen}
        onClose={() => {
          setNotificationsOpen(false);
        }}
        maskClosable
      >
        <List
          dataSource={orders}
          renderItem={(item) => {
            return (
              <List.Item>
                <Typography.Text strong>{item.title}</Typography.Text> has been
                ordered!
              </List.Item>
            );
          }}
        ></List>
      </Drawer>
      <Context.Provider value={contextValue}>
        {contextHolder}
      </Context.Provider>
    </div>
  );
}

export default AppHeader
