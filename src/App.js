import React, { useState, useEffect } from "react";
// import data from "./data.json";
import axios from 'axios'
import AddTicketModal from './Components/AddTicketModal'
import "./App.scss";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

const VirtualizedList = () => {
  const [scrollTop, setScrollTop] = useState(0);
  const [allData, setAllData] = useState();
  const [isAddModalVisible, setisAddModalVisible] = useState(false)
  const [isFormHasError, setisFormHasError] = useState(false)
  const [newTicket, setnewTicket] = useState({})
  const [curTicket, setcurTicket] = useState({})
  const [mode, setmode] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      const data = await axios.get('http://localhost:3000/Tickets')
      setAllData(data.data)
    }
    fetchData()
  }, [])
  useEffect(() => {
    const onScroll = () => {
      setScrollTop(window.scrollY)
    };
    window.addEventListener("scroll", onScroll);
  }, []);

  const openModal = () => {
    setmode('new')
    setisAddModalVisible(true)
  }
  const closeModal = () => {
    setisAddModalVisible(false)
  }
  const addTicket = () => {
    if ((newTicket.subject == undefined) || (newTicket.description == undefined) || (newTicket.priority == undefined) || (newTicket.status == undefined)) {
      setisFormHasError(true)
    }
    else {
      axios.post('http://localhost:3000/Tickets', newTicket)
      setisAddModalVisible(false)
      setnewTicket({})
    }
  }

  const openModalToEditTicket = (id) => {
    setmode('edit')
    const rec = allData.filter((item) => item.id == id)
    setisAddModalVisible(true)
    setcurTicket(rec[0])
  }
  const editTicket = () => {
    if ((curTicket.subject == undefined) || (curTicket.description == undefined) || (curTicket.priority == undefined) || (curTicket.status == undefined)) {
      setisFormHasError(true)
    } else {
      axios.put(`http://localhost:3000/Tickets/${curTicket.id}`, curTicket)
      setisAddModalVisible(false)
    }
  }

  const handleChange = (e) => {
    let { name, value } = e.target
    if (mode == 'new') {
      let ticket = newTicket
      ticket.id = (new Date().valueOf() + Math.floor(Math.random() * 1000000)).toString()
      ticket[name] = value
    }
    else if (mode == 'edit') {
      let ticket = curTicket
      ticket[name] = value
      setcurTicket(ticket)
    }

  }
  const itemHeight = 250;
  const windowHeight = window.innerHeight;
  const startIndex = Math.floor(scrollTop / itemHeight);
  const numItems = allData?.length;
  const innerHeight = numItems * itemHeight;
  const endIndex = Math.min(
    numItems - 1, // don't render past the end of the list
    Math.floor((scrollTop + windowHeight) / itemHeight)
  );
  const renderItemUI = (obj) => (
    <div
      key={obj.item.id}
      style={obj.style}
      className={
        obj.item.priority === "Low"
          ? "low ticket"
          : obj.item.priority === "Medium"
            ? "med ticket"
            : obj.item.priority === "High" ? "high ticket" : "ticket"
      }
    >
      <label>
        <span
          className={
            obj.item.status === "New"
              ? "New status"
              : obj.item.status === "In Progress"
                ? "InProgress status"
                : obj.item.status === "Solved"
                  ? "Solved status"
                  : obj.item.status === "Closed" ? "Closed status" : "status"
          }
        >
          {obj.item.status}
        </span>
        <div className="lbl">
          {obj.item.subject}
          <span className="priority">{obj.item.priority}</span>
        </div>
        <button className="editBtn" onClick={() => openModalToEditTicket(obj.item.id)}>edit</button>

      </label>

      <p>{obj.item.description}</p>
    </div>
  );

  const items = [];
  for (let i = startIndex; i <= endIndex; i++) {
    items.push(
      renderItemUI({
        index: i,
        style: {
          position: "absolute",
          top: `${i * itemHeight}px`,
        },
        item: allData[i],
      })
    );
  }

  return (
    <>
      <div className="scroll">
        <div
          className="inner"
          style={{ position: "relative", height: `${innerHeight}px` }}
        >
          {items}
        </div>
        <button className="addBtn" alt="Add Ticket" onClick={openModal}>+</button>

      </div>
      {isAddModalVisible &&
        <AddTicketModal
          isAddModalVisible={isAddModalVisible}
          _closeModal={closeModal}
          newTicket={newTicket}
          curTicket={curTicket}
          addTicket={addTicket}
          handleChange={handleChange}
          isFormHasError={isFormHasError}
          editTicket={editTicket}
          mode={mode}
        />
      }
    </>
  );
};

export default VirtualizedList;
