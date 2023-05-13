"use client"; 

import Image from 'next/image'
import styles from './page.module.css'
import React from 'react';
import { useState } from 'react';


function SearchBar({filterText, inStockOnly, onFilterTextChange,
  onInStockOnlyChange}) {
  return (
    <form>
      <label>
        Procure uma mensagem:
      </label>
      <input type="text" value={filterText} placeholder="Search..." 
      onChange={(e) => onFilterTextChange(e.target.value)}/>
    </form>
  );
}

function FilterableMessageTable({ messages, filterText}) {
  const rows = [];
  messages.forEach((message) => {
     if (messages.includes(filterText)) {
      return;
    }
    rows.push(
      <MessageRow
        message={message}
        key={message.message} />);
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Author</th>
          <th>Message</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function MessageRow({ message }) {
  return (
    <tr>
      <td>{message.author}</td>
      <td>{message.message}</td>
      <td>{message.date}</td>
    </tr>
  );
}

export default function Home() {
    
  const [blogMessages, setBlogMessages] = useState([]);
  
  fetch('https://script.google.com/macros/s/AKfycbzBn3sALe1rYjz7Ze-Ik7q9TEVP0I2V3XX7GNcecWP8NvCzGt4yO_RT1OlQp09TE9cU/exec')
    .then(response => response.json())
    .then(data => {
        setBlogMessages(data);
    });
    
    return (
      <main className={styles.main}>
         <SearchBar filterText={filterText}  inStockOnly={inStockOnly} 
      onFilterTextChange={setFilterText}
      onInStockOnlyChange={setInStockOnly}/>
        <FilterableMessageTable messages={blogMessages} filterText={filterText} />
      </main>
    );
}
