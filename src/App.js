

import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';
import './App.css';
import { FaHome, FaDatabase, FaChartLine, FaHistory, FaWallet, FaBell, FaLifeRing, FaCog } from 'react-icons/fa';
import { MdMailOutline, MdAccountCircle } from 'react-icons/md';
import { FaBitcoin, FaEthereum, FaDollarSign } from 'react-icons/fa';



function App() {
  const [populationData, setPopulationData] = useState([]);
  
  const [activeItem, setActiveItem] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [bitcoinPrices, setBitcoinPrices] = useState(null);
const [pie, setPie] = useState(null);


useEffect(() => {
  fetchPie();
}, []);

const fetchPie = async () => {
  try {
    const response = await fetch('https://api.coindesk.com/v1/bpi/currentprice.json');
    const data = await response.json();
    setPie(data.bpi);
  } catch (error) {
    console.error('Error fetching Bitcoin prices:', error);
  }
};

useEffect(() => {
  if (pie) {
    renderPieChart();
  }
}, [pie]);


// for pie chart
const renderPieChart = () => {
  const ctx = document.getElementById('pieChart').getContext('2d');

  
  if (window.pieChartInstance) {
    window.pieChartInstance.destroy(); 
  }

  const labels = Object.keys(pie);
  const data = Object.values(pie).map(currency => currency.rate_float);

  window.pieChartInstance = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: labels,
      datasets: [{
        data: data,
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
        ]
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'right',
        },
        title: {
          display: true,
          text: 'Bitcoin Prices in Different Currencies'
        }
      }
    }
  });
};






    


  useEffect(() => {
    fetchPopulationData();
    fetchBitcoinPrices();
  }, []);

  const fetchBitcoinPrices = async () => {
    try {
      const response = await fetch('https://api.coindesk.com/v1/bpi/currentprice.json');
      const data = await response.json();
      setBitcoinPrices(data.bpi);
    } catch (error) {
      console.error('Error fetching Bitcoin prices:', error);
    }
  };

  const fetchPopulationData = async () => {
    try {
      const response = await fetch('https://datausa.io/api/data?drilldowns=Nation&measures=Population');
      const data = await response.json();
      setPopulationData(data.data);
    } catch (error) {
      console.error('Error fetching population data:', error);
    }
  };

  useEffect(() => {
    if (populationData.length > 0) {
      renderChart();
    }
  }, [populationData]);


  //for population
  const renderChart = () => {
    const years = populationData.map(entry => entry.Year);
    const specificPopulations = [310000, 315000, 320000, 325000, 330000];

    const ctx = document.getElementById('populationChart').getContext('2d');

    if (window.populationChartInstance) {
      window.populationChartInstance.destroy();
    }

    window.populationChartInstance = new Chart(ctx, {
      type: 'line',
      data: {
        labels: years,
        datasets: [{
          label: 'Population',
          data: specificPopulations,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 2,
          pointBackgroundColor: 'rgba(255, 99, 132, 1)',
          pointBorderColor: 'rgba(255, 99, 132, 1)',
          pointHoverBackgroundColor: 'rgba(255, 99, 132, 1)',
          pointHoverBorderColor: 'rgba(255, 99, 132, 1)',
          fill: false
        }]
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        scales: {
          y: {
            min: 310000,
            max: 330000, 
            title: {
              display: true,
              text: 'Population',
              color: 'green',
              font: {
                size: 36,
                weight: 'bold'
              }
            },
            ticks: {
              font: {
                size: 34,
                weight: 'bold'
              },
              callback: function (value, index, values) {
               
                return specificPopulations.includes(value) ? value.toLocaleString() : '';
              }
            }
          },
          x: {
            title: {
              display: true,
              text: 'Year',
              color: 'blue',
              font: {
                size: 34, 
                weight: 'bold'
              }
            },
            ticks: {
              font: {
                size: 24, 
                weight: 'bold',
                color: 'red'
              }
            }
          }
        },
        plugins: {
          legend: {
            display: true,
            labels: {
              color: 'black'
            }
          }
        }
      }
    });
  };


  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="App">
      <nav className="navbar">
        <div className="menu-toggle" onClick={toggleMenu}>
          <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
        </div>

        <div className={`sidebar ${isMenuOpen ? 'open' : ''}`}>
          <ul>
            <li className="carbon-cell">Carbon Cell</li>
            <li className="search-bar">
              <input type="text" placeholder="Search..." />
            </li>
            <li className={activeItem === 'home' ? 'active' : ''} onClick={() => setActiveItem('home')}>
              <a href="#"><FaHome /> Home</a>
            </li>
            <li className={activeItem === 'assets' ? 'active' : ''} onClick={() => setActiveItem('assets')}>
              <a href="#"><FaDatabase /> Assets</a>
            </li>
            <li className={activeItem === 'trade' ? 'active' : ''} onClick={() => setActiveItem('trade')}>
              <a href="#"><FaChartLine /> Trade</a>
            </li>
            <li className={activeItem === 'history' ? 'active' : ''} onClick={() => setActiveItem('history')}>
              <a href="#"><FaHistory /> History</a>
            </li>
            <li className={activeItem === 'wallet' ? 'active wallet-item' : 'wallet-item'} onClick={() => setActiveItem('wallet')}>
              <a href="#"><FaWallet /> Wallet</a>
            </li>
            <li className="spacer"></li>
            <li className={activeItem === 'notifications' ? 'active notifications-item' : 'notifications-item'} onClick={() => setActiveItem('notifications')}>
              <a href="#"><FaBell /> Notifications</a>
            </li>
            <li className={activeItem === 'support' ? 'active' : ''} onClick={() => setActiveItem('support')}>
              <a href="#"><FaLifeRing /> Support</a>
            </li>
            <li className={activeItem === 'settings' ? 'active' : ''} onClick={() => setActiveItem('settings')}>
              <a href="#"><FaCog /> Settings</a>
            </li>
            <li className="contact-item">
              <a href="#"><MdAccountCircle className="contact-logo" /> mabu@gmail.com</a>
            </li>
          </ul>
        </div>
      </nav>

      <div className="content">
        <div className="population-graph">
          <h1>Population Data for Different Nations</h1>
          <div className="graph-and-cards">
            <canvas id="populationChart" width="200" height="150"></canvas>
            <div className="App">
         <canvas id="pieChart" width="400" height="400"></canvas>
              </div>
         


         {/* /for cards */}
            <div className="crypto-cards">
  {bitcoinPrices && Object.keys(bitcoinPrices).map(currency => (
    <div className="crypto-card" key={currency}>
      <div className="crypto-info">
        <div className="crypto-logo">
          {currency === 'USD' || <FaDollarSign />}
          {currency === 'BTC' || <FaBitcoin />}
          {currency === 'ETH' || <FaEthereum />}
        </div>
        <div className="crypto-details">
          <h2>{currency}</h2>
          <p>Price: {bitcoinPrices[currency].rate}</p>
          <p>Change: {bitcoinPrices[currency].rate_float}</p>
        </div>
      </div>
      <button className="trade-button">Trade</button>
    </div>
  ))}
</div>



          </div>
        </div>
      </div>
    </div>
  );
}

export default App;











